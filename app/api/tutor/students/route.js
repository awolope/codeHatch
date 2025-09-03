import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Enrollment from "@/lib/models/enrollment";
import mongoose from "mongoose";

export async function GET(request) {
  try {
    await dbConnect(); // ✅ moved inside try/catch

    const { searchParams } = new URL(request.url);
    const tutorId = searchParams.get("tutorId");
    const debug = searchParams.get("debug") === "true";

    if (!tutorId) {
      return NextResponse.json(
        { success: false, error: "tutorId query parameter is required" },
        { status: 400 }
      );
    }

    // ✅ Validate ObjectId early (prevents CastError 500s)
    if (!mongoose.Types.ObjectId.isValid(tutorId)) {
      return NextResponse.json(
        { success: false, error: "Invalid tutorId" },
        { status: 400 }
      );
    }

    const STATUSES = ["enrolled", "in-progress", "completed"];

    // 1) Get all courses where this tutor is enrolled (your original logic)
    const tutorEnrollments = await Enrollment.find({
      user: tutorId,
      // If your schema uses enrollmentStatus instead of status, this still won’t throw;
      // it would just return [], which is fine. See query fallback below if needed.
      status: { $in: STATUSES },
    })
      .populate("course", "_id title") // keep it light
      .lean(); // ✅ plain objects = safer JSON serialization

    // ✅ Guard against null course + dedupe IDs
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
          ...(debug ? { tutorEnrollments } : {}),
        },
        { status: 200 }
      );
    }

    // 2) Get all enrollments in those courses (exclude tutor’s own)
    const studentEnrollments = await Enrollment.find({
      course: { $in: tutorCourseIds },
      user: { $ne: tutorId },
      status: { $in: STATUSES },
    })
      .populate("user", "name email avatar")
      .populate("course", "title level category")
      .sort({ enrolledAt: -1 })
      .lean();

    // 3) Shape response (with safe fallbacks if your schema uses different field names)
    const studentsData = studentEnrollments.map((e) => ({
      _id: e._id,
      user: e.user || null,
      course: e.course || null,
      enrollmentStatus: e.status ?? e.enrollmentStatus ?? "enrolled",
      progress: e.progress ?? 0,
      enrolledAt: e.enrolledAt ?? e.createdAt ?? null,
      lastAccessed: e.lastAccessed ?? null,
    }));

    return NextResponse.json(
      {
        success: true,
        data: studentsData,
        ...(debug ? { tutorCourseIds } : {}),
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch students data",
        // show details only in dev to help you pinpoint
        details:
          process.env.NODE_ENV === "development" ? String(err?.message || err) : undefined,
      },
      { status: 500 }
    );
  }
}
