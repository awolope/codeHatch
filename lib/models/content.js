// lib/models/content.js
import mongoose from 'mongoose';

const ContentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['video', 'article', 'quiz', 'assignment', 'download'],
  },
  contentUrl: {
    type: String,
    trim: true,
  },
  cloudinaryPublicId: {
    type: String, // Add this field to track Cloudinary public_id
    trim: true,
  },
  duration: {
    type: Number,
    default: 0, // in minutes
  },
  isFree: {
    type: Boolean,
    default: false,
  },
  order: {
    type: Number,
    required: true,
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  moduleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Module',
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, {
  timestamps: true,
});



// Index for better query performance
ContentSchema.index({ moduleId: 1, order: 1 });
ContentSchema.index({ courseId: 1, isPublished: 1 });

// Update the updatedAt field before saving
ContentSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.models.Content || mongoose.model('Content', ContentSchema);