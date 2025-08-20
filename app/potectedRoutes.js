'use client'
import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import LoadingSpinner from './components/LoadingSpinner'

const publicRoutes = [
  '/login',
  '/signup',
  '/request-reset-password',
  '/reset-password',
  '/FAQ',
  '/guide',
  '/contact',
  '/',
  '/courses',
]

// Routes that require specific roles
const adminRoutes = ['/Admin'];
const tutorRoutes = ['/tutor-dashboard'];

export default function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Skip auth check for public routes
        if (publicRoutes.includes(pathname)) {
          setIsAuthenticated(true)
          setLoading(false)
          return
        }

        // Verify the token with your backend
        const response = await fetch('/api/auth/verify', {
          method: 'GET',
          credentials: 'include' // Important: sends cookies
        })

        if (!response.ok) {
          router.push('/login')
          return
        }

        const data = await response.json()
        setIsAuthenticated(true)
        setUserRole(data.user.role)
        
        // Check role-based access
        if (adminRoutes.some(route => pathname.startsWith(route)) && data.user.role !== 'admin') {
          router.push('/unauthorized')
          return
        }
        
        if (tutorRoutes.some(route => pathname.startsWith(route)) && 
            !['tutor', 'admin'].includes(data.user.role)) {
          router.push('/unauthorized')
          return
        }
        
      } catch (error) {
        console.error('Auth check error:', error)
        if (!publicRoutes.includes(pathname)) {
          router.push('/login')
        }
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [router, pathname])

  if (loading) {
    return <LoadingSpinner />
  }

  // Allow access if:
  // 1. It's a public route, OR
  // 2. User is authenticated
  return publicRoutes.includes(pathname) || isAuthenticated ? children : null
}