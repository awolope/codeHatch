import { NextResponse } from 'next/server';
import Content from '@/models/content';
import Module from '@/models/module';
import Course from '@/models/course';
import dbConnect from '@/lib/dbConnect';
import { upload } from '@/lib/cloudinary';

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

    let contentUrl = formData.get('contentUrl') || '';

    // Handle file upload if provided
    if (file && file.name !== 'undefined') {
      try {
        // Upload file to Cloudinary
        const uploadResult = await new Promise((resolve, reject) => {
          const uploadStream = upload.single('file');
          
          // Create a mock request object for multer
          const mockReq = {
            file: file
          };
          
          uploadStream(mockReq, {}, (error) => {
            if (error) reject(error);
            else resolve(mockReq.file);
          });
        });

        contentUrl = uploadResult.path;
      } catch (uploadError) {
      
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
    if (type !== 'article' && !contentUrl) {
      return NextResponse.json({ 
        success: false, 
        error: 'Content URL or file is required for this content type' 
      }, { status: 400 });
    }

    // Get the next order number if not provided
    const contentOrder = order || (await Content.countDocuments({ moduleId })) + 1;

    const content = new Content({
      title,
      description,
      type,
      contentUrl,
      duration: duration ? parseInt(duration) : 0,
      isFree,
      order: contentOrder,
      moduleId,
      courseId,
      isPublished,
      // createdBy will be set by middleware
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
    
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}