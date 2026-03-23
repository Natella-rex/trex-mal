# SafeCircle - Quick Start Guide

## 🚀 Get Started in 3 Minutes

### 1. Install & Run

```bash
# Navigate to project directory
cd trex-3

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. Explore the Platform

#### Homepage (/)
- Overview of SafeCircle concept
- Key features and benefits  
- How it works section
- Call-to-action to dashboard

#### Dashboard (/dashboard)
- View your community funds
- See statistics (contributions, members, payouts)
- Recent activity feed
- Disaster event alerts
- Quick action buttons

#### Create Fund (/dashboard/create-fund)
- Set up new emergency fund
- Configure contribution rules
- Define disaster triggers
- Set distribution methods
- Enable community governance

#### Make Contribution (/dashboard/contribute)
- Select fund to contribute to
- Enter amount
- Set up recurring payments
- Process via Open Payments

#### Fund Details (/dashboard/fund/[id])
- View fund information
- See member list
- Check disaster triggers
- Review transaction history
- Monitor governance

#### Wallet Settings (/dashboard/wallet)
- Manage Open Payments wallet address
- Learn about Open Payments
- Understand payment flow
- See supported ASEs

## 📚 Key Concepts

### Open Payments
- **Wallet Address**: HTTPS URL identifying your account
- **Grants**: Permissions to access accounts
- **Quotes**: Fee calculations before payment
- **ILP**: Packet-based money transfer protocol

### Community Fund
- **Members**: Users who contribute and receive aid
- **Balance**: Total funds available
- **Triggers**: Disaster events that activate payouts
- **Rules**: How contributions and distributions work

### Disaster Triggers
- **Type**: flood, typhoon, earthquake, wildfire, drought
- **Severity**: low, medium, high, critical
- **Location**: Geographic area with radius
- **Auto-activate**: Automatic vs manual activation
- **Verification**: Trusted source confirmation

### Distribution Methods
1. **Equal Split**: Everyone gets same amount
2. **Severity-Based**: Based on disaster impact
3. **Household Size**: Proportional to family size
4. **Proportional**: Based on contribution amount

## 🎯 Demo Flows

### Flow 1: View Existing Funds
1. Go to Dashboard
2. See "Metro Manila Emergency Fund" and "Workplace Support Circle"
3. Click on a fund to see details
4. Review members, triggers, and transactions

### Flow 2: Create New Fund
1. Click "Create Fund" from dashboard
2. Enter name: "My Community Fund"
3. Set contribution: Weekly, ₱100 minimum
4. Choose distribution: Equal split
5. Add trigger: Flood, Medium severity
6. Enable voting with 66% approval
7. Submit

### Flow 3: Make Contribution
1. Click "Make Contribution"
2. Select fund
3. Enter amount (≥ minimum)
4. Enable recurring
5. See Open Payments flow explanation
6. Submit (mock payment processed)

### Flow 4: View Disaster Events
1. Go to Dashboard
2. Scroll to "Recent Disaster Events"
3. See verified events with severity
4. Check affected population
5. View triggered payouts

## 🔍 Code Structure

```
app/
├── page.tsx                    # Landing page
├── layout.tsx                  # Root layout with metadata
├── globals.css                 # Global styles
├── types/
│   └── index.ts               # TypeScript type definitions
├── lib/
│   ├── openPayments.ts        # Open Payments service
│   └── mockData.ts            # Demo data
└── dashboard/
    ├── page.tsx               # Main dashboard
    ├── create-fund/           
    │   └── page.tsx           # Create fund form
    ├── contribute/
    │   └── page.tsx           # Contribution form
    ├── fund/[id]/
    │   └── page.tsx           # Fund detail view
    └── wallet/
        └── page.tsx           # Wallet settings
```

## 🛠️ Customization

### Add New Disaster Type
Edit `app/types/index.ts`:
```typescript
type: 'flood' | 'typhoon' | 'earthquake' | 'wildfire' | 'drought' | 'hurricane'
```

### Change Currency
Update mock data in `app/lib/mockData.ts`:
```typescript
currency: 'USD' // or 'EUR', 'PHP', etc.
```

### Add New Distribution Method
Edit `app/types/index.ts`:
```typescript
distributionMethod: 'equal' | 'severity-based' | 'household-size' | 'proportional' | 'weighted'
```

### Modify Theme Colors
Edit Tailwind classes or add custom colors in CSS.

## 📊 Mock Data

The demo includes:
- 3 users (Alice, Bob, Carol)
- 2 community funds
  - Metro Manila Emergency Fund (₱45,000 balance, 24 members)
  - Workplace Support Circle (₱28,500 balance, 15 members)
- 3 recent contributions
- 1 completed payout
- 2 disaster events (flood, typhoon)

## 🔐 Security Notes

### Current Implementation (Demo)
- Mock payment processing
- No real money transfers
- Simulated Open Payments flow
- Demo wallet addresses

### Production Requirements
- Real Open Payments ASE integration
- Secure authentication system
- Encrypted data storage
- Compliance with financial regulations
- KYC/AML procedures
- Disaster verification APIs

## 🚀 Next Steps

### For Hackathon Demo
1. Run the app locally
2. Walk through user flows
3. Explain Open Payments benefits
4. Show disaster trigger system
5. Demonstrate transparency features

### For Production
1. Integrate with real Open Payments provider (e.g., Rafiki)
2. Connect to disaster detection APIs
3. Implement user authentication
4. Add database for persistence
5. Deploy to cloud platform
6. Obtain necessary licenses

## 🌐 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Other Platforms
- **Netlify**: Connect GitHub repo
- **AWS Amplify**: Use AWS Console
- **Docker**: Create Dockerfile and deploy

## 📝 Presentation Tips

### Elevator Pitch (30 seconds)
"SafeCircle enables communities to pool money for emergencies and automatically disburse aid when disasters strike - no waiting, no bureaucracy, just instant help when it's needed most. Built on Open Payments for secure, interoperable, direct-to-account transfers."

### Key Points to Emphasize
1. **Speed**: Instant payouts vs weeks of waiting
2. **Transparency**: Every transaction visible to community
3. **Inclusion**: Works with any account type (mobile money, banks, wallets)
4. **Automation**: No manual coordination during crisis
5. **Innovation**: Leveraging Open Payments for financial interoperability

### Demo Script
1. **Problem** (1 min): Traditional aid is slow and opaque
2. **Solution** (1 min): Community funds with Open Payments
3. **Dashboard** (2 min): Show funds, stats, activity
4. **Create Fund** (2 min): Walk through setup process
5. **Contribution** (2 min): Explain Open Payments flow
6. **Payout** (1 min): Show automatic disaster response
7. **Impact** (1 min): Benefits for communities

## 🤝 Support

### Resources
- [README.md](README.md) - Full documentation
- [OPEN_PAYMENTS.md](OPEN_PAYMENTS.md) - Open Payments guide
- [Open Payments Docs](https://openpayments.guide/)
- [Interledger.org](https://interledger.org/)

### Troubleshooting

**Port already in use**
```bash
# Kill process and restart
npx kill-port 3000
npm run dev
```

**Build errors**
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run dev
```

**Type errors**
```bash
# Check TypeScript
npm run lint
```

## ✨ Success!

You now have a fully functional community emergency fund platform demonstrating:
- ✅ Open Payments integration
- ✅ Disaster trigger automation  
- ✅ Transparent fund management
- ✅ Community governance
- ✅ Instant payout simulation
- ✅ Beautiful, responsive UI

**Ready to present your hackathon project!** 🎉
