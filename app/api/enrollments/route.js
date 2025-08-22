import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Enrollment from "@/lib/models/enrollment";
import Course from "@/lib/models/course";
import User from "@/lib/models/user"; // Import the User model

// ✅ Get all enrollments for a user
export async function GET(req) {
  await dbConnect();

  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "userId query parameter is required" },
        { status: 400 }
      );
    }

    const enrollments = await Enrollment.find({ user: userId })
      .populate("course") // include course details
      .populate("user", "name email") // populate user with name and email
      .sort({ createdAt: -1 }); // newest first

    return NextResponse.json({ success: true, data: enrollments }, { status: 200 });
  } catch (err) {
    console.error("GET enrollments error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}

// ✅ Enroll in a course (with payment information)
export async function POST(req) {
  await dbConnect();

  try {
    const body = await req.json();
    const { userId, courseId, bankName, transferDate, paymentReference } = body;

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Check if course exists and get price
    const course = await Course.findById(courseId);
    if (!course) {
      return NextResponse.json(
        { success: false, message: "Course not found" },
        { status: 404 }
      );
    }

    // Prevent duplicate enrollments
    const existing = await Enrollment.findOne({ user: userId, course: courseId });
    if (existing) {
      return NextResponse.json(
        { success: false, message: "Already enrolled or pending enrollment for this course" },
        { status: 400 }
      );
    }

    // Create enrollment with payment details
    const enrollment = await Enrollment.create({
      user: userId,
      course: courseId,
      status: "pending",
      paymentStatus: "pending",
      paymentMethod: "bank_transfer",
      bankName: bankName || "",
      transferDate: transferDate ? new Date(transferDate) : null,
      paymentReference: paymentReference || "",
      amountPaid: course.price,
    });

    // Populate the enrollment with course and user details before returning
    const populatedEnrollment = await Enrollment.findById(enrollment._id)
      .populate("course")
      .populate("user", "name email");

    return NextResponse.json({ success: true, data: populatedEnrollment }, { status: 201 });
  } catch (err) {
    console.error("Enrollment creation error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}

// ✅ Update enrollment (e.g., mark as completed, update payment status)
export async function PATCH(req) {
  await dbConnect();

  try {
    const body = await req.json();
    const { enrollmentId, updates } = body;

    const enrollment = await Enrollment.findByIdAndUpdate(
      enrollmentId, 
      updates, 
      { new: true, runValidators: true }
    )
    .populate("course")
    .populate("user", "name email");

    if (!enrollment) {
      return NextResponse.json(
        { success: false, message: "Enrollment not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: enrollment }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}

// ✅ Remove enrollment (unenroll)
export async function DELETE(req) {
  await dbConnect();

  try {
    const body = await req.json();
    const { userId, courseId } = body;

    const enrollment = await Enrollment.findOneAndDelete({ user: userId, course: courseId });

    if (!enrollment) {
      return NextResponse.json(
        { success: false, message: "Enrollment not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Unenrolled successfully" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}