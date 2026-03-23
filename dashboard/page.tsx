'use client';

import Link from 'next/link';
import { getCurrentUser, getUserFunds, getRecentContributions, getRecentPayouts, mockDisasterEvents } from '../lib/mockData';

export default function Dashboard() {
  const user = getCurrentUser();
  const userFunds = getUserFunds(user.id);
  const recentContributions = getRecentContributions(5);
  const recentPayouts = getRecentPayouts(5);

  const totalContributed = recentContributions.reduce((sum, contrib) => sum + contrib.amount, 0);
  const totalReceived = recentPayouts.reduce((sum, payout) => sum + payout.amount, 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <nav className="border-b bg-white dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-linear-to-br from-blue-500 to-indigo-600" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">SafeCircle</span>
            </Link>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600 dark:text-gray-300">{user.name}</span>
              <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium">
                {user.name.charAt(0)}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Welcome back! Manage your funds and track contributions.
          </p>
        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Funds</p>
                <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{userFunds.length}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <svg className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Contributed</p>
                <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">₱{totalContributed.toLocaleString()}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                <svg className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Members</p>
                <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                  {userFunds.reduce((sum, fund) => sum + fund.memberCount, 0)}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                <svg className="h-6 w-6 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Payouts Received</p>
                <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">₱{totalReceived.toLocaleString()}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
                <svg className="h-6 w-6 text-orange-600 dark:text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* My Funds */}
          <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">My Funds</h2>
              <Link 
                href="/dashboard/create-fund"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
              >
                Create New
              </Link>
            </div>
            <div className="space-y-4">
              {userFunds.map((fund) => (
                <Link 
                  key={fund.id}
                  href={`/dashboard/fund/${fund.id}`}
                  className="block rounded-lg border border-gray-200 p-4 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{fund.name}</h3>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{fund.description}</p>
                      <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-500">
                        <span>{fund.memberCount} members</span>
                        <span>•</span>
                        <span>{fund.triggers.length} triggers</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900 dark:text-white">
                        ₱{fund.totalBalance.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500">Balance</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Recent Activity</h2>
            <div className="space-y-4">
              {recentContributions.map((contrib) => (
                <div key={contrib.id} className="flex items-start space-x-3">
                  <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center shrink-0">
                    <svg className="h-4 w-4 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">                      Contribution made
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      {new Date(contrib.timestamp).toLocaleDateString()} - ₱{contrib.amount.toLocaleString()}
                    </p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    contrib.status === 'completed' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                  }`}>
                    {contrib.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Disaster Events */}
        <div className="mt-8 rounded-lg bg-white p-6 shadow dark:bg-gray-800">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Recent Disaster Events</h2>
          <div className="space-y-4">
            {mockDisasterEvents.map((event) => (
              <div key={event.id} className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-gray-900 dark:text-white capitalize">{event.type}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        event.severity === 'critical' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                        event.severity === 'high' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' :
                        event.severity === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                        'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      }`}>
                        {event.severity}
                      </span>
                      {event.isVerified && (
                        <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          Verified
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{event.description}</p>
                    <div className="mt-2 text-xs text-gray-500 dark:text-gray-500">
                      <span>{event.location.region}, {event.location.country}</span>
                      <span className="mx-2">•</span>
                      <span>{new Date(event.detectedAt).toLocaleString()}</span>
                      {event.affectedPopulation && (
                        <>
                          <span className="mx-2">•</span>
                          <span>{event.affectedPopulation.toLocaleString()} affected</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <Link
            href="/dashboard/create-fund"
            className="flex items-center space-x-3 rounded-lg border-2 border-dashed border-gray-300 p-6 hover:border-indigo-500 dark:border-gray-700 dark:hover:border-indigo-400 transition-colors"
          >
            <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
              <svg className="h-5 w-5 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Create Fund</p>
              <p className="text-xs text-gray-500 dark:text-gray-500">Start a new community fund</p>
            </div>
          </Link>

          <Link
            href="/dashboard/contribute"
            className="flex items-center space-x-3 rounded-lg border-2 border-dashed border-gray-300 p-6 hover:border-green-500 dark:border-gray-700 dark:hover:border-green-400 transition-colors"
          >
            <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
              <svg className="h-5 w-5 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Make Contribution</p>
              <p className="text-xs text-gray-500 dark:text-gray-500">Add funds to your circles</p>
            </div>
          </Link>

          <Link
            href="/dashboard/wallet"
            className="flex items-center space-x-3 rounded-lg border-2 border-dashed border-gray-300 p-6 hover:border-purple-500 dark:border-gray-700 dark:hover:border-purple-400 transition-colors"
          >
            <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
              <svg className="h-5 w-5 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Wallet Settings</p>
              <p className="text-xs text-gray-500 dark:text-gray-500">Manage your wallet address</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
