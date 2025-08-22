import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET(request) {
  try {
    const token = request.cookies.get('auth_token')?.value;

    if (!token) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Access denied. No token provided.',
          valid: false
        },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    return NextResponse.json({
      success: true,
      valid: true,
      user: {
        id: decoded.id,
        email: decoded.email,
        role: decoded.role,
        name: decoded.name // Add this if your JWT includes name
      }
    });
  } catch (error) {
    console.error('Token verification error:', error);
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Invalid token',
        valid: false
      },
      { status: 401 }
    );
  }
}