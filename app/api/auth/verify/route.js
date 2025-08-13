import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

export async function GET(request) {
  try {
    const authHeader = request.headers.get('Authorization')
    if (!authHeader) {
      return NextResponse.json(
        { error: 'Authorization header missing' },
        { status: 401 }
      )
    }

    const token = authHeader.split(' ')[1]
    if (!token) {
      return NextResponse.json(
        { error: 'Token missing' },
        { status: 401 }
      )
    }

    // Verify the token - replace 'your-secret-key' with your actual secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
    return NextResponse.json(
      { userId: decoded.userId, email: decoded.email },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid or expired token' },
      { status: 401 }
    )
  }
}