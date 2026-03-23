# Open Payments Implementation Guide

## Overview

SafeCircle implements the Open Payments protocol to enable direct, secure, and interoperable payment integration without intermediaries. This document explains how Open Payments is integrated into the platform.

## What is Open Payments?

Open Payments is a RESTful API standard that enables:
- Direct communication between applications and financial accounts
- Interoperability across different Account Servicing Entities (ASEs)
- No need for payment processors or custom integrations
- User consent and control over all transactions

## Core Components

### 1. Wallet Addresses

Every user and fund has a wallet address - an HTTPS URL that identifies their account:

```typescript
// Example wallet addresses
user: "https://wallet.example.com/alice"
fund: "https://wallet.example.com/fund_metro_manila"
```

**Benefits:**
- Human-readable and memorable
- Publicly shareable without exposing sensitive data
- Service endpoint for API calls
- Works like "email for money"

### 2. Grant Negotiation (GNAP)

Before any payment operation, applications must request grants using the Grant Negotiation and Authorization Protocol (GNAP).

**Grant Request Flow:**
```typescript
const grant = await openPaymentsService.requestGrant(
  walletAddress,
  ['incoming-payment', 'quote', 'outgoing-payment']
);
// Returns: { accessToken, expiresIn, scope }
```

**Fine-Grained Control:**
- Specific permissions (read, create, list)
- Amount limits (min/max transaction values)
- Time-based limits (expiration)
- Velocity limits (transactions per period)

### 3. Payment Flow

SafeCircle implements the complete Open Payments flow:

#### Step 1: Request Grants
```typescript
// Sender grants
const senderGrant = await requestGrant(senderWallet, [
  'quote',
  'outgoing-payment'
]);

// Receiver grants
const receiverGrant = await requestGrant(receiverWallet, [
  'incoming-payment'
]);
```

#### Step 2: Create Incoming Payment
```typescript
const incomingPayment = await createIncomingPayment(
  receiverWallet,
  amount,
  'USD',
  2, // assetScale
  'Community fund contribution'
);
```

**Returns:**
- Payment ID
- ILP stream connection details
- Expiration time
- Amount expectations

#### Step 3: Create Quote
```typescript
const quote = await createQuote(
  senderWallet,
  receiverWallet,
  amount
);
```

**Quote provides:**
- Exact debit amount (including fees)
- Exact receive amount
- Exchange rates (if cross-currency)
- Validity period (typically 10 minutes)

#### Step 4: Interactive Consent
The user is redirected to their ASE to approve the payment:
- Review transaction details
- Confirm amount and recipient
- Grant final authorization

This happens in the user's banking app/wallet interface - SafeCircle never sees credentials.

#### Step 5: Create Outgoing Payment
```typescript
const outgoingPayment = await createOutgoingPayment(
  senderWallet,
  quote.id,
  receiverWallet
);
```

**This initiates:**
- Payment execution via ILP packets
- Real-time transfer between ASEs
- Status updates (pending → completed)

## Implementation Details

### Service Structure

```typescript
class OpenPaymentsService {
  // Request grant for account access
  async requestGrant(walletAddress, permissions): Promise<Grant>
  
  // Create incoming payment on recipient's account
  async createIncomingPayment(walletAddress, amount, ...): Promise<IncomingPayment>
  
  // Create quote on sender's account  
  async createQuote(senderWallet, receiverWallet, amount): Promise<Quote>
  
  // Create outgoing payment (initiates transfer)
  async createOutgoingPayment(senderWallet, quoteId, receiverWallet): Promise<OutgoingPayment>
  
  // Complete payment flow helper
  async sendPayment(sender, receiver, amount, description): Promise<PaymentResult>
}
```

### Usage in SafeCircle

#### 1. User Contributions
```typescript
// User contributes to fund
const payment = await openPaymentsService.sendPayment(
  user.walletAddress,
  fund.walletAddress,
  amount,
  `Contribution to ${fund.name}`
);
```

#### 2. Automatic Payouts
```typescript
// Disaster trigger activated - pay affected members
for (const member of affectedMembers) {
  const payout = await openPaymentsService.sendPayment(
    fund.walletAddress,
    member.walletAddress,
    calculatedAmount,
    `Emergency aid - ${disaster.type}`
  );
}
```

#### 3. Recurring Payments
```typescript
// Scheduled contribution (user grants consent each time)
const recurringPayment = {
  frequency: 'weekly',
  amount: 200,
  nextDue: new Date(),
  // User is prompted for consent before each payment
};
```

## Security Model

### 1. No Stored Credentials
- SafeCircle never handles bank credentials
- All authentication through user's ASE
- Tokens are short-lived and scoped

### 2. HTTP Signatures
All API requests are signed using HTTP Signatures specification:
```typescript
// Pseudo-code
const signature = sign(request, privateKey);
headers['Signature'] = signature;
headers['Signature-Input'] = signatureInput;
```

### 3. User Consent
- Interactive grants for outgoing payments
- User reviews in their trusted banking interface
- Can revoke access at any time

### 4. Data Minimization
Only necessary data exchanged:
- Wallet addresses (public)
- Payment amounts
- Transaction descriptions
- No personal financial data

## Interledger Protocol (ILP)

Open Payments uses ILP for the actual money transfer:

### How ILP Works

1. **Packet-Based Transfer**
   - Payment split into small packets
   - Each packet routed independently
   - Similar to how internet packets work

2. **Connector Network**
   - ASEs connected via ILP connectors
   - Packets routed through optimal path
   - No single point of failure

3. **Conditional Payments**
   - Cryptographic fulfillment conditions
   - Either all packets succeed or none do
   - No risk of partial payments

4. **Settlement**
   - ASEs settle on existing rails (SWIFT, ACH, etc.)
   - Bulk settlements reduce costs
   - Real-time liquidity management

## Benefits for SafeCircle

### 1. Financial Inclusion
- Works with any account type
- Mobile money integration
- No banking infrastructure required
- Cross-border payments enabled

### 2. Micropayments
- Low fees enable small contributions
- Pay-as-you-go models possible
- Fractional payments supported

### 3. Speed
- Near-instant transfers
- No batch processing delays
- Critical for emergency payouts

### 4. Transparency
- All transactions tracked
- Real-time balance updates
- Immutable payment history

### 5. Cost Efficiency
- No intermediary fees
- Direct ASE-to-ASE transfers
- Lower operational costs

## Account Servicing Entities (ASEs)

ASEs implement the Open Payments standard and manage customer accounts:

### Types of ASEs
- Banks and credit unions
- Mobile money providers (M-Pesa, GCash, etc.)
- Digital wallet services
- Payment service providers
- Cryptocurrency exchanges

### ASE Responsibilities
1. Implement Open Payments API endpoints
2. Manage customer authentication
3. Execute payment instructions
4. Settle with other ASEs
5. Provide Web Monetization support

## Integration Roadmap

### Phase 1: Mock Implementation (Current)
- Simulated Open Payments flows
- Demonstration of concepts
- No real money transfers

### Phase 2: Testnet Integration
- Connect to Open Payments test ASEs
- Real API calls (test money)
- End-to-end flow validation

### Phase 3: Production ASE
- Partner with Open Payments provider
- Real money transfers
- Compliance and licensing

### Phase 4: Multi-ASE Support
- Support multiple wallet providers
- Cross-ASE transfers
- Enhanced interoperability

## API Endpoints (When Integrated)

### Discovery
```
GET https://wallet.example.com/.well-known/open-payments-server
```

### Grant Requests
```
POST https://auth.wallet.example.com/gnap
```

### Incoming Payments
```
POST https://wallet.example.com/incoming-payments
GET https://wallet.example.com/incoming-payments/{id}
```

### Quotes
```
POST https://wallet.example.com/quotes
GET https://wallet.example.com/quotes/{id}
```

### Outgoing Payments
```
POST https://wallet.example.com/outgoing-payments
GET https://wallet.example.com/outgoing-payments/{id}
```

## Error Handling

### Common Errors
1. **Grant Denied** - User refused authorization
2. **Quote Expired** - Quote exceeded validity period
3. **Insufficient Funds** - Account balance too low
4. **Invalid Wallet Address** - Malformed or unreachable
5. **ASE Unavailable** - Network or service issues

### Handling Strategy
```typescript
try {
  const payment = await sendPayment(...);
} catch (error) {
  if (error.code === 'GRANT_DENIED') {
    // User cancelled - show message
  } else if (error.code === 'QUOTE_EXPIRED') {
    // Create new quote and retry
  } else {
    // Log and alert user
  }
}
```

## Testing

### Unit Tests
- Mock service responses
- Test flow logic
- Validate error handling

### Integration Tests  
- Connect to test ASE
- Real API calls
- End-to-end scenarios

### Security Tests
- Signature validation
- Token expiration
- Permission boundaries

## Resources

### Documentation
- [Open Payments Specification](https://openpayments.guide/)
- [Interledger Protocol](https://interledger.org/)
- [GNAP Specification](https://datatracker.ietf.org/doc/draft-ietf-gnap-core-protocol/)

### Tools
- [Rafiki](https://rafiki.dev/) - Open Payments ASE implementation
- [Open Payments SDK](https://github.com/interledger/open-payments) - Client libraries

### Community
- [Interledger Forum](https://forum.interledger.org/)
- [Open Payments GitHub](https://github.com/interledger/open-payments)

## Conclusion

Open Payments provides SafeCircle with:
- **Direct Integration** - No payment processors needed
- **Interoperability** - Works across any ASE
- **User Control** - Fine-grained consent and permissions
- **Security** - No sensitive data exposure
- **Inclusion** - Accessible to all account types

This enables the core mission: instant, transparent, community-powered emergency funds that work when they're needed most.
