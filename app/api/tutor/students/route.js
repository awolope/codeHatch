import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Enrollment from "@/lib/models/enrollment";
import { Types } from "mongoose"; // Import mongoose Types

export async function GET(request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const tutorId = searchParams.get("tutorId");

    if (!tutorId) {
      return NextResponse.json(
        { success: false, error: "tutorId query parameter is required" },
        { status: 400 }
      );
    }

    // Convert the string tutorId to an ObjectId
    // Also check if it's a valid ObjectId first to avoid cast errors
    if (!Types.ObjectId.isValid(tutorId)) {
      return NextResponse.json(
        { success: false, error: "Invalid tutorId format" },
        { status: 400 }
      );
    }
    const tutorObjectId = new Types.ObjectId(tutorId);

    // 1. Get all courses where this tutor is enrolled
    // Use the ObjectId here
    const tutorEnrollments = await Enrollment.find({
      user: tutorObjectId, // <-- Use the ObjectId, not the string
      status: { $in: ["enrolled", "in-progress", "completed"] }
    }).populate("course");

    // ... rest of your code remains the same ...
    const tutorCourseIds = tutorEnrollments.map(enrollment => enrollment.course._id);

    if (tutorCourseIds.length === 0) {
      return NextResponse.json({
        success: true,
        data: [],
        message: "Tutor is not enrolled in any courses"
      }, { status: 200 });
    }

    // 2. Get ALL enrollments for these courses
    // Also ensure we use $ne: tutorObjectId for consistency
    const studentEnrollments = await Enrollment.find({
      course: { $in: tutorCourseIds },
      user: { $ne: tutorObjectId }, // <-- Use the ObjectId here too
      status: { $in: ["enrolled", "in-progress", "completed"] }
    })
      .populate("user", "name email avatar")
      .populate("course", "title level category")
      .sort({ enrolledAt: -1 });

    // Format the response
    const studentsData = studentEnrollments.map(enrollment => ({
      _id: enrollment._id,
      user: enrollment.user,
      course: enrollment.course,
      enrollmentStatus: enrollment.status,
      progress: enrollment.progress || 0,
      enrolledAt: enrollment.enrolledAt,
      lastAccessed: enrollment.lastAccessed
    }));

    return NextResponse.json({
      success: true,
      data: studentsData
    }, { status: 200 });

  } catch (err) {
    console.error(err); // Log the error for debugging
    return NextResponse.json(
      { success: false, error: "Failed to fetch students data" },
      { status: 500 }
    );
  }
}