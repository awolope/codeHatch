// models/Content.js
import mongoose from 'mongoose';

const ContentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a content title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  type: {
    type: String,
    required: [true, 'Please specify content type'],
    enum: ['video', 'article', 'quiz', 'assignment', 'resource']
  },
  contentUrl: {
    type: String,
    required: function() {
      return this.type !== 'article';
    }
  },
  duration: {
    type: Number, // in minutes
    default: 0
  },
  isFree: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    required: [true, 'Please add content order'],
    min: 0
  },
  moduleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Module',
    required: [true, 'Please specify module ID']
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
ContentSchema.index({ moduleId: 1, order: 1 });
ContentSchema.index({ courseId: 1, isPublished: 1 });

// Update the updatedAt field before saving
ContentSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.models.Content || mongoose.model('Content', ContentSchema);