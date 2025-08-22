import mongoose from "mongoose";

const EnrollmentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "enrolled", "in-progress", "completed", "cancelled"],
      default: "pending", // Changed from "enrolled" to "pending"
    },
    progress: {
      type: Number,
      default: 0, // progress percentage
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      default: "bank_transfer",
    },
    paymentReference: {
      type: String,
    },
    bankName: {
      type: String,
    },
    transferDate: {
      type: Date,
    },
    amountPaid: {
      type: Number,
      required: true,
    },
    enrollmentDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Add index for better query performance
EnrollmentSchema.index({ user: 1, course: 1 }, { unique: true });
EnrollmentSchema.index({ paymentStatus: 1 });
EnrollmentSchema.index({ status: 1 });

export default mongoose.models.Enrollment ||
  mongoose.model("Enrollment", EnrollmentSchema);