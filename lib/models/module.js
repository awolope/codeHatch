// models/Module.js
import mongoose from 'mongoose';

const ModuleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a module title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  order: {
    type: Number,
    required: [true, 'Please add module order'],
    min: 0
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: [true, 'Please specify course ID']
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please specify creator']
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  publishedAt: {
    type: Date
  },
  estimatedDuration: {
    type: Number, // in minutes
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Index for better query performance
ModuleSchema.index({ courseId: 1, order: 1 });
ModuleSchema.index({ courseId: 1, isPublished: 1 });

// Update the updatedAt field before saving
ModuleSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.models.Module || mongoose.model('Module', ModuleSchema);