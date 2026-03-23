'use client';

import { useState } from 'react';
import Link from 'next/link';
import { getCurrentUser } from '../../lib/mockData';
import { openPaymentsService } from '../../lib/openPayments';

export default function Wallet() {
  const user = getCurrentUser();
  const [walletAddress, setWalletAddress] = useState(user.walletAddress);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    // In production, this would update via API
    console.log('Updating wallet address:', walletAddress);
    setIsEditing(false);
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

      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link href="/dashboard" className="text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
            ← Back to Dashboard
          </Link>
        </div>

        <div className="rounded-lg bg-white p-8 shadow dark:bg-gray-800">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Wallet Settings</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Manage your Open Payments wallet address
          </p>

          {/* Wallet Address */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Your Wallet Address</h2>
            <div className="mt-4">
              {isEditing ? (
                <div>
                  <input
                    type="url"
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                    placeholder="https://wallet.example.com/yourname"
                  />
                  <div className="mt-4 flex space-x-2">
                    <button
                      onClick={handleSave}
                      className="rounded-lg bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setWalletAddress(user.walletAddress);
                        setIsEditing(false);
                      }}
                      className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                  <code className="text-sm text-gray-900 dark:text-white">{walletAddress}</code>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Open Payments Info */}
          <div className="mt-8 rounded-lg border border-blue-200 bg-blue-50 p-6 dark:border-blue-800 dark:bg-blue-900/20">
            <h3 className="font-semibold text-gray-900 dark:text-white">About Open Payments Wallet Addresses</h3>
            <div className="mt-4 space-y-3 text-sm text-gray-700 dark:text-gray-300">
              <p>
                Your wallet address is a URL that identes your financial account in the Open Payments network. 
                It's like an email address for payments - easy to remember and share.
              </p>
              <p className="font-medium">Key features:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Publicly shareable account identifier</li>
                <li>Service endpoint for Open Payments API</li>
                <li>No sensitive financial information exposed</li>
                <li>Works across any Account Servicing Entity (ASE)</li>
              </ul>
            </div>
          </div>

          {/* How it Works */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">How Open Payments Works</h2>
            <div className="mt-4 space-y-4">
              {[
                {
                  title: 'No Intermediaries',
                  desc: 'Connect directly to your account provider without payment processors like Stripe or PayPal',
                  icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  )
                },
                {
                  title: 'Fine-Grained Control',
                  desc: 'Grant specific permissions with amount and time limits using GNAP protocol',
                  icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  )
                },
                {
                  title: 'Interoperable',
                  desc: 'Send and receive payments across different banks, wallets, and mobile money providers',
                  icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  )
                },
                {
                  title: 'Secure by Design',
                  desc: 'All requests are signed, no sensitive data shared, you stay in control',
                  icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  )
                }
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-4 rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                  <div className="shrink-0 h-10 w-10 rounded-lg bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                    <svg className="h-5 w-5 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      {item.icon}
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Flow */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Payment Flow</h2>
            <div className="mt-4 rounded-lg border border-gray-200 p-6 dark:border-gray-700">
              <div className="space-y-4">
                {[
                  { step: '1', title: 'Grant Request', desc: 'Request permission to access account with specific scopes' },
                  { step: '2', title: 'Create Incoming Payment', desc: 'Recipient ASE generates unique payment details' },
                  { step: '3', title: 'Create Quote', desc: 'Sender ASE calculates fees and creates binding quote' },
                  { step: '4', title: 'Interactive Consent', desc: 'Account holder approves the outgoing payment' },
                  { step: '5', title: 'Execute Payment', desc: 'Funds transferred via ILP protocol in small packets' },
                  { step: '6', title: 'Settle', desc: 'ASEs settle on their existing payment rails' }
                ].map((item) => (
                  <div key={item.step} className="flex items-start space-x-4">
                    <div className="shrink-0 h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                      {item.step}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 dark:text-white">{item.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Supported ASEs */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Account Servicing Entities (ASEs)</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Open Payments can be implemented by any financial institution including:
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                'Banks & Credit Unions',
                'Mobile Money Providers',
                'Digital Wallet Services',
                'Payment Service Providers',
                'Cryptocurrency Exchanges',
                'Fintech Platforms'
              ].map((ase, index) => (
                <div key={index} className="flex items-center space-x-2 rounded-lg border border-gray-200 p-3 dark:border-gray-700">
                  <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-gray-900 dark:text-white">{ase}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
