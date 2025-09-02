import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Enrollment from "@/lib/models/enrollment";

export async function GET(req, { params }) {
  await dbConnect();

  try {
    const { courseId } = params;

    // Get all enrollments for a specific course
    const enrollments = await Enrollment.find({ 
      course: courseId,
      status: { $in: ["enrolled", "in-progress", "completed"] } // Only active enrollments
    })
      .populate("user", "name email avatar role")
      .sort({ enrolledAt: -1 });

    // Format the response to include student details
    const students = enrollments.map(enrollment => ({
      _id: enrollment.user._id,
      name: enrollment.user.name,
      email: enrollment.user.email,
      avatar: enrollment.user.avatar,
      enrollmentStatus: enrollment.status,
      progress: enrollment.progress,
      enrolledAt: enrollment.enrolledAt,
      lastAccessed: enrollment.lastAccessed
    }));

    return NextResponse.json({ 
      success: true, 
      data: {
        totalStudents: students.length,
        students: students
      }
    }, { status: 200 });

  } catch (err) {
   
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}