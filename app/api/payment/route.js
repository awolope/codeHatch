import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Enrollment from "@/lib/models/enrollment";
import Course from "@/lib/models/course";
import User from "@/lib/models/user";
import { sendPaymentConfirmationEmail } from "@/lib/email"; // Import your email function

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

    // Check for existing enrollment
    const existingEnrollment = await Enrollment.findOne({ 
      user: userId, 
      course: courseId 
    });

    if (existingEnrollment) {
      return NextResponse.json(
        { 
          success: false, 
          message: "Already enrolled or pending enrollment for this course" 
        },
        { status: 400 }
      );
    }

    // Create new enrollment with bank transfer details
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

    // Send payment confirmation email
    try {
      await sendPaymentConfirmationEmail(
        user.email,
        user.name,
        course.title,
        course.price,
        bankName,
        paymentReference,
        transferDate
      );
    } catch (emailError) {
      console.error('Failed to send payment confirmation email:', emailError);
      // Don't fail the request if email fails
    }

    return NextResponse.json(
      { 
        success: true, 
        data: enrollment,
        message: "Enrollment created pending payment verification. Confirmation email sent." 
      }, 
      { status: 201 }
    );
  } catch (err) {
    console.error("Payment processing error:", err);
    return NextResponse.json(
      { success: false, error: err.message }, 
      { status: 400 }
    );
  }
}