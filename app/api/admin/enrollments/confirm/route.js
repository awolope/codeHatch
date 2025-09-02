import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Enrollment from "@/lib/models/enrollment";
import Course from "@/lib/models/course";
import User from "@/lib/models/user";
import { sendPaymentApprovalEmail, sendPaymentRejectionEmail } from "@/lib/email";

export async function POST(req) {
  await dbConnect();

  try {
    const body = await req.json();
    const { enrollmentId, action } = body; // action: "approve" or "reject"

    if (!enrollmentId || !action) {
      return NextResponse.json(
        { success: false, error: "Enrollment ID and action are required" },
        { status: 400 }
      );
    }

    const enrollment = await Enrollment.findById(enrollmentId)
      .populate("course")
      .populate("user", "name email");

    if (!enrollment) {
      return NextResponse.json(
        { success: false, error: "Enrollment not found" },
        { status: 404 }
      );
    }

    let updates = {};
    
    if (action === "approve") {
      updates = {
        status: "enrolled",
        paymentStatus: "paid",
        enrollmentDate: new Date()
      };
    } else if (action === "reject") {
      updates = {
        status: "cancelled",
        paymentStatus: "failed"
      };
    } else {
      return NextResponse.json(
        { success: false, error: "Invalid action. Use 'approve' or 'reject'" },
        { status: 400 }
      );
    }

    const updatedEnrollment = await Enrollment.findByIdAndUpdate(
      enrollmentId, 
      updates, 
      { new: true, runValidators: true }
    )
    .populate("course")
    .populate("user", "name email");

    // Send email notification based on action
    try {
      if (action === "approve") {
        await sendPaymentApprovalEmail(
          enrollment.user.email,
          enrollment.user.name,
          enrollment.course.title
        );
      } else if (action === "reject") {
        await sendPaymentRejectionEmail(
          enrollment.user.email,
          enrollment.user.name,
          enrollment.course.title
        );
      }
    } catch (emailError) {
      
      // Don't fail the main request if email fails, just log it
    }

    return NextResponse.json({ 
      success: true, 
      data: updatedEnrollment,
      message: `Payment ${action === "approve" ? "approved" : "rejected"} successfully. ${action === "approve" ? "User notified with course access." : "User notified to contact support."}` 
    }, { status: 200 });

  } catch (err) {
    
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}