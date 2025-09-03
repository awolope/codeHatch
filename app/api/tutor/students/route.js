import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Enrollment from "@/lib/models/enrollment";
import Course from "@/lib/models/course"; // ✅ needed to check tutor

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

    // 1. Find courses taught by this tutor
    const tutorCourses = await Course.find({ tutor: tutorId }).select("_id");
    const tutorCourseIds = tutorCourses.map(c => c._id);

    if (tutorCourseIds.length === 0) {
      return NextResponse.json(
        { success: true, data: [], message: "Tutor has no courses" },
        { status: 200 }
      );
    }

    // 2. Get all students enrolled in those courses
    const studentEnrollments = await Enrollment.find({
      course: { $in: tutorCourseIds },
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

    return NextResponse.json({ success: true, data: studentsData }, { status: 200 });
  } catch (err) {
    
    return NextResponse.json(
      { success: false, error: "Failed to fetch students data" },
      { status: 500 }
    );
  }
}
