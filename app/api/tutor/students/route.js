import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Enrollment from "@/lib/models/enrollment";
import { Types } from "mongoose";

export async function GET(request) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const tutorId = searchParams.get("tutorId");

    if (!tutorId) {
      return NextResponse.json(
        { success: false, error: "tutorId is required" },
        { status: 400 }
      );
    }

    // Convert to ObjectId - FIXES THE MAIN ISSUE
    const tutorObjectId = new Types.ObjectId(tutorId);

    // Get tutor's courses
    const tutorEnrollments = await Enrollment.find({ 
      user: tutorObjectId,
      status: { $in: ["enrolled", "in-progress", "completed"] }
    }).populate("course");

    const tutorCourseIds = tutorEnrollments.map(enrollment => enrollment.course._id);

    if (tutorCourseIds.length === 0) {
      return NextResponse.json({
        success: true,
        data: [],
        message: "Tutor not enrolled in any courses"
      });
    }

    // Get other students in those courses
    const studentEnrollments = await Enrollment.find({
      course: { $in: tutorCourseIds },
      user: { $ne: tutorObjectId },
      status: { $in: ["enrolled", "in-progress", "completed"] }
    })
      .populate("user", "name email")
      .populate("course", "title")
      .sort({ enrolledAt: -1 });

    const studentsData = studentEnrollments.map(enrollment => ({
      user: enrollment.user,
      course: enrollment.course,
      progress: enrollment.progress || 0,
      enrolledAt: enrollment.enrolledAt
    }));

    return NextResponse.json({
      success: true,
      data: studentsData
    });

  } catch (err) {
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}