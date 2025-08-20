import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(request) {
  const token = request.cookies.get('auth_token')?.value;
  const { pathname } = request.nextUrl;

  // Public routes that don't require authentication
  const publicRoutes = ['/login', '/signup', '/request-reset-password', '/reset-password', '/', '/FAQ', '/guide', '/contact'];
  const isPublicRoute = publicRoutes.some(route => pathname === route || pathname.startsWith(route + '/'));
  
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Protected routes
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Admin routes
    const adminRoutes = ['/Admin'];
    const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route));
    
    if (isAdminRoute && decoded.role !== 'admin') {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }

    // Tutor routes
    const tutorRoutes = ['/tutor-dashboard'];
    const isTutorRoute = tutorRoutes.some(route => pathname.startsWith(route));
    
    if (isTutorRoute && !['tutor', 'admin'].includes(decoded.role)) {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }

    return NextResponse.next();
  } catch (error) {
    // Invalid token
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.set('auth_token', '', { maxAge: 0 }); // Clear invalid token
    return response;
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};