import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Enrollment from "@/lib/models/enrollment";

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

    // 1. Get all courses where this tutor is enrolled
    const tutorEnrollments = await Enrollment.find({
      user: tutorId,
      status: { $in: ["enrolled", "in-progress", "completed"] }
    }).populate("course");

    // ✅ Filter out null/invalid courses before mapping
    const tutorCourseIds = tutorEnrollments
      .filter(enrollment => enrollment.course) // remove any broken populate
      .map(enrollment => enrollment.course._id);

    if (tutorCourseIds.length === 0) {
      return NextResponse.json(
        {
          success: true,
          data: [],
          message: "Tutor is not enrolled in any courses"
        },
        { status: 200 }
      );
    }

    // 2. Get ALL enrollments for these courses (excluding the tutor's own)
    const studentEnrollments = await Enrollment.find({
      course: { $in: tutorCourseIds },
      user: { $ne: tutorId }, // exclude tutor
      status: { $in: ["enrolled", "in-progress", "completed"] }
    })
      .populate("user", "name email avatar")
      .populate("course", "title level category")
      .sort({ enrolledAt: -1 });

    // 3. Format the response
    const studentsData = studentEnrollments.map(enrollment => ({
      _id: enrollment._id,
      user: enrollment.user,
      course: enrollment.course,
      enrollmentStatus: enrollment.status,
      progress: enrollment.progress || 0,
      enrolledAt: enrollment.enrolledAt,
      lastAccessed: enrollment.lastAccessed
    }));

    return NextResponse.json(
      { success: true, data: studentsData },
      { status: 200 }
    );
  } catch (err) {

    return NextResponse.json(
      { success: false, error: "Failed to fetch students data", details: err.message },
      { status: 500 }
    );
  }
}
