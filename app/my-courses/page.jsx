'use client';
import { useState, useEffect } from 'react';
import { FiBook, FiPlay, FiClock, FiDollarSign, FiUser, FiAlertCircle, FiX } from 'react-icons/fi';
import { FaCode, FaPalette, FaMobile, FaChartBar, FaBullhorn } from 'react-icons/fa';

// Content Not Available Modal Component
const ContentNotAvailableModal = ({ isOpen, onClose, courseTitle }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Content Coming Soon</h3>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>
        
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiAlertCircle className="text-yellow-600 text-2xl" />
          </div>
          <p className="text-gray-600 mb-2">
            Course content for <strong>{courseTitle}</strong> is not available yet.
          </p>
          <p className="text-sm text-gray-500">
            Our team is working hard to prepare amazing content for this course.
          </p>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <h4 className="font-medium text-blue-900 mb-2">What to expect:</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Comprehensive video lessons</li>
            <li>• Interactive exercises and projects</li>
            <li>• Downloadable resources</li>
            <li>• Community support</li>
          </ul>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
        >
          Got it!
        </button>
      </div>
    </div>
  );
};

const CourseCard = ({ enrollment, onStartCourse }) => {
  const { course, status, progress } = enrollment;

  const getCategoryIcon = (category) => {
    const icons = {
      'Web Development': <FaCode size={16} />,
      'Design': <FaPalette size={16} />,
      'App Development': <FaMobile size={16} />,
      'Data Science': <FaChartBar size={16} />,
      'Marketing': <FaBullhorn size={16} />
    };
    return icons[category] || <FiBook size={16} />;
  };

  const getStatusBadge = (status) => {
    const styles = {
      'enrolled': 'bg-blue-100 text-blue-800',
      'in-progress': 'bg-yellow-100 text-yellow-800',
      'completed': 'bg-green-100 text-green-800'
    };
    return `px-2 py-1 rounded text-xs font-medium ${styles[status] || 'bg-gray-100 text-gray-800'}`;
  };

  const getProgressText = (status, progress) => {
    if (status === 'completed') return 'Course Completed 🎉';
    if (status === 'in-progress') return `Progress: ${progress}% Complete`;
    return 'Ready to Start';
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-sm transition-all duration-150">
      <div className="flex flex-col md:flex-row md:items-start gap-6">
        {/* Course Image/Icon */}
        <div className="flex-shrink-0">
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center text-white">
            {getCategoryIcon(course.category)}
          </div>
        </div>

        {/* Course Content */}
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {course.title}
              </h3>
              
              <p className="text-gray-600 mb-3 line-clamp-2 text-sm">
                {course.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                  {course.category}
                </span>
                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                  {course.level}
                </span>
                <span className={getStatusBadge(status)}>
                  {status.replace('-', ' ')}
                </span>
              </div>

              {/* Progress Bar */}
              {(status === 'in-progress' || status === 'completed') && (
                <div className="mb-4">
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div 
                      className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-600">
                    {getProgressText(status, progress)}
                  </p>
                </div>
              )}
            </div>

            {/* Action Button */}
            <div className="flex-shrink-0">
              {status === 'enrolled' && (
                <button
                  onClick={() => onStartCourse(course._id, course.title)}
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                >
                  <FiPlay size={16} />
                  Start Course
                </button>
              )}
              
              {status === 'in-progress' && (
                <button
                  onClick={() => onStartCourse(course._id, course.title)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <FiPlay size={16} />
                  Continue
                </button>
              )}
              
              {status === 'completed' && (
                <button
                  onClick={() => onStartCourse(course._id, course.title)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  <FiBook size={16} />
                  Review Course
                </button>
              )}
            </div>
          </div>

          {/* Course Meta */}
          <div className="flex items-center gap-4 text-sm text-gray-500 pt-4 border-t border-gray-100">
            <div className="flex items-center">
              <FiClock className="mr-1" size={14} />
              <span>{course.duration}h</span>
            </div>
            <div className="flex items-center">
              <FiDollarSign className="mr-1" size={14} />
              <span>${course.price}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function MyCoursesPage() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentCourse, setCurrentCourse] = useState({ id: '', title: '' });

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth/verify');
      const data = await res.json();
      
      if (data.success && data.valid) {
        setUser(data.user);
        fetchEnrolledCourses(data.user.id);
      } else {
        setError('Please login to view your courses');
      }
    } catch (err) {
      setError('Authentication failed');
    }
  };

  const fetchEnrolledCourses = async (userId) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/enrolled-courses?userId=${userId}`);
      const data = await res.json();
      
      if (data.success) {
        setEnrollments(data.data);
      } else {
        setError(data.error || 'Failed to fetch your courses');
      }
    } catch (err) {
      setError('Failed to fetch your courses');
    } finally {
      setLoading(false);
    }
  };

  const handleStartCourse = (courseId, courseTitle) => {
    setCurrentCourse({ id: courseId, title: courseTitle });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentCourse({ id: '', title: '' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading your courses...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <FiAlertCircle className="mx-auto text-2xl text-red-600 mb-2" />
            <h2 className="text-lg font-semibold text-red-800 mb-2">Error</h2>
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl text-center md:text-3xl font-bold text-gray-900 mb-2">
            My Courses
          </h1>
          <p className="text-gray-600 text-center">
            {enrollments.length} enrolled course{enrollments.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Courses Grid */}
        <div className="space-y-6">
          {enrollments.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
              <FiBook className="mx-auto text-3xl text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No courses yet</h3>
              <p className="text-gray-600 mb-4">You haven't enrolled in any courses yet.</p>
              <a
                href="/courses"
                className="inline-flex items-center px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
              >
                Browse Courses
              </a>
            </div>
          ) : (
            enrollments.map((enrollment) => (
              <CourseCard
                key={enrollment._id}
                enrollment={enrollment}
                onStartCourse={handleStartCourse}
              />
            ))
          )}
        </div>

        {/* Content Not Available Modal */}
        <ContentNotAvailableModal
          isOpen={modalOpen}
          onClose={closeModal}
          courseTitle={currentCourse.title}
        />
      </div>
    </div>
  );
}