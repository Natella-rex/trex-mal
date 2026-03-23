'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CreateFund() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    contributionFrequency: 'weekly',
    minimumContribution: 100,
    maximumContribution: '',
    distributionMethod: 'equal',
    payoutCap: '',
    requiresConsensus: false,
    votingEnabled: true,
    proposalThreshold: 10,
    approvalThreshold: 66,
  });

  const [triggers, setTriggers] = useState([
    {
      type: 'flood',
      severity: 'medium',
      autoActivate: true,
    }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would create the fund via API
    console.log('Creating fund:', formData, triggers);
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <nav className="border-b bg-white dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">SafeCircle</span>
            </Link>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link href="/dashboard" className="text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
            ← Back to Dashboard
          </Link>
        </div>

        <div className="rounded-lg bg-white p-8 shadow dark:bg-gray-800">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Create Emergency Fund</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Set up a community fund with automated triggers and transparent rules
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-8">
            {/* Basic Information */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Basic Information</h2>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Fund Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="e.g., Metro Manila Emergency Fund"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Description
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Describe the purpose of this fund"
                  />
                </div>
              </div>
            </div>

            {/* Contribution Rules */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Contribution Rules</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Frequency
                  </label>
                  <select
                    value={formData.contributionFrequency}
                    onChange={(e) => setFormData({ ...formData, contributionFrequency: e.target.value as any })}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Minimum Contribution (₱)
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.minimumContribution}
                    onChange={(e) => setFormData({ ...formData, minimumContribution: parseFloat(e.target.value) })}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Maximum Contribution (₱, optional)
                  </label>
                  <input
                    type="number"
                    value={formData.maximumContribution}
                    onChange={(e) => setFormData({ ...formData, maximumContribution: e.target.value })}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Payout Cap (₱, optional)
                  </label>
                  <input
                    type="number"
                    value={formData.payoutCap}
                    onChange={(e) => setFormData({ ...formData, payoutCap: e.target.value })}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                  />
                </div>
              </div>
            </div>

            {/* Distribution Method */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Distribution Method</h2>
              <div className="mt-4 space-y-2">
                {[
                  { value: 'equal', label: 'Equal Split', desc: 'Everyone receives the same amount' },
                  { value: 'severity-based', label: 'Severity Based', desc: 'Based on disaster severity in location' },
                  { value: 'household-size', label: 'Household Size', desc: 'Proportional to household size' },
                  { value: 'proportional', label: 'Proportional', desc: 'Based on contribution amount' },
                ].map((method) => (
                  <label key={method.value} className="flex items-start space-x-3 rounded-lg border border-gray-200 p-4 cursor-pointer hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700">
                    <input
                      type="radio"
                      name="distributionMethod"
                      value={method.value}
                      checked={formData.distributionMethod === method.value}
                      onChange={(e) => setFormData({ ...formData, distributionMethod: e.target.value as any })}
                      className="mt-1"
                    />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{method.label}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{method.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Disaster Triggers */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Disaster Triggers</h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Define what events will automatically trigger payouts
              </p>
              <div className="mt-4 space-y-4">
                {triggers.map((trigger, index) => (
                  <div key={index} className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                    <div className="grid gap-4 sm:grid-cols-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Disaster Type
                        </label>
                        <select
                          value={trigger.type}
                          onChange={(e) => {
                            const newTriggers = [...triggers];
                            newTriggers[index].type = e.target.value as any;
                            setTriggers(newTriggers);
                          }}
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                        >
                          <option value="flood">Flood</option>
                          <option value="typhoon">Typhoon</option>
                          <option value="earthquake">Earthquake</option>
                          <option value="wildfire">Wildfire</option>
                          <option value="drought">Drought</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Minimum Severity
                        </label>
                        <select
                          value={trigger.severity}
                          onChange={(e) => {
                            const newTriggers = [...triggers];
                            newTriggers[index].severity = e.target.value as any;
                            setTriggers(newTriggers);
                          }}
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                        >
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                          <option value="critical">Critical</option>
                        </select>
                      </div>

                      <div className="flex items-end">
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={trigger.autoActivate}
                            onChange={(e) => {
                              const newTriggers = [...triggers];
                              newTriggers[index].autoActivate = e.target.checked;
                              setTriggers(newTriggers);
                            }}
                            className="rounded"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">Auto-activate</span>
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setTriggers([...triggers, { type: 'flood', severity: 'medium', autoActivate: true }])}
                  className="text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
                >
                  + Add another trigger
                </button>
              </div>
            </div>

            {/* Governance */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Governance</h2>
              <div className="mt-4 space-y-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.votingEnabled}
                    onChange={(e) => setFormData({ ...formData, votingEnabled: e.target.checked })}
                    className="rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Enable community voting on rule changes</span>
                </label>

                {formData.votingEnabled && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Proposal Threshold (%)
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={formData.proposalThreshold}
                        onChange={(e) => setFormData({ ...formData, proposalThreshold: parseFloat(e.target.value) })}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                      />
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        % of members needed to create a proposal
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Approval Threshold (%)
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={formData.approvalThreshold}
                        onChange={(e) => setFormData({ ...formData, approvalThreshold: parseFloat(e.target.value) })}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                      />
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        % of votes needed to approve
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Submit */}
            <div className="flex justify-end space-x-4">
              <Link
                href="/dashboard"
                className="rounded-lg border border-gray-300 px-6 py-2 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="rounded-lg bg-indigo-600 px-6 py-2 text-white hover:bg-indigo-700"
              >
                Create Fund
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
