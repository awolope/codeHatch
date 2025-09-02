import { NextResponse } from 'next/server';
import Module from '@/models/module';
import Content from '@/models/content';
import Course from "@/lib/models/course";
import dbConnect from '@/lib/dbConnect';

// GET all modules for a course
export async function GET(request, { params }) {
  try {
    const { courseId } = params;
    await dbConnect();

    const modules = await Module.find({ courseId })
      .sort({ order: 1 })
      .populate('contents');

    return NextResponse.json({ 
      success: true, 
      data: modules 
    }, { status: 200 });

  } catch (error) {
   
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

// POST create a new module
export async function POST(request, { params }) {
  try {
    const { courseId } = params;
    await dbConnect();

    const course = await Course.findById(courseId);
    if (!course) {
      return NextResponse.json({ success: false, error: 'Course not found' }, { status: 404 });
    }

    const body = await request.json();
    const { title, description, order } = body;

    // Get the next order number if not provided
    const moduleOrder = order || (await Module.countDocuments({ courseId })) + 1;

    const module = new Module({
      title,
      description,
      order: moduleOrder,
      courseId,
      // createdBy will be set by middleware
    });

    await module.save();

    // Update course stats
    await Course.findByIdAndUpdate(courseId, {
      $inc: { totalModules: 1 },
      hasContent: true
    });

    return NextResponse.json({ success: true, data: module }, { status: 201 });

  } catch (error) {
 
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}