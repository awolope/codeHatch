'use client';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { FiEdit2, FiTrash2, FiPlus, FiX, FiCheck, FiAward } from 'react-icons/fi';
import { FaRocket, FaGraduationCap } from 'react-icons/fa';

// Background animation component
const FloatingElements = () => {
  const elements = [
    {
      icon: <FaGraduationCap className="text-emerald-400/20" />,
      size: 24,
      duration: 15,
      path: [[0, 0], [100, 50], [0, 100]]
    },
    {
      icon: <FaRocket className="text-emerald-500/20" />,
      size: 20,
      duration: 20,
      path: [[100, 0], [0, 50], [100, 100]]
    },
    {
      icon: <FiAward className="text-teal-400/20" />,
      size: 28,
      duration: 25,
      path: [[50, 0], [100, 50], [50, 100]]
    },
  ];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {elements.map((element, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{ fontSize: `${element.size}px` }}
          animate={{
            x: element.path.map(p => `${p[0]}vw`),
            y: element.path.map(p => `${p[1]}vh`),
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: element.duration,
            delay: index * 5,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear"
          }}
        >
          {element.icon}
        </motion.div>
      ))}
    </div>
  );
};

export default function AddCoursePage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Web Development',
    level: 'Beginner',
    duration: '',
    price: '',
    isFeatured: false,
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [courses, setCourses] = useState([]);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch all courses
  const fetchCourses = async () => {
    try {
      const res = await fetch('/api/courses');
      if (!res.ok) throw new Error(`Failed to fetch courses: ${res.status}`);

      const data = await res.json();
      setCourses(data.success && Array.isArray(data.data) ? data.data : []);
    } catch (err) {
      setError('Failed to load courses');
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // ✅ Add or Update Course
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      let url = '/api/addCourse';
      let method = 'POST';
      let body = { ...formData };

      if (editId) {
        method = 'PUT';
        body.id = editId;
      }

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save course');

      resetForm();
      fetchCourses();
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ✅ Delete Course
  const deleteCourse = async (id) => {
    if (!confirm('Are you sure you want to delete this course?')) return;

    try {
      const res = await fetch(`/api/addCourse?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete course');

      fetchCourses();
    } catch (err) {
    
      setError(err.message);
    }
  };

  // ✅ Start editing
  const startEdit = (course) => {
    setEditId(course._id);
    setFormData({
      title: course.title,
      description: course.description,
      category: course.category,
      level: course.level,
      duration: course.duration,
      price: course.price,
      isFeatured: course.isFeatured,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ✅ Reset form
  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: 'Web Development',
      level: 'Beginner',
      duration: '',
      price: '',
      isFeatured: false,
    });
    setEditId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 py-8 px-4 relative overflow-hidden">
      <FloatingElements />
      
      <Head>
        <title>{editId ? 'Edit Course' : 'Add New Course'} | Techlyn Academy</title>
      </Head>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
            <FaGraduationCap className="text-3xl text-emerald-700" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {editId ? 'Edit Course' : 'Add New Course'}
          </h1>
          <p className="text-gray-600">
            {editId ? 'Update your course details' : 'Create a new course for Techlyn Academy'}
          </p>
        </motion.div>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6 max-w-2xl mx-auto"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-lg mb-10 border border-emerald-100"
        >
          {/* Title */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Course Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors"
              required
              placeholder="e.g., Advanced React Development"
            />
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors"
              rows="4"
              required
              placeholder="Describe what students will learn in this course..."
            />
          </div>

          {/* Category + Level */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors"
                required
              >
                <option value="Web Development">Web Development</option>
                <option value="Design">Design</option>
                <option value="App Development">App Development</option>
                <option value="Data Science">Data Science</option>
                <option value="Marketing">Marketing</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
              <select
                name="level"
                value={formData.level}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors"
                required
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>

          {/* Duration + Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration (hours)
              </label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors"
                required
                min="1"
                placeholder="10"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors"
                required
                min="0"
                step="0.01"
                placeholder="49.99"
              />
            </div>
          </div>

          {/* Featured */}
          <div className="mb-6 flex items-center">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleChange}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
              <span className="ml-3 text-sm font-medium text-gray-900">Featured Course</span>
            </label>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            {editId && (
              <motion.button
                type="button"
                onClick={resetForm}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2.5 rounded-lg hover:bg-gray-600 transition-colors"
              >
                <FiX size={16} />
                Cancel
              </motion.button>
            )}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={!isSubmitting ? { scale: 1.05 } : {}}
              whileTap={!isSubmitting ? { scale: 0.95 } : {}}
              className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-2.5 rounded-lg hover:from-emerald-700 hover:to-teal-700 disabled:opacity-70 transition-colors"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  {editId ? 'Updating...' : 'Adding...'}
                </>
              ) : (
                <>
                  {editId ? <FiCheck size={16} /> : <FiPlus size={16} />}
                  {editId ? 'Update Course' : 'Add Course'}
                </>
              )}
            </motion.button>
          </div>
        </motion.form>

        {/* Course List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-6 border border-emerald-100"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">All Courses</h2>
            <div className="text-sm text-gray-500">
              {courses.length} course{courses.length !== 1 ? 's' : ''}
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
            </div>
          ) : courses.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <FaGraduationCap className="mx-auto text-4xl text-gray-300 mb-3" />
              <p>No courses available. Create your first course!</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {courses.map((course) => (
                <motion.div
                  key={course._id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow bg-gradient-to-r from-white to-emerald-50"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-start gap-3">
                        <h3 className="font-semibold text-lg text-gray-900">{course.title}</h3>
                        {course.isFeatured && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                            Featured
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm mt-1 line-clamp-2">{course.description}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                          {course.category}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {course.level}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          {course.duration} hrs
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                          ${course.price}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <motion.button
                        onClick={() => startEdit(course)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 text-emerald-600 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors"
                        title="Edit course"
                      >
                        <FiEdit2 size={16} />
                      </motion.button>
                      <motion.button
                        onClick={() => deleteCourse(course._id)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                        title="Delete course"
                      >
                        <FiTrash2 size={16} />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}