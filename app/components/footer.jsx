"use client";
import Link from "next/link";
import { FaGraduationCap, FaGithub, FaTwitter, FaLinkedin, FaYoutube } from "react-icons/fa";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  // Updated to emerald and teal colors
  const primary = "#047857";   // Emerald-700
  const secondary = "#0D9488"; // Teal-600

  return (
    <footer className="bg-white border-t border-gray-200 pt-12 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center">
              <FaGraduationCap className="text-[#0D9488] text-2xl mr-2" />
              <span className="text-xl font-bold text-gray-900">
                Techlyn<span className="text-[#047857]">Academy</span>
              </span>
            </Link>
            <p className="text-gray-600">
              Cutting-edge tech education for tomorrow's innovators.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-[#047857] transition-colors">
                <FaGithub className="text-xl" />
              </a>
              <a href="#" className="text-gray-500 hover:text-[#047857] transition-colors">
                <FaTwitter className="text-xl" />
              </a>
              <a href="#" className="text-gray-500 hover:text-[#047857] transition-colors">
                <FaLinkedin className="text-xl" />
              </a>
              <a href="#" className="text-gray-500 hover:text-[#047857] transition-colors">
                <FaYoutube className="text-xl" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/courses" className="text-gray-600 hover:text-[#047857] transition-colors">
                  Browse Courses
                </Link>
              </li>
             
              <li>
                <Link href="/guide" className="text-gray-600 hover:text-[#047857] transition-colors">
               Guide
                </Link>
              </li>
              <li>
                <Link href="/Faq" className="text-gray-600 hover:text-[#047857] transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FiMail className="mt-1 mr-2 text-[#0D9488]" />
                <span className="text-gray-600">contact@techlyn.academy</span>
              </li>
              <li className="flex items-start">
                <FiPhone className="mt-1 mr-2 text-[#0D9488]" />
                <span className="text-gray-600">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start">
                <FiMapPin className="mt-1 mr-2 text-[#0D9488]" />
                <span className="text-gray-600">123 Tech Street, Silicon Valley</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Newsletter</h3>
            <p className="text-gray-600">
              Stay updated with new courses and offers.
            </p>
            <form className="flex flex-col space-y-3">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded-md bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#047857] text-gray-800 placeholder-gray-400"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-[#047857] to-[#0D9488] text-white rounded-md hover:from-[#065F46] hover:to-[#0E766E] transition-colors font-medium"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {currentYear} Techlyn Academy. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-gray-500 hover:text-[#047857] text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-500 hover:text-[#047857] text-sm transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-gray-500 hover:text-[#047857] text-sm transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}