"use client"; 
import { useState, useEffect, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { FiMenu, FiX, FiSearch, FiUser, FiBook, FiHome, FiAward, FiUsers, FiBarChart2 } from "react-icons/fi";
import { FaGraduationCap } from "react-icons/fa";

// Debounce function to limit API calls
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [authCheckAttempts, setAuthCheckAttempts] = useState(0);

  const primary = "#047857";
  const secondary = "#0D9488";

  const navItems = [
    { name: "Home", path: "/", icon: <FiHome className="mr-2" /> },
    { name: "Courses", path: "/courses", icon: <FiBook className="mr-2" /> },
    { name: "Instructors", path: "/instructors", icon: <FiUsers className="mr-2" /> },
    { name: "My Learning", path: "/learning", icon: <FiAward className="mr-2" /> },
    { name: "Dashboard", path: "/dashboard", icon: <FiBarChart2 className="mr-2" />, roles: ["admin", "tutor"] },
  ];

  // Memoized auth check function
  const checkAuthStatus = useCallback(async () => {
    try {
      // Don't attempt too many times if failing
      if (authCheckAttempts > 3) {
        setIsLoading(false);
        return;
      }

      const response = await fetch('/api/auth/verify', {
        method: 'GET',
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        setIsLoggedIn(true);
        setUserName(data.user.name || "");
        setUserRole(data.user.role || "");
        setAuthCheckAttempts(0); // Reset counter on success
      } else {
        setIsLoggedIn(false);
        setUserName("");
        setUserRole("");
        setAuthCheckAttempts(prev => prev + 1);
      }
    } catch (error) {
      console.error("Auth check error:", error);
      setIsLoggedIn(false);
      setUserName("");
      setUserRole("");
      setAuthCheckAttempts(prev => prev + 1);
    } finally {
      setIsLoading(false);
    }
  }, [authCheckAttempts]);

  // Debounced version of auth check
  const debouncedAuthCheck = useCallback(debounce(checkAuthStatus, 300), [checkAuthStatus]);

  useEffect(() => {
    debouncedAuthCheck();
  }, [debouncedAuthCheck]);

  useEffect(() => {
    // Set up interval to check auth status periodically
    const intervalId = setInterval(debouncedAuthCheck, 300000); // Check every 5 minutes

    return () => clearInterval(intervalId);
  }, [debouncedAuthCheck]);

  // Filter nav items based on user role
  const filteredNavItems = navItems.filter(item => {
    if (item.roles && !item.roles.includes(userRole)) {
      return false;
    }
    return true;
  });

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      
      if (response.ok) {
        setIsLoggedIn(false);
        setUserName("");
        setUserRole("");
        router.push("/login");
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoading(false);
      setMobileMenuOpen(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setMobileMenuOpen(false);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-200 animate-pulse rounded-full mr-2"></div>
              <div className="h-6 w-32 bg-gray-200 animate-pulse rounded"></div>
            </div>
            <div className="hidden md:flex space-x-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-6 w-16 bg-gray-200 animate-pulse rounded"></div>
              ))}
            </div>
            <div className="h-8 w-24 bg-gray-200 animate-pulse rounded"></div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and mobile menu button */}
          <div className="flex items-center">
            <button
              className="md:hidden mr-2 p-2 text-gray-800 hover:text-[#047857]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
            
            <Link href="/" className="flex items-center">
              <FaGraduationCap className="text-[#0D9488] text-2xl" />
              <span className="text-base md:text-lg font-bold text-gray-900 ml-2">
                Techlyn<span className="text-[#047857]">Academy</span>
              </span>
            </Link>
          </div>

          {/* Search bar - shown on medium and larger screens */}
          <div className="hidden md:flex flex-1 max-w-xl mx-4 lg:mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative flex items-center w-full">
                <FiSearch className="absolute left-3 text-gray-500 text-sm" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search courses..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-[#047857] placeholder-gray-500"
                />
              </div>
            </form>
          </div>

          {/* Desktop navigation and auth */}
          <div className="hidden md:flex items-center space-x-2">
            <div className="flex items-center space-x-1 lg:space-x-2">
              {filteredNavItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`flex items-center px-3 py-2 text-gray-800 hover:text-[#047857] text-sm transition-colors ${
                    pathname === item.path
                      ? "text-[#047857] font-medium border-b-2 border-[#0D9488] pb-1"
                      : ""
                  }`}
                >
                  {item.icon}
                  <span className="hidden lg:inline ml-1">{item.name}</span>
                </Link>
              ))}
            </div>

            <div className="border-l border-gray-300 h-6 mx-1"></div>

            {isLoggedIn ? (
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-800 border border-gray-300">
                    <FiUser className="text-[#047857]" />
                  </div>
                  <span className="text-sm text-gray-900 ml-2 hidden lg:inline">
                    {userName || "Welcome back"}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 text-sm text-white bg-gradient-to-r from-[#047857] to-[#0D9488] rounded-md hover:from-[#065F46] hover:to-[#0E766E] transition-colors"
                  disabled={isLoading}
                >
                  {isLoading ? '...' : 'Logout'}
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => router.push("/login")}
                  className="px-3 py-1.5 text-sm text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => router.push("/signup")}
                  className="px-3 py-1.5 text-sm text-white bg-gradient-to-r from-[#047857] to-[#0D9488] rounded-md hover:from-[#065F46] hover:to-[#0E766E] transition-colors"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>

          {/* Mobile search button */}
          <button
            className="md:hidden ml-2 p-2 text-gray-800 hover:text-[#047857]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Search"
          >
            <FiSearch size={20} />
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white py-2 border-t border-gray-200">
            {/* Mobile search */}
            <div className="px-4 py-3">
              <form onSubmit={handleSearch}>
                <div className="relative flex items-center">
                  <FiSearch className="absolute left-3 text-gray-500 text-sm" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search courses..."
                    className="w-full pl-10 pr-4 py-2 bg-gray-100 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-[#047857] placeholder-gray-500"
                  />
                </div>
              </form>
            </div>

            {/* Mobile nav items */}
            {filteredNavItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className={`flex items-center px-4 py-3 text-gray-800 ${
                  pathname === item.path ? "text-[#047857] bg-gray-100" : "hover:bg-gray-50"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}

            <div className="border-t border-gray-200 mt-2 pt-2 px-4">
              {isLoggedIn ? (
                <>
                  <div className="flex items-center px-4 py-3 text-gray-900">
                    <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center mr-2 border border-gray-300">
                      <FiUser className="text-[#047857] text-xs" />
                    </div>
                    {userName || "My Account"}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-center py-2 px-4 my-1 text-white bg-gradient-to-r from-[#047857] to-[#0D9488] rounded-md hover:from-[#065F46] hover:to-[#0E766E]"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Logging out...' : 'Logout'}
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      router.push("/login");
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-center py-2 px-4 my-1 text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      router.push("/signup");
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-center py-2 px-4 my-1 text-white bg-gradient-to-r from-[#047857] to-[#0D9488] rounded-md hover:from-[#065F46] hover:to-[#0E766E]"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}