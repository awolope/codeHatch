import { NextResponse } from 'next/server';
import Course from '@/lib/models/course';
import dbConnect from '@/lib/dbConnect';

// Handle GET /api/courses/[courseId] - Get single course
export async function GET(request, { params }) {
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

// Handle PUT /api/courses/[courseId] - Update course
export async function PUT(request, { params }) {
  try {
    const { courseId } = params;
    const body = await request.json();
    
    await dbConnect();
    
    const updatedCourse = await Course.findByIdAndUpdate(courseId, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedCourse) {
      return NextResponse.json(
        { success: false, error: "Course not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updatedCourse });
    
  } catch (err) {
   
    return NextResponse.json(
      {
        success: false,
        error: err.message,
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
      },
      { status: 400 }
    );
  }
}

// Handle DELETE /api/courses/[courseId] - Delete course
export async function DELETE(request, { params }) {
  try {
    const { courseId } = params;
    
    await dbConnect();
    
    const deletedCourse = await Course.findByIdAndDelete(courseId);

    if (!deletedCourse) {
      return NextResponse.json(
        { success: false, error: "Course not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Course deleted successfully",
    });
    
  } catch (err) {
    
    return NextResponse.json(
      {
        success: false,
        error: err.message,
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
      },
      { status: 400 }
    );
  }
}