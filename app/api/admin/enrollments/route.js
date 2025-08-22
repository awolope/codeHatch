import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Enrollment from "@/lib/models/enrollment";
import Course from "@/lib/models/course";
import User from "@/lib/models/user";

export async function GET(req) {
  await dbConnect();

  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status"); // optional filter
    
    let query = {};
    if (status) {
      query.paymentStatus = status;
    }

    const enrollments = await Enrollment.find(query)
      .populate("course", "title price category") // course details
      .populate("user", "name email") // user details
      .sort({ createdAt: -1 }); // newest first

    return NextResponse.json({ success: true, data: enrollments }, { status: 200 });
  } catch (err) {
    console.error("Admin GET enrollments error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}