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
  'contact',
  '/'
]

export default function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
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

        // Check if we have a token in storage
        const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken')
        
        if (!token) {
          router.push('/login')
          return
        }

        // Verify the token with your backend
        const response = await fetch('/api/auth/verify', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        if (!response.ok) {
          router.push('/login')
          return
        }

        setIsAuthenticated(true)
      } catch (error) {
    
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