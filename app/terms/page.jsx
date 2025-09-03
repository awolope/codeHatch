// pages/terms.js
import Link from 'next/link';
import { FaGraduationCap, FaFileContract } from 'react-icons/fa';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <FaGraduationCap className="text-teal-600 text-2xl mr-2" />
              <span className="text-xl font-bold text-gray-900">
                Techlyn<span className="text-emerald-700">Academy</span>
              </span>
            </Link>
            <nav className="hidden md:flex space-x-6">
              <Link href="/" className="text-gray-600 hover:text-emerald-700 transition-colors">
                Home
              </Link>
              <Link href="/courses" className="text-gray-600 hover:text-emerald-700 transition-colors">
                Courses
              </Link>
              <Link href="/guide" className="text-gray-600 hover:text-emerald-700 transition-colors">
                Guide
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-700 to-teal-600 p-6 text-white">
            <div className="flex items-center">
              <FaFileContract className="text-3xl mr-3" />
              <h1 className="text-3xl font-bold">Terms of Service</h1>
            </div>
            <p className="mt-2 opacity-90">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="p-6 md:p-8">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-600">
                By accessing or using TechyLyn Academy's services, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. User Accounts</h2>
              <p className="text-gray-600 mb-4">
                When you create an account with us, you must provide accurate and complete information. You are responsible for safeguarding the password and for all activities that occur under your account.
              </p>
              <p className="text-gray-600">
                You agree to notify us immediately of any unauthorized use of your account. We reserve the right to suspend or terminate your account if any information provided during registration proves to be inaccurate.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Course Access and Payments</h2>
              <p className="text-gray-600 mb-4">
                Access to courses is granted upon successful payment of the required fees. All fees are non-refundable except as required by law or as otherwise specifically permitted in our refund policy.
              </p>
              <p className="text-gray-600">
                We reserve the right to modify, suspend, or discontinue any course or content at any time without prior notice.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Intellectual Property</h2>
              <p className="text-gray-600 mb-4">
                All course materials, including but not limited to videos, text, graphics, logos, and software, are the property of TechyLyn Academy or its content suppliers and protected by copyright laws.
              </p>
              <p className="text-gray-600">
                You are granted a limited, non-exclusive, non-transferable license to access and use the courses for personal, non-commercial purposes. You may not reproduce, distribute, or create derivative works from any content without explicit permission.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Limitation of Liability</h2>
              <p className="text-gray-600">
                TechyLyn Academy shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your access to or use of, or inability to access or use, the services.
              </p>
            </section>
          </div>
        </div>
      </main>

    
    </div>
  );
}