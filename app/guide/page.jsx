// pages/guide.js
import Link from 'next/link';
import { FaGraduationCap, FaBookOpen } from 'react-icons/fa';

export default function Guide() {
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
              <Link href="/guide" className="text-gray-600 hover:text-emerald-700 transition-colors font-medium">
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
              <FaBookOpen className="text-3xl mr-3" />
              <h1 className="text-3xl font-bold">Student Guide</h1>
            </div>
            <p className="mt-2 opacity-90">Your comprehensive guide to success at TechyLyn Academy</p>
          </div>

          <div className="p-6 md:p-8">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Getting Started</h2>
              <p className="text-gray-600 mb-4">
                Welcome to TechyLyn Academy! This guide will help you navigate our platform and make the most of your learning experience.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-emerald-700 mb-2">Quick Steps:</h3>
                <ol className="list-decimal pl-5 text-gray-600 space-y-2">
                  <li>Complete your profile with relevant information</li>
                  <li>Explore the course catalog and enroll in your chosen courses</li>
                  <li>Set up your learning environment with the required tools</li>
                  <li>Join our student community forums</li>
                  <li>Schedule your study time for consistency</li>
                </ol>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Learning Paths</h2>
              <p className="text-gray-600 mb-4">
                We offer structured learning paths to help you achieve your career goals:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h3 className="font-semibold text-emerald-700 mb-2">Frontend Development</h3>
                  <ul className="list-disc pl-5 text-gray-600 text-sm">
                    <li>HTML, CSS & JavaScript Fundamentals</li>
                    <li>React.js & Next.js</li>
                    <li>UI/UX Design Principles</li>
                    <li>Progressive Web Apps</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h3 className="font-semibold text-emerald-700 mb-2">Data Science</h3>
                  <ul className="list-disc pl-5 text-gray-600 text-sm">
                    <li>Python for Data Analysis</li>
                    <li>Machine Learning Fundamentals</li>
                    <li>Data Visualization</li>
                    <li>Big Data Technologies</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Maximizing Your Learning</h2>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-blue-700 mb-2">Pro Tips:</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>Code along with instructors instead of just watching</li>
                  <li>Join study groups to enhance understanding</li>
                  <li>Practice regularly with our coding challenges</li>
                  <li>Don't hesitate to ask questions in the community forums</li>
                  <li>Build projects to apply what you've learned</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Technical Requirements</h2>
              <p className="text-gray-600 mb-4">
                To ensure the best learning experience, make sure your system meets these requirements:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Hardware</h4>
                    <ul className="list-disc pl-5 text-gray-600 text-sm">
                      <li>8GB RAM minimum (16GB recommended)</li>
                      <li>Multi-core processor</li>
                      <li>20GB of free storage</li>
                      <li>Reliable internet connection</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Software</h4>
                    <ul className="list-disc pl-5 text-gray-600 text-sm">
                      <li>Modern browser (Chrome, Firefox, Safari, Edge)</li>
                      <li>Code editor (VS Code recommended)</li>
                      <li>Node.js LTS version</li>
                      <li>Git for version control</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}