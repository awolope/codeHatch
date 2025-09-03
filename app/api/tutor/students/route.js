import { NextResponse } from "next/server";
import mongoose from "mongoose";
import dbConnect from "@/lib/dbConnect";
import Enrollment from "@/lib/models/enrollment";
import Course from "@/lib/models/course"; // ✅ import Course so mongoose knows it

export async function GET(request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const tutorId = searchParams.get("tutorId");

    if (!tutorId) {
      return NextResponse.json(
        { success: false, error: "tutorId query parameter is required" },
        { status: 400 }
      );
    }

    // ✅ Validate ObjectId (avoids CastError)
    if (!mongoose.Types.ObjectId.isValid(tutorId)) {
      return NextResponse.json(
        { success: false, error: "Invalid tutorId" },
        { status: 400 }
      );
    }

    const STATUSES = ["enrolled", "in-progress", "completed"];

    // 1) Find all courses where this tutor is enrolled
    const tutorEnrollments = await Enrollment.find({
      user: tutorId,
      status: { $in: STATUSES },
    })
      .populate("course", "_id title") // populate course IDs & titles
      .lean();

    const tutorCourseIds = [
      ...new Set(
        tutorEnrollments
          .map((e) => e?.course?._id?.toString())
          .filter(Boolean)
      ),
    ];

    if (tutorCourseIds.length === 0) {
      return NextResponse.json(
        {
          success: true,
          data: [],
          message: "Tutor is not enrolled in any courses",
        },
        { status: 200 }
      );
    }

    // 2) Find all students enrolled in those courses (excluding tutor)
    const studentEnrollments = await Enrollment.find({
      course: { $in: tutorCourseIds },
      user: { $ne: tutorId },
      status: { $in: STATUSES },
    })
      .populate("user", "name email avatar")
      .populate("course", "title level category slug")
      .sort({ enrolledAt: -1 })
      .lean();

    // 3) Shape response
    const studentsData = studentEnrollments.map((e) => ({
      _id: e._id,
      user: e.user || null,
      course: e.course || null,
      enrollmentStatus: e.status,
      progress: e.progress ?? 0,
      enrolledAt: e.enrolledAt ?? e.createdAt ?? null,
      lastAccessed: e.lastAccessed ?? null,
    }));

    return NextResponse.json(
      {
        success: true,
        data: studentsData,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("❌ /api/tutor/students error:", err);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch students data",
        details:
          process.env.NODE_ENV === "development"
            ? String(err?.message || err)
            : undefined,
      },
      { status: 500 }
    );
  }
}
