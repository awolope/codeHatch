import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  method: {
    type: String,
    enum: ['bank_transfer', 'other'],
    default: 'bank_transfer'
  },
  status: {
    type: String,
    enum: ['pending', 'verified', 'rejected', 'cancelled'],
    default: 'pending'
  },
  proofImage: {
    type: String,
    required: true
  },
  adminNotes: {
    type: String
  },
  verifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  verifiedAt: {
    type: Date
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Update enrollment status when payment is verified
paymentSchema.post('findOneAndUpdate', async function(doc) {
  if (doc.status === 'verified') {
    const Enrollment = mongoose.model('Enrollment');
    await Enrollment.findOneAndUpdate(
      { user: doc.user, course: doc.course },
      { 
        isActive: true,
        activatedAt: new Date()
      },
      { upsert: true, new: true }
    );
  }
});

export default mongoose.models.Payment || mongoose.model('Payment', paymentSchema);