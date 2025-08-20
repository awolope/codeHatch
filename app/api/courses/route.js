import { NextResponse } from 'next/server';
import Course from '@/lib/models/course';
import dbConnect from '@/lib/dbConnect';

// Handle GET /api/courses
export async function GET() {
  try {
    await dbConnect();
    const courses = await Course.find({});
    return NextResponse.json({ success: true, data: courses }, { status: 200 });
  } catch (err) {
    console.error('GET /api/courses error:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// Optionally add POST in future if needed
// export async function POST(req) { ... }
