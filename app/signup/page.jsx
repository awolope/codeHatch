"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiEye, FiEyeOff, FiCheck, FiX, FiAlertCircle } from "react-icons/fi";
import { FaGraduationCap } from "react-icons/fa";

const normalizeEmail = (email) => email.trim().toLowerCase();

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdminEmail, setIsAdminEmail] = useState(false);
  const [passwordValid, setPasswordValid] = useState({
    length: false,
    match: false,
  });
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL?.toLowerCase() || "";
    if (normalizeEmail(formData.email) === adminEmail) {
      setIsAdminEmail(true);
      setFormData((prev) => ({ ...prev, role: "admin" }));
    } else {
      setIsAdminEmail(false);
      if (formData.role === "admin") {
        setFormData((prev) => ({ ...prev, role: "student" }));
      }
    }
  }, [formData.email]);

  useEffect(() => {
    setPasswordValid({
      length: formData.password.length >= 8, // Changed to 8 characters
      match: formData.password === formData.confirmPassword && formData.password !== "",
    });
  }, [formData.password, formData.confirmPassword]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!passwordValid.match) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (!passwordValid.length) {
      setError("Password must be at least 8 characters");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: normalizeEmail(formData.email),
          password: formData.password,
          role: formData.role,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle backend validation errors
        if (data.error && data.error.includes("Password")) {
          setError(data.error);
        } else {
          setError(data.error || "Registration failed");
        }
        throw new Error(data.error || "Registration failed");
      }

      router.push("/login?signup=success");
    } catch (error) {
      
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-green-50 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-green-100 rounded-full blur-[160px] opacity-40 pointer-events-none"></div>

      <div className="relative w-full max-w-md bg-white p-8 rounded-3xl shadow-lg border border-gray-100 z-10">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-green-100 mb-4 shadow-md text-green-800 text-4xl">
            <FaGraduationCap />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Create Your Account</h1>
          <p className="mt-2 text-gray-600">Join and start learning with expert guidance</p>
        </div>

        {/* Error message display */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-start">
            <FiAlertCircle className="text-red-500 mt-0.5 mr-2 flex-shrink-0" />
            <span className="text-red-700 text-sm">{error}</span>
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent"
              autoComplete="name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent"
              autoComplete="email"
            />
          </div>

          {!isAdminEmail && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent"
                required
              >
                <option value="student">Student</option>
                <option value="tutor">Tutor</option>
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                required
                minLength="8"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  formData.password
                    ? passwordValid.length
                      ? "border-green-500"
                      : "border-red-500"
                    : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent pr-10`}
                autoComplete="new-password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-green-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            <div className="flex items-center mt-1">
              {formData.password && (
                <>
                  {passwordValid.length ? (
                    <FiCheck className="text-green-500 mr-1" />
                  ) : (
                    <FiX className="text-red-500 mr-1" />
                  )}
                </>
              )}
              <p className={`text-xs ${passwordValid.length ? 'text-green-600' : 'text-gray-500'}`}>
                Minimum 8 characters
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <div className="relative">
              <input
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                required
                minLength="8"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  formData.confirmPassword
                    ? passwordValid.match
                      ? "border-green-500"
                      : "border-red-500"
                    : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent pr-10`}
                autoComplete="new-password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-green-700"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
              </button>
              {formData.confirmPassword && (
                <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
                  {passwordValid.match ? (
                    <FiCheck className="text-green-500" />
                  ) : (
                    <FiX className="text-red-500" />
                  )}
                </div>
              )}
            </div>
            {formData.confirmPassword && (
              <p className={`mt-1 text-xs ${passwordValid.match ? 'text-green-600' : 'text-red-500'}`}>
                {passwordValid.match ? 'Passwords match!' : 'Passwords do not match'}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading || !passwordValid.match || !passwordValid.length}
            className={`w-full py-2 px-4 bg-green-700 text-white rounded-md hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2 transition-colors ${
              isLoading || !passwordValid.match || !passwordValid.length
                ? "opacity-70 cursor-not-allowed"
                : ""
            }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating account...
              </span>
            ) : "Sign Up"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-green-700 hover:text-green-800">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}