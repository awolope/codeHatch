"use client";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { FiMenu, FiX, FiSearch, FiUser, FiBook, FiHome, FiAward, FiUsers, FiBarChart2 } from "react-icons/fi";
import { FaGraduationCap } from "react-icons/fa";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Updated color variables to emerald and teal
  const primary = "#047857";   // Emerald-700
  const secondary = "#0D9488"; // Teal-600

  const navItems = [
    { name: "Home", path: "/", icon: <FiHome className="mr-2" /> },
    { name: "Courses", path: "/courses", icon: <FiBook className="mr-2" /> },
    { name: "Instructors", path: "/instructors", icon: <FiUsers className="mr-2" /> },
    { name: "My Learning", path: "/learning", icon: <FiAward className="mr-2" /> },
    { name: "Dashboard", path: "/dashboard", icon: <FiBarChart2 className="mr-2" /> },
  ];

  useEffect(() => {
    const checkAuth = () => {
      setIsLoading(true);
      const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
      
      if (token) {
        setIsLoggedIn(true);
        const userData = localStorage.getItem("userData") || sessionStorage.getItem("userData");
        if (userData) {
          const parsedData = JSON.parse(userData);
          setUserName(parsedData.name || "");
        }
      } else {
        setIsLoggedIn(false);
        setUserName("");
      }
      setIsLoading(false);
    };

    checkAuth();

    const handleStorageChange = (e) => {
      if (e.key === "authToken" || e.key === "userData") {
        checkAuth();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.error("Logout error:", error);
    }
    
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    sessionStorage.removeItem("userData");
    
    setIsLoggedIn(false);
    setUserName("");
    router.push("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setMobileMenuOpen(false);
    }
  };

  if (isLoading) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <div className="animate-pulse w-full h-8 bg-gray-200 rounded"></div>
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
              {navItems.map((item) => (
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
                >
                  Logout
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
            {navItems.map((item) => (
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
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-center py-2 px-4 my-1 text-white bg-gradient-to-r from-[#047857] to-[#0D9488] rounded-md hover:from-[#065F46] hover:to-[#0E766E]"
                  >
                    Logout
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