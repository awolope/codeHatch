import { NextResponse } from 'next/server';
import Content from '@/lib/models/content';
import Module from '@/lib/models/module';
import Course from "@/lib/models/course";
import dbConnect from '@/lib/dbConnect';
import { uploadToCloudinary } from '@/lib/cloudinary';

// GET all content for a module
export async function GET(request, { params }) {
  try {
    const { courseId, moduleId } = params;
    await dbConnect();

    const content = await Content.find({ moduleId, courseId })
      .sort({ order: 1 });

    return NextResponse.json({ 
      success: true, 
      data: content 
    }, { status: 200 });

  } catch (error) {
    console.error('GET Content Error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

// POST create new content with file upload
export async function POST(request, { params }) {
  try {
    const { courseId, moduleId } = params;
    await dbConnect();

    const module = await Module.findOne({ _id: moduleId, courseId });
    if (!module) {
      return NextResponse.json({ success: false, error: 'Module not found' }, { status: 404 });
    }

    // Parse form data
    const formData = await request.formData();
    const title = formData.get('title');
    const description = formData.get('description');
    const type = formData.get('type');
    const duration = formData.get('duration');
    const isFree = formData.get('isFree') === 'true';
    const order = formData.get('order');
    const isPublished = formData.get('isPublished') === 'true';
    const file = formData.get('file');
    const contentUrl = formData.get('contentUrl') || '';

    let finalContentUrl = contentUrl;
    let cloudinaryPublicId = '';

    // Handle file upload if provided
    if (file && file.name !== 'undefined' && file.size > 0) {
      try {
        // Convert file to buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        
        // Upload to Cloudinary
        const uploadResult = await uploadToCloudinary(buffer, file.name);
        
        finalContentUrl = uploadResult.secure_url;
        cloudinaryPublicId = uploadResult.public_id;
        
      } catch (uploadError) {
        console.error('Cloudinary Upload Error:', uploadError);
        return NextResponse.json({ 
          success: false, 
          error: 'Failed to upload file' 
        }, { status: 500 });
      }
    }

    // Validate required fields
    if (!title || !type) {
      return NextResponse.json({ 
        success: false, 
        error: 'Title and type are required' 
      }, { status: 400 });
    }

    // For non-article content, require either contentUrl or file
    if (type !== 'article' && !finalContentUrl) {
      return NextResponse.json({ 
        success: false, 
        error: 'Content URL or file is required for this content type' 
      }, { status: 400 });
    }

    // Get the next order number if not provided
    const contentOrder = order ? parseInt(order) : (await Content.countDocuments({ moduleId })) + 1;

    const content = new Content({
      title,
      description,
      type,
      contentUrl: finalContentUrl,
      cloudinaryPublicId,
      duration: duration ? parseInt(duration) : 0,
      isFree,
      order: contentOrder,
      moduleId,
      courseId,
      isPublished,
    });

    await content.save();

    // Update module duration
    await Module.findByIdAndUpdate(moduleId, {
      $inc: { estimatedDuration: content.duration }
    });

    // Update course stats
    await Course.findByIdAndUpdate(courseId, {
      $inc: { 
        totalContent: 1,
        totalDuration: content.duration / 60 // Convert minutes to hours
      }
    });

    return NextResponse.json({ success: true, data: content }, { status: 201 });

  } catch (error) {
    console.error('POST Content Error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}