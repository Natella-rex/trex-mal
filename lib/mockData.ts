// Mock data for demonstration purposes
import { CommunityFund, User, Contribution, Payout, DisasterEvent } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    walletAddress: 'https://wallet.example.com/alice',
    location: {
      country: 'Philippines',
      region: 'Metro Manila',
      city: 'Manila',
      coordinates: { lat: 14.5995, lng: 120.9842 }
    }
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob@example.com',
    walletAddress: 'https://wallet.example.com/bob',
    location: {
      country: 'Philippines',
      region: 'Cebu',
      city: 'Cebu City',
      coordinates: { lat: 10.3157, lng: 123.8854 }
    }
  },
  {
    id: '3',
    name: 'Carol Martinez',
    email: 'carol@example.com',
    walletAddress: 'https://wallet.example.com/carol',
    location: {
      country: 'Philippines',
      region: 'Davao',
      city: 'Davao City'
    }
  }
];

export const mockFunds: CommunityFund[] = [
  {
    id: 'fund1',
    name: 'Metro Manila Emergency Fund',
    description: 'Community support for flood and typhoon emergencies in Metro Manila',
    totalBalance: 45000,
    currency: 'PHP',
    memberCount: 24,
    createdAt: '2026-01-15T00:00:00Z',
    rules: {
      contributionFrequency: 'weekly',
      minimumContribution: 100,
      maximumContribution: 5000,
      distributionMethod: 'severity-based',
      payoutCap: 10000,
      requiresConsensus: false
    },
    members: [
      {
        userId: '1',
        name: 'Alice Johnson',
        walletAddress: 'https://wallet.example.com/alice',
        joinedAt: '2026-01-15T00:00:00Z',
        totalContributed: 2400,
        role: 'admin',
        isActive: true,
        householdSize: 4
      },
      {
        userId: '2',
        name: 'Bob Smith',
        walletAddress: 'https://wallet.example.com/bob',
        joinedAt: '2026-01-20T00:00:00Z',
        totalContributed: 1800,
        role: 'member',
        isActive: true,
        householdSize: 2
      }
    ],
    triggers: [
      {
        id: 'trigger1',
        type: 'flood',
        severity: 'medium',
        location: {
          country: 'Philippines',
          region: 'Metro Manila',
          radius: 50
        },
        autoActivate: true,
        requiresVerification: true,
        verificationSource: 'PAGASA (Philippine Atmospheric, Geophysical and Astronomical Services Administration)'
      },
      {
        id: 'trigger2',
        type: 'typhoon',
        severity: 'high',
        location: {
          country: 'Philippines',
          region: 'Metro Manila',
          radius: 100
        },
        autoActivate: true,
        requiresVerification: true,
        verificationSource: 'PAGASA'
      }
    ],
    governance: {
      votingEnabled: true,
      proposalThreshold: 10,
      approvalThreshold: 66,
      proposals: []
    }
  },
  {
    id: 'fund2',
    name: 'Workplace Support Circle',
    description: 'Employee-driven emergency fund for natural disasters',
    totalBalance: 28500,
    currency: 'PHP',
    memberCount: 15,
    createdAt: '2026-02-01T00:00:00Z',
    rules: {
      contributionFrequency: 'monthly',
      minimumContribution: 500,
      distributionMethod: 'equal',
      requiresConsensus: false
    },
    members: [
      {
        userId: '3',
        name: 'Carol Martinez',
        walletAddress: 'https://wallet.example.com/carol',
        joinedAt: '2026-02-01T00:00:00Z',
        totalContributed: 1500,
        role: 'admin',
        isActive: true,
        householdSize: 3
      }
    ],
    triggers: [
      {
        id: 'trigger3',
        type: 'earthquake',
        severity: 'high',
        location: {
          country: 'Philippines',
          region: 'National',
          radius: 500
        },
        autoActivate: true,
        requiresVerification: true,
        verificationSource: 'PHIVOLCS (Philippine Institute of Volcanology and Seismology)'
      }
    ],
    governance: {
      votingEnabled: true,
      proposalThreshold: 20,
      approvalThreshold: 75,
      proposals: []
    }
  }
];

export const mockContributions: Contribution[] = [
  {
    id: 'contrib1',
    fundId: 'fund1',
    userId: '1',
    amount: 200,
    currency: 'PHP',
    timestamp: '2026-02-21T10:00:00Z',
    status: 'completed',
    quoteId: 'quote_123',
    paymentId: 'payment_123',
    isRecurring: true,
    nextScheduledDate: '2026-02-28T10:00:00Z'
  },
  {
    id: 'contrib2',
    fundId: 'fund1',
    userId: '2',
    amount: 200,
    currency: 'PHP',
    timestamp: '2026-02-21T14:30:00Z',
    status: 'completed',
    quoteId: 'quote_124',
    paymentId: 'payment_124',
    isRecurring: true,
    nextScheduledDate: '2026-02-28T14:30:00Z'
  },
  {
    id: 'contrib3',
    fundId: 'fund2',
    userId: '3',
    amount: 500,
    currency: 'PHP',
    timestamp: '2026-02-01T09:00:00Z',
    status: 'completed',
    isRecurring: true,
    nextScheduledDate: '2026-03-01T09:00:00Z'
  }
];

export const mockPayouts: Payout[] = [
  {
    id: 'payout1',
    fundId: 'fund1',
    recipientId: '2',
    amount: 5000,
    currency: 'PHP',
    timestamp: '2026-02-15T08:00:00Z',
    status: 'completed',
    triggerId: 'trigger1',
    distributionMethod: 'severity-based',
    paymentId: 'payment_payout_1'
  }
];

export const mockDisasterEvents: DisasterEvent[] = [
  {
    id: 'event1',
    type: 'flood',
    severity: 'high',
    location: {
      country: 'Philippines',
      region: 'Metro Manila',
      coordinates: { lat: 14.5995, lng: 120.9842 }
    },
    detectedAt: '2026-02-15T06:00:00Z',
    verifiedBy: 'PAGASA',
    isVerified: true,
    affectedPopulation: 50000,
    description: 'Heavy flooding in Metro Manila after continuous rainfall. Water levels reached 3-6 feet in several areas.'
  },
  {
    id: 'event2',
    type: 'typhoon',
    severity: 'medium',
    location: {
      country: 'Philippines',
      region: 'Bicol Region',
      coordinates: { lat: 13.4210, lng: 123.4107 }
    },
    detectedAt: '2026-01-20T12:00:00Z',
    verifiedBy: 'PAGASA',
    isVerified: true,
    affectedPopulation: 120000,
    description: 'Typhoon Maria passed through Bicol Region causing moderate damage to infrastructure and homes.'
  }
];

// Utility function to get mock current user
export const getCurrentUser = (): User => mockUsers[0];

// Utility function to get user's funds
export const getUserFunds = (userId: string): CommunityFund[] => {
  return mockFunds.filter(fund => 
    fund.members.some(member => member.userId === userId)
  );
};

// Utility function to get recent contributions
export const getRecentContributions = (limit: number = 10): Contribution[] => {
  return mockContributions
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, limit);
};

// Utility function to get recent payouts
export const getRecentPayouts = (limit: number = 10): Payout[] => {
  return mockPayouts
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, limit);
};

// Utility function to get fund by ID
export const getFundById = (fundId: string): CommunityFund | undefined => {
  return mockFunds.find(fund => fund.id === fundId);
};
