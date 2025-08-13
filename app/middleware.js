import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function middleware(request) {
  const path = request.nextUrl.pathname;
  const isPublicPath = ['/login', '/signup', '/forgot-password'].includes(path);
  const token = request.cookies.get('auth_token')?.value || '';

  try {
    // Verify token for protected routes
    if (!isPublicPath && !token) {
      return NextResponse.redirect(new URL('/login', request.nextUrl));
    }

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET);
      
      // Redirect authenticated users away from auth pages
      if (isPublicPath) {
        return NextResponse.redirect(new URL('/', request.nextUrl));
      }
    }
  } catch (error) {
  
    if (!isPublicPath) {
      const response = NextResponse.redirect(new URL('/login', request.nextUrl));
      response.cookies.delete('auth_token');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/profile',
    '/login',
    '/signup',
    '/forgot-password',
    '/reset-password',
  ],
};