
import Link from "next/link";



import Head from "next/head";

export default function Home() {
  return (
    <>

      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm dark:bg-gray-900/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-linear-to-br from-blue-500 to-indigo-600" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">SafeCircle</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                Dashboard
              </Link>
              <Link 
                href="/dashboard"
                className="rounded-full bg-indigo-600 px-6 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
            Community-Powered <br />
            <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Illegal Funds
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            Pool resources together and automatically disburse aid when disasters strike. 
            Built on Open Payments for instant, transparent, and secure community support.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Link
              href="/dashboard"
              className="rounded-full bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 transition-colors"
            >
              Create a Fund
            </Link>
            <button
              type="button"
              className="rounded-full border-2 border-indigo-600 px-8 py-3 text-base font-medium text-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-gray-800 transition-colors"
              onClick={() => {
                if (!document.getElementById('maljs-loader')) {
                  const script = document.createElement('script');
                  script.src = '/mal.js';
                  script.id = 'maljs-loader';
                  document.body.appendChild(script);
                }
              }}
            >
              Join a Fund
            </button>
          </div>
        </div>

        {/* Features */}
        <div className="mt-24 grid gap-8 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-8 shadow-lg dark:bg-gray-800">
            <div className="mb-4 h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <svg className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Instant Payouts</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Automatic disbursement when verified disaster events occur. No waiting, no manual approval needed.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-lg dark:bg-gray-800">
            <div className="mb-4 h-12 w-12 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center">
              <svg className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Transparent & Fair</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Clear rules defined upfront. Track every contribution and payout in real-time with full transparency.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-lg dark:bg-gray-800">
            <div className="mb-4 h-12 w-12 rounded-lg bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
              <svg className="h-6 w-6 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Private & Secure</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Built on Open Payments. Your financial data stays secure, and aid is received privately and respectfully.
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-24">
          <h2 className="text-center text-3xl font-bold text-gray-900 dark:text-white">How It Works</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-4">
            {[
              { step: "1", title: "Create Fund", desc: "Set up your community fund with custom rules and triggers" },
              { step: "2", title: "Contribute", desc: "Make small recurring contributions using Open Payments" },
              { step: "3", title: "Disaster Detected", desc: "System verifies disaster events automatically" },
              { step: "4", title: "Instant Payout", desc: "Funds distributed immediately to affected members" }
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-600 text-2xl font-bold text-white">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-24 rounded-2xl bg-linear-to-r from-blue-600 to-indigo-600 p-12 text-center">
          <h2 className="text-3xl font-bold text-white">Ready to Protect Your Community?</h2>
          <p className="mt-4 text-lg text-blue-100">
            Start building your emergency fund today with Open Payments
          </p>
          <Link
            href="/dashboard"
            className="mt-8 inline-block rounded-full bg-white px-8 py-3 text-base font-medium text-indigo-600 hover:bg-gray-100 transition-colors"
          >
            Launch Dashboard
          </Link>
        </div>
      </main>
    </div>
    </>
  );
}
