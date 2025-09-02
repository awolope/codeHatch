import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Enrollment from "@/lib/models/enrollment";
import Course from "@/lib/models/course";

export async function GET(req) {
  await dbConnect();

  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "User ID is required" },
        { status: 400 }
      );
    }

    // Get only enrolled courses (status: enrolled, in-progress, completed)
    const enrollments = await Enrollment.find({ 
      user: userId,
      status: { $in: ["enrolled", "in-progress", "completed"] }
    })
      .populate("course", "title description category level duration price image progress") // course details
      .sort({ updatedAt: -1 }); // newest first

    return NextResponse.json({ success: true, data: enrollments }, { status: 200 });
  } catch (err) {
   
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}