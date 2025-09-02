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
 
    return NextResponse.json(
      { success: false, error: err.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// Handle GET /api/courses/[courseId]
export async function GET_COURSE_BY_ID(request, { params }) {
  try {
    const { courseId } = params;
    
    await dbConnect();
    
    // Find the course by ID
    const course = await Course.findById(courseId);
    
    if (!course) {
      return NextResponse.json(
        { success: false, error: 'Course not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: course
    }, { status: 200 });
    
  } catch (err) {
    
    
    if (err.name === 'CastError') {
      return NextResponse.json(
        { success: false, error: 'Invalid course ID format' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: err.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// Optionally add POST in future if needed
// export async function POST(req) { ... }