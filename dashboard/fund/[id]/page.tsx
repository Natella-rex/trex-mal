'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getFundById, mockContributions, mockPayouts } from '../../../lib/mockData';

export default function FundDetail() {

  const params = useParams();
  const fundId = params && typeof params === 'object' && 'id' in params && params.id ? (params.id as string) : undefined;
  const fund = fundId ? getFundById(fundId) : undefined;

  if (!fund) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Fund not found</h1>
          <Link href="/dashboard" className="mt-4 text-indigo-600 hover:text-indigo-500">
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const fundContributions = mockContributions.filter(c => c.fundId === fundId);
  const fundPayouts = mockPayouts.filter(p => p.fundId === fundId);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <nav className="border-b bg-white dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-linear-to-br from-blue-500 to-indigo-600" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">SafeCircle</span>
            </Link>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link href="/dashboard" className="text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
            ← Back to Dashboard
          </Link>
        </div>

        {/* Fund Header */}
        <div className="mb-8 rounded-lg bg-white p-8 shadow dark:bg-gray-800">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{fund.name}</h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400">{fund.description}</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                ₱{fund.totalBalance.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500">Total Balance</p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400">Members</p>
              <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">{fund.memberCount}</p>
            </div>
            <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Triggers</p>
              <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">{fund.triggers.length}</p>
            </div>
            <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Payouts</p>
              <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">{fundPayouts.length}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Fund Rules */}
          <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Fund Rules</h2>
            <div className="mt-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Contribution Frequency</span>
                <span className="font-medium text-gray-900 dark:text-white capitalize">
                  {fund.rules.contributionFrequency}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Minimum Contribution</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  ₱{fund.rules.minimumContribution.toLocaleString()}
                </span>
              </div>
              {fund.rules.maximumContribution && (
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Maximum Contribution</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    ₱{fund.rules.maximumContribution.toLocaleString()}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Distribution Method</span>
                <span className="font-medium text-gray-900 dark:text-white capitalize">
                  {fund.rules.distributionMethod.replace('-', ' ')}
                </span>
              </div>
              {fund.rules.payoutCap && (
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Payout Cap</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    ₱{fund.rules.payoutCap.toLocaleString()}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Governance */}
          <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Governance</h2>
            <div className="mt-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Voting Enabled</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {fund.governance.votingEnabled ? 'Yes' : 'No'}
                </span>
              </div>
              {fund.governance.votingEnabled && (
                <>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Proposal Threshold</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {fund.governance.proposalThreshold}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Approval Threshold</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {fund.governance.approvalThreshold}%
                    </span>
                  </div>
                </>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Active Proposals</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {fund.governance.proposals.length}
                </span>
              </div>
            </div>
          </div>

          {/* Disaster Triggers */}
          <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Disaster Triggers</h2>
            <div className="mt-4 space-y-4">
              {fund.triggers.map((trigger) => (
                <div key={trigger.id} className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white capitalize">{trigger.type}</h3>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        {trigger.location.region}, {trigger.location.country}
                      </p>
                      {trigger.location.radius && (
                        <p className="text-xs text-gray-500 dark:text-gray-500">
                          Radius: {trigger.location.radius}km
                        </p>
                      )}
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      trigger.severity === 'critical' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                      trigger.severity === 'high' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' :
                      trigger.severity === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                      'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    }`}>
                      {trigger.severity}
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {trigger.autoActivate && (
                      <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        Auto-activate
                      </span>
                    )}
                    {trigger.requiresVerification && (
                      <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        Requires verification
                      </span>
                    )}
                  </div>
                  {trigger.verificationSource && (
                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-500">
                      Source: {trigger.verificationSource}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Members */}
          <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Members</h2>
            <div className="mt-4 space-y-3">
              {fund.members.map((member) => (
                <div key={member.userId} className="flex items-center justify-between rounded-lg border border-gray-200 p-3 dark:border-gray-700">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium">
                      {member.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{member.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        Joined {new Date(member.joinedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900 dark:text-white">
                      ₱{member.totalContributed.toLocaleString()}
                    </p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      member.role === 'admin' 
                        ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' 
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                    }`}>
                      {member.role}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="mt-8 rounded-lg bg-white p-6 shadow dark:bg-gray-800">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Transactions</h2>
          <div className="mt-4 space-y-4">
            {fundContributions.map((contrib) => (
              <div key={contrib.id} className="flex items-center justify-between rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Contribution</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">
                    {new Date(contrib.timestamp).toLocaleString()}
                  </p>
                  {contrib.isRecurring && (
                    <span className="mt-1 inline-block text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      Recurring
                    </span>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-600 dark:text-green-400">
                    +₱{contrib.amount.toLocaleString()}
                  </p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    contrib.status === 'completed' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                  }`}>
                    {contrib.status}
                  </span>
                </div>
              </div>
            ))}
            {fundPayouts.map((payout) => (
              <div key={payout.id} className="flex items-center justify-between rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Payout</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">
                    {new Date(payout.timestamp).toLocaleString()}
                  </p>
                  <span className="mt-1 inline-block text-xs px-2 py-1 rounded-full bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                    Emergency disbursement
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-red-600 dark:text-red-400">
                    -₱{payout.amount.toLocaleString()}
                  </p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    payout.status === 'completed' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                  }`}>
                    {payout.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
