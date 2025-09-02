import { NextResponse } from "next/server";
import Course from "@/lib/models/course";
import dbConnect from "@/lib/dbConnect";
import slugify from "slugify";

const allowedOrigins = [
  process.env.NEXTAUTH_URL || "http://localhost:3000", // your frontend domain
];

// ✅ Utility to add CORS headers
function withCORS(response, req) {
  const origin = req.headers.get("origin");
  if (origin && allowedOrigins.includes(origin)) {
    response.headers.set("Access-Control-Allow-Origin", origin);
  }
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  response.headers.set("Access-Control-Allow-Credentials", "true");
  return response;
}

// ✅ Handle preflight requests
export async function OPTIONS(req) {
  return withCORS(new NextResponse(null, { status: 204 }), req);
}

// CREATE course
export async function POST(req) {
  await dbConnect();

  try {
    const body = await req.json();
    const slug = slugify(body.title || body.name, { lower: true, strict: true });

    const course = await Course.create({ ...body, slug });

    return withCORS(
      NextResponse.json({ success: true, data: course }, { status: 201 }),
      req
    );
  } catch (err) {
    
    return withCORS(
      NextResponse.json(
        {
          success: false,
          error: err.message,
          stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
        },
        { status: 400 }
      ),
      req
    );
  }
}

// UPDATE course
export async function PUT(req) {
  await dbConnect();

  try {
    const body = await req.json();
    const { id, ...updates } = body;

    if (!id) {
      return withCORS(
        NextResponse.json(
          { success: false, error: "Course ID is required" },
          { status: 400 }
        ),
        req
      );
    }

    if (updates.title || updates.name) {
      updates.slug = slugify(updates.title || updates.name, {
        lower: true,
        strict: true,
      });
    }

    const updatedCourse = await Course.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedCourse) {
      return withCORS(
        NextResponse.json(
          { success: false, error: "Course not found" },
          { status: 404 }
        ),
        req
      );
    }

    return withCORS(
      NextResponse.json({ success: true, data: updatedCourse }),
      req
    );
  } catch (err) {
  
    return withCORS(
      NextResponse.json(
        {
          success: false,
          error: err.message,
          stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
        },
        { status: 400 }
      ),
      req
    );
  }
}

// DELETE course
export async function DELETE(req) {
  await dbConnect();

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return withCORS(
        NextResponse.json(
          { success: false, error: "Course ID is required" },
          { status: 400 }
        ),
        req
      );
    }

    const deletedCourse = await Course.findByIdAndDelete(id);

    if (!deletedCourse) {
      return withCORS(
        NextResponse.json(
          { success: false, error: "Course not found" },
          { status: 404 }
        ),
        req
      );
    }

    return withCORS(
      NextResponse.json({
        success: true,
        message: "Course deleted successfully",
      }),
      req
    );
  } catch (err) {

    return withCORS(
      NextResponse.json(
        {
          success: false,
          error: err.message,
          stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
        },
        { status: 400 }
      ),
      req
    );
  }
}
