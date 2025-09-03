// pages/privacy.js
import Link from 'next/link';
import { FaGraduationCap, FaShieldAlt } from 'react-icons/fa';

export default function PrivacyPolicy() {
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
              <FaShieldAlt className="text-3xl mr-3" />
              <h1 className="text-3xl font-bold">Privacy Policy</h1>
            </div>
            <p className="mt-2 opacity-90">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="p-6 md:p-8">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Information We Collect</h2>
              <p className="text-gray-600 mb-4">
                At TechyLyn Academy, we collect information to provide better services to all our users. We collect information in the following ways:
              </p>
              <ul className="list-disc pl-5 text-gray-600 space-y-2">
                <li>Information you give us. For example, when you create an account, we'll ask for personal information like your name, email address, and telephone number.</li>
                <li>Information we get from your use of our services. We collect information about the services that you use and how you use them.</li>
                <li>Information from third-party partners. We may receive information about you from third parties, such as partners who provide services on our behalf.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. How We Use Information</h2>
              <p className="text-gray-600 mb-4">
                We use the information we collect from all our services for the following purposes:
              </p>
              <ul className="list-disc pl-5 text-gray-600 space-y-2">
                <li>Provide, maintain, and improve our services</li>
                <li>Develop new services</li>
                <li>Provide personalized content and information</li>
                <li>Measure performance and understand how our services are used</li>
                <li>Communicate with you about products, services, and promotional offers</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Information Sharing</h2>
              <p className="text-gray-600 mb-4">
                We do not share personal information with companies, organizations, or individuals outside of TechyLyn Academy except in the following cases:
              </p>
              <ul className="list-disc pl-5 text-gray-600 space-y-2">
                <li>With your consent</li>
                <li>For external processing with our trusted partners</li>
                <li>For legal reasons when we believe in good faith that access, use, preservation, or disclosure is necessary</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Your Rights</h2>
              <p className="text-gray-600 mb-4">
                You have the right to access, correct, or delete your personal information. You can also object to or restrict certain processing of your data.
              </p>
              <p className="text-gray-600">
                If you have any questions about this Privacy Policy, please contact us at privacy@techlyn.academy.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}