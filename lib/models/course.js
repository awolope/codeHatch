// models/Course.js
import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a course title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: ['Web Development', 'Design', 'App Development', 'Data Science', 'Marketing']
  },
  level: {
    type: String,
    required: [true, 'Please add a difficulty level'],
    enum: ['Beginner', 'Intermediate', 'Advanced']
  },
  duration: {
    type: Number,
    required: [true, 'Please add duration in hours']
  },
  price: {
    type: Number,
    required: [true, 'Please add a price']
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  // New fields for content management
  hasContent: {
    type: Boolean,
    default: false
  },
  totalModules: {
    type: Number,
    default: 0
  },
  totalContent: {
    type: Number,
    default: 0
  },
  totalDuration: {
    type: Number, // in hours
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

// Update the updatedAt field before saving
CourseSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.models.Course || mongoose.model('Course', CourseSchema);