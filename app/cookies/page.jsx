// pages/cookies.js
import Link from 'next/link';
import { FaGraduationCap, FaCookieBite } from 'react-icons/fa';

export default function CookiePolicy() {
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
              <FaCookieBite className="text-3xl mr-3" />
              <h1 className="text-3xl font-bold">Cookie Policy</h1>
            </div>
            <p className="mt-2 opacity-90">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="p-6 md:p-8">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. What Are Cookies</h2>
              <p className="text-gray-600">
                Cookies are small text files that are placed on your device by websites that you visit. They are widely used to make websites work more efficiently and provide information to the site owners.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. How We Use Cookies</h2>
              <p className="text-gray-600 mb-4">
                TechyLyn Academy uses cookies for several purposes:
              </p>
              <ul className="list-disc pl-5 text-gray-600 space-y-2">
                <li>
                  <strong>Essential cookies:</strong> These are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility.
                </li>
                <li>
                  <strong>Analytical/performance cookies:</strong> These allow us to recognize and count the number of visitors and see how visitors move around our website.
                </li>
                <li>
                  <strong>Functionality cookies:</strong> These are used to recognize you when you return to our website and enable personalized content.
                </li>
                <li>
                  <strong>Targeting cookies:</strong> These record your visit to our website, the pages you have visited, and the links you have followed.
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Third-Party Cookies</h2>
              <p className="text-gray-600 mb-4">
                In addition to our own cookies, we may also use various third-party cookies to report usage statistics of the service and deliver advertisements on and through the service.
              </p>
              <p className="text-gray-600">
                These third-party services may include Google Analytics, which we use to analyze how users interact with our site to improve user experience.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Managing Cookies</h2>
              <p className="text-gray-600 mb-4">
                You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies. If you disable or refuse cookies, please note that some parts of this website may become inaccessible or not function properly.
              </p>
              <p className="text-gray-600">
                For more information about how to manage cookies, visit <a href="https://www.aboutcookies.org" className="text-emerald-700 hover:underline" target="_blank" rel="noopener noreferrer">www.aboutcookies.org</a>.
              </p>
            </section>
          </div>
        </div>
      </main>

   
    </div>
  );
}