'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { FaGraduationCap, FaMicrochip, FaCode, FaServer } from 'react-icons/fa';

const normalizeEmail = (email) => email.trim().toLowerCase();

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const normalizedData = { ...formData, email: normalizeEmail(formData.email) };

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ action: 'login', ...normalizedData }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'Login failed');

      if (data.token && typeof window !== 'undefined') {
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem('authToken', data.token);
      }

      const role = data.user?.role;
      if (role === 'student') router.push('/courses');
      else if (role === 'tutor' || role === 'admin') router.push('/dashboard');
      else router.push('/');

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Floating tech elements
  const floatingElements = [
    { icon: <FaMicrochip className="text-emerald-400/30" />, size: 24, duration: 15, path: [[0, 0], [100, 50], [0, 100]] },
    { icon: <FaCode className="text-emerald-400/30" />, size: 20, duration: 20, path: [[100, 0], [0, 50], [100, 100]] },
    { icon: <FaServer className="text-emerald-400/30" />, size: 28, duration: 25, path: [[50, 0], [100, 50], [50, 100]] },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-white relative overflow-hidden font-inter">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Binary code rain */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-0 text-emerald-400/10 text-xs font-mono whitespace-nowrap"
            style={{ left: `${(i * 100) / 15}%` }}
            initial={{ y: -1000 }}
            animate={{ y: "100vh" }}
            transition={{
              duration: Math.random() * 10 + 15,
              delay: Math.random() * 5,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {[...Array(30)].map((_, j) => (
              <span key={j} className="opacity-70">
                {Math.random() > 0.5 ? "1" : "0"}
                {j % 5 === 0 ? " " : ""}
              </span>
            ))}
          </motion.div>
        ))}

        {/* Floating tech icons */}
        {floatingElements.map((element, index) => (
          <motion.div
            key={index}
            className="absolute"
            style={{ fontSize: `${element.size}px` }}
            animate={{
              x: element.path.map(p => `${p[0]}vw`),
              y: element.path.map(p => `${p[1]}vh`),
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: element.duration,
              delay: index * 5,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear"
            }}
          >
            {element.icon}
          </motion.div>
        ))}
      </div>

      {/* Login card */}
      <motion.div 
        className="relative w-full max-w-md p-8 rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden z-10 bg-white/90 backdrop-blur-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Card header */}
        <div className="text-center mb-8">
          <motion.div 
            className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-emerald-100 mb-4 shadow-md text-emerald-800 text-4xl"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <FaGraduationCap />
          </motion.div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
          <p className="mt-2 text-gray-600">Sign in to continue your learning journey</p>
        </div>

        {error && (
          <motion.div 
            className="mb-4 p-3 bg-red-50 text-red-900 text-sm rounded-md"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            {error}
          </motion.div>
        )}

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-transparent"
              autoComplete="username"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-transparent pr-10"
                autoComplete="current-password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-emerald-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </motion.div>

          <motion.div 
            className="flex items-center justify-between"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-emerald-700 focus:ring-emerald-700 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <Link href="/request-reset-password" className="font-medium text-emerald-700 hover:text-emerald-800">
                Forgot password?
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <motion.button
              type="submit"
              disabled={loading}
              className={`w-full py-2 px-4 bg-emerald-700 text-white rounded-md hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              whileHover={!loading ? { scale: 1.02 } : {}}
              whileTap={!loading ? { scale: 0.98 } : {}}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </motion.button>
          </motion.div>
        </form>

        <motion.div
          className="mt-6 text-center text-sm text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Don't have an account?{' '}
          <Link href="/signup" className="font-medium text-emerald-700 hover:text-emerald-800">
            Sign up
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}