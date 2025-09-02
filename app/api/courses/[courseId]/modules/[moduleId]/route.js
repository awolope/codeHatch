import { NextResponse } from 'next/server';
import Module from '@/lib/models/module';
import Content from '@/lib/models/content';
import Course from '@/lib/models/course';
import dbConnect from '@/lib/dbConnect';

// GET a specific module
export async function GET(request, { params }) {
  try {
    const { courseId, moduleId } = params;
    await dbConnect();

    const module = await Module.findOne({ _id: moduleId, courseId })
      .populate('contents');

    if (!module) {
      return NextResponse.json({ success: false, error: 'Module not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: module }, { status: 200 });

  } catch (error) {
  
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

// PUT update a module
export async function PUT(request, { params }) {
  try {
    const { courseId, moduleId } = params;
    await dbConnect();

    const module = await Module.findOne({ _id: moduleId, courseId });
    if (!module) {
      return NextResponse.json({ success: false, error: 'Module not found' }, { status: 404 });
    }

    const body = await request.json();
    const updatedModule = await Module.findByIdAndUpdate(
      moduleId,
      { ...body, ...(body.isPublished && !module.publishedAt ? { publishedAt: new Date() } : {}) },
      { new: true, runValidators: true }
    );

    return NextResponse.json({ success: true, data: updatedModule }, { status: 200 });

  } catch (error) {
    
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE a module
export async function DELETE(request, { params }) {
  try {
    const { courseId, moduleId } = params;
    await dbConnect();

    const module = await Module.findOne({ _id: moduleId, courseId });
    if (!module) {
      return NextResponse.json({ success: false, error: 'Module not found' }, { status: 404 });
    }

    // Delete associated content first
    await Content.deleteMany({ moduleId });
    
    await Module.findByIdAndDelete(moduleId);

    // Update course stats
    await Course.findByIdAndUpdate(courseId, {
      $inc: { totalModules: -1 }
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Module and associated content deleted successfully' 
    }, { status: 200 });

  } catch (error) {
    
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}