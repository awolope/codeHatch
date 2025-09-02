import { NextResponse } from 'next/server';
import Content from '@/lib/models/content';
import Module from '@/lib/models/module';
import Course from '@/lib/models/course';
import dbConnect from '@/lib/dbConnect';
import { upload } from '@/lib/cloudinary';

// GET specific content
export async function GET(request, { params }) {
  try {
    const { courseId, moduleId, contentId } = params;
    await dbConnect();

    const content = await Content.findOne({ _id: contentId, moduleId, courseId });
    if (!content) {
      return NextResponse.json({ success: false, error: 'Content not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: content }, { status: 200 });

  } catch (error) {
    
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

// PUT update content with optional file upload
export async function PUT(request, { params }) {
  try {
    const { courseId, moduleId, contentId } = params;
    await dbConnect();

    const content = await Content.findOne({ _id: contentId, moduleId, courseId });
    if (!content) {
      return NextResponse.json({ success: false, error: 'Content not found' }, { status: 404 });
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

    let contentUrl = formData.get('contentUrl') || content.contentUrl;

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

    // Calculate duration difference if duration is being updated
    const newDuration = duration ? parseInt(duration) : content.duration;
    const durationDiff = newDuration - content.duration;

    const updateData = {
      title: title || content.title,
      description: description || content.description,
      type: type || content.type,
      contentUrl,
      duration: newDuration,
      isFree: isFree !== null ? isFree : content.isFree,
      order: order ? parseInt(order) : content.order,
      isPublished: isPublished !== null ? isPublished : content.isPublished,
      ...(isPublished && !content.publishedAt ? { publishedAt: new Date() } : {})
    };

    const updatedContent = await Content.findByIdAndUpdate(
      contentId,
      updateData,
      { new: true, runValidators: true }
    );

    // Update module and course durations if duration changed
    if (durationDiff !== 0) {
      await Module.findByIdAndUpdate(moduleId, {
        $inc: { estimatedDuration: durationDiff }
      });

      await Course.findByIdAndUpdate(courseId, {
        $inc: { totalDuration: durationDiff / 60 }
      });
    }

    return NextResponse.json({ success: true, data: updatedContent }, { status: 200 });

  } catch (error) {
    
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE content
export async function DELETE(request, { params }) {
  try {
    const { courseId, moduleId, contentId } = params;
    await dbConnect();

    const content = await Content.findOne({ _id: contentId, moduleId, courseId });
    if (!content) {
      return NextResponse.json({ success: false, error: 'Content not found' }, { status: 404 });
    }

    await Content.findByIdAndDelete(contentId);

    // Update module duration
    await Module.findByIdAndUpdate(moduleId, {
      $inc: { estimatedDuration: -content.duration }
    });

    // Update course stats
    await Course.findByIdAndUpdate(courseId, {
      $inc: { 
        totalContent: -1,
        totalDuration: -content.duration / 60
      }
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Content deleted successfully' 
    }, { status: 200 });

  } catch (error) {
    
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}