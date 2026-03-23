'use client';

import { useState } from 'react';
import Link from 'next/link';
import { getUserFunds, getCurrentUser } from '../../lib/mockData';
import { openPaymentsService } from '../../lib/openPayments';

export default function Contribute() {
  const user = getCurrentUser();
  const userFunds = getUserFunds(user.id);
  
  const [selectedFund, setSelectedFund] = useState(userFunds[0]?.id || '');
  const [amount, setAmount] = useState('');
  const [isRecurring, setIsRecurring] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const selectedFundData = userFunds.find(f => f.id === selectedFund);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    try {
      // Simulate Open Payments payment flow
      console.log('Initiating Open Payments transaction...');
      
      // Get fund's wallet address (in production, this would be from the fund)
      const fundWalletAddress = openPaymentsService.generateMockWalletAddress(`fund_${selectedFund}`);
      
      // Create payment using Open Payments
      const payment = await openPaymentsService.sendPayment(
        user.walletAddress,
        fundWalletAddress,
        amount,
        `Contribution to ${selectedFundData?.name}`
      );

      console.log('Payment created:', payment);

      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000));

      setSuccess(true);
      setAmount('');
      
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

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

      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link href="/dashboard" className="text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
            ← Back to Dashboard
          </Link>
        </div>

        <div className="rounded-lg bg-white p-8 shadow dark:bg-gray-800">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Make Contribution</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Contribute to your community funds using Open Payments
          </p>

          {success && (
            <div className="mt-6 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
              <div className="flex">
                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800 dark:text-green-200">
                    Contribution successful! Payment processed via Open Payments.
                  </p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {/* Fund Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Select Fund
              </label>
              <select
                required
                value={selectedFund}
                onChange={(e) => setSelectedFund(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
              >
                {userFunds.map((fund) => (
                  <option key={fund.id} value={fund.id}>
                    {fund.name} - ₱{fund.totalBalance.toLocaleString()} balance
                  </option>
                ))}
              </select>
            </div>

            {selectedFundData && (
              <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
                <h3 className="font-medium text-gray-900 dark:text-white">Fund Details</h3>
                <div className="mt-2 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  <p>Members: {selectedFundData.memberCount}</p>
                  <p>Minimum: ₱{selectedFundData.rules.minimumContribution.toLocaleString()}</p>
                  {selectedFundData.rules.maximumContribution && (
                    <p>Maximum: ₱{selectedFundData.rules.maximumContribution.toLocaleString()}</p>
                  )}
                  <p>Frequency: {selectedFundData.rules.contributionFrequency}</p>
                </div>
              </div>
            )}

            {/* Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Amount (₱)
              </label>
              <input
                type="number"
                required
                min={selectedFundData?.rules.minimumContribution}
                max={selectedFundData?.rules.maximumContribution}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter amount"
              />
              {selectedFundData && (
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Min: ₱{selectedFundData.rules.minimumContribution}
                  {selectedFundData.rules.maximumContribution && ` - Max: ₱${selectedFundData.rules.maximumContribution}`}
                </p>
              )}
            </div>

            {/* Recurring */}
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={isRecurring}
                  onChange={(e) => setIsRecurring(e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Make this a recurring contribution ({selectedFundData?.rules.contributionFrequency})
                </span>
              </label>
              {isRecurring && (
                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  You'll be prompted for consent at each payment through Open Payments interactive grants
                </p>
              )}
            </div>

            {/* Open Payments Info */}
            <div className="rounded-lg border border-indigo-200 bg-indigo-50 p-4 dark:border-indigo-800 dark:bg-indigo-900/20">
              <div className="flex items-start space-x-3">
                <svg className="h-5 w-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h4 className="text-sm font-medium text-indigo-900 dark:text-indigo-200">
                    Powered by Open Payments
                  </h4>
                  <p className="mt-1 text-xs text-indigo-700 dark:text-indigo-300">
                    Your payment will be processed securely using Open Payments protocol. You'll grant permission directly to your account provider - no sensitive information is shared with third parties.
                  </p>
                  <p className="mt-2 text-xs text-indigo-600 dark:text-indigo-400">
                    Your wallet: <code className="bg-white dark:bg-gray-800 px-1 py-0.5 rounded">{user.walletAddress}</code>
                  </p>
                </div>
              </div>
            </div>

            {/* Payment Flow Info */}
            <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                Payment Process
              </h3>
              <div className="space-y-2">
                {[
                  { step: 1, title: 'Grant Request', desc: 'Request permission from your account provider' },
                  { step: 2, title: 'Create Quote', desc: 'Calculate fees and exchange rates' },
                  { step: 3, title: 'Interactive Consent', desc: 'Approve the payment in your wallet' },
                  { step: 4, title: 'Execute Payment', desc: 'Funds transferred via ILP protocol' }
                ].map((item) => (
                  <div key={item.step} className="flex items-start space-x-3">
                    <div className="shrink-0 h-6 w-6 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-xs font-bold text-indigo-600 dark:text-indigo-400">
                      {item.step}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{item.title}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
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
                disabled={processing}
                className="rounded-lg bg-indigo-600 px-6 py-2 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {processing ? 'Processing...' : 'Contribute'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
