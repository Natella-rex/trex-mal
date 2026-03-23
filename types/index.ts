// Open Payments Types
export interface WalletAddress {
  id: string;
  url: string;
  publicName?: string;
}

export interface Grant {
  accessToken: string;
  expiresIn: number;
  scope: string[];
}

export interface IncomingPayment {
  id: string;
  walletAddress: string;
  incomingAmount: {
    value: string;
    assetCode: string;
    assetScale: number;
  };
  expiresAt: string;
  ilpStreamConnection: string;
}

export interface Quote {
  id: string;
  walletAddress: string;
  receiveAmount: {
    value: string;
    assetCode: string;
    assetScale: number;
  };
  debitAmount: {
    value: string;
    assetCode: string;
    assetScale: number;
  };
  expiresAt: string;
}

export interface OutgoingPayment {
  id: string;
  walletAddress: string;
  quoteId: string;
  sentAmount: {
    value: string;
    assetCode: string;
    assetScale: number;
  };
  status: 'pending' | 'completed' | 'failed';
}

// Application Types
export interface User {
  id: string;
  name: string;
  email: string;
  walletAddress: string;
  location?: {
    country: string;
    region: string;
    city: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
}

export interface CommunityFund {
  id: string;
  name: string;
  description: string;
  totalBalance: number;
  currency: string;
  memberCount: number;
  createdAt: string;
  rules: FundRules;
  members: FundMember[];
  triggers: DisasterTrigger[];
  governance: Governance;
}

export interface FundRules {
  contributionFrequency: 'daily' | 'weekly' | 'monthly';
  minimumContribution: number;
  maximumContribution?: number;
  distributionMethod: 'equal' | 'severity-based' | 'household-size' | 'proportional';
  payoutCap?: number;
  requiresConsensus: boolean;
}

export interface FundMember {
  userId: string;
  name: string;
  walletAddress: string;
  joinedAt: string;
  totalContributed: number;
  role: 'admin' | 'member';
  isActive: boolean;
  householdSize?: number;
}

export interface DisasterTrigger {
  id: string;
  type: 'flood' | 'earthquake' | 'typhoon' | 'wildfire' | 'drought' | 'other';
  severity: 'low' | 'medium' | 'high' | 'critical';
  location: {
    country: string;
    region: string;
    radius?: number; // in kilometers
  };
  autoActivate: boolean;
  requiresVerification: boolean;
  verificationSource?: string;
}

export interface Contribution {
  id: string;
  fundId: string;
  userId: string;
  amount: number;
  currency: string;
  timestamp: string;
  status: 'pending' | 'completed' | 'failed';
  quoteId?: string;
  paymentId?: string;
  isRecurring: boolean;
  nextScheduledDate?: string;
}

export interface Payout {
  id: string;
  fundId: string;
  recipientId: string;
  amount: number;
  currency: string;
  timestamp: string;
  status: 'pending' | 'completed' | 'failed';
  triggerId: string;
  distributionMethod: string;
  paymentId?: string;
}

export interface DisasterEvent {
  id: string;
  type: string;
  severity: string;
  location: {
    country: string;
    region: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  detectedAt: string;
  verifiedBy?: string;
  isVerified: boolean;
  affectedPopulation?: number;
  description: string;
}

export interface Governance {
  votingEnabled: boolean;
  proposalThreshold: number; // percentage of members needed to propose
  approvalThreshold: number; // percentage needed to approve
  proposals: Proposal[];
}

export interface Proposal {
  id: string;
  fundId: string;
  proposedBy: string;
  title: string;
  description: string;
  type: 'rule-change' | 'trigger-modification' | 'distribution-method' | 'other';
  status: 'active' | 'approved' | 'rejected' | 'expired';
  createdAt: string;
  expiresAt: string;
  votes: Vote[];
}

export interface Vote {
  userId: string;
  vote: 'yes' | 'no' | 'abstain';
  timestamp: string;
}

export interface DashboardStats {
  totalFunds: number;
  totalContributed: number;
  totalMembers: number;
  activeFunds: number;
  totalPayouts: number;
  payoutsThisMonth: number;
}
