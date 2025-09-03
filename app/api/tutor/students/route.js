import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Enrollment from "@/lib/models/enrollment";
import { Types } from "mongoose"; // Import necessary for ObjectId

export async function GET(request) {
  try {
    // 1. Connect to the database
    await dbConnect();
    console.log("Database connected.");

    // 2. Get and validate the tutorId
    const { searchParams } = new URL(request.url);
    const tutorId = searchParams.get("tutorId");

    if (!tutorId) {
      return NextResponse.json(
        { success: false, error: "tutorId query parameter is required" },
        { status: 400 }
      );
    }

    // CRITICAL: Check if the provided ID is a valid MongoDB ObjectId
    if (!Types.ObjectId.isValid(tutorId)) {
      return NextResponse.json(
        { success: false, error: "Invalid tutorId format" },
        { status: 400 }
      );
    }

    // 3. Convert the string to an ObjectId for the query
    const tutorObjectId = new Types.ObjectId(tutorId);

    // 4. Find all courses the tutor is enrolled in
    const tutorEnrollments = await Enrollment.find({
      user: tutorObjectId, // Use the ObjectId here, not the string
      status: { $in: ["enrolled", "in-progress", "completed"] }
    }).populate("course");

    const tutorCourseIds = tutorEnrollments.map(enrollment => enrollment.course._id);

    if (tutorCourseIds.length === 0) {
      return NextResponse.json({
        success: true,
        data: [],
        message: "Tutor is not enrolled in any courses"
      }, { status: 200 });
    }

    // 5. Find all student enrollments for those courses
    const studentEnrollments = await Enrollment.find({
      course: { $in: tutorCourseIds },
      user: { $ne: tutorObjectId }, // Use the ObjectId here as well
      status: { $in: ["enrolled", "in-progress", "completed"] }
    })
      .populate("user", "name email avatar")
      .populate("course", "title level category")
      .sort({ enrolledAt: -1 });

    // 6. Format the response
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
    // 7. Detailed error logging for production debugging
    console.error("Error in /api/students:", err);
    return NextResponse.json(
      { success: false, error: "Internal Server Error: Failed to fetch students data" },
      { status: 500 }
    );
  }
}