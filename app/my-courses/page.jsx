'use client';
import { useState, useEffect } from 'react';
import { FiBook, FiPlay, FiClock, FiDollarSign, FiAlertCircle, FiCheck, FiArrowRight } from 'react-icons/fi';
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
            <FiAlertCircle size={20} />
          </button>
        </div>
        
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiAlertCircle className="text-emerald-600 text-2xl" />
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
      'Web Development': <FaCode className="text-lg text-emerald-600" />,
      'Design': <FaPalette className="text-lg text-emerald-600" />,
      'App Development': <FaMobile className="text-lg text-emerald-600" />,
      'Data Science': <FaChartBar className="text-lg text-emerald-600" />,
      'Marketing': <FaBullhorn className="text-lg text-emerald-600" />
    };
    return icons[category] || <FiBook className="text-lg text-emerald-600" />;
  };

  const getStatusBadge = (status) => {
    const styles = {
      'enrolled': 'bg-blue-100 text-blue-800',
      'in-progress': 'bg-yellow-100 text-yellow-800',
      'completed': 'bg-green-100 text-green-800',
      'pending': 'bg-gray-100 text-gray-800'
    };
    return `px-2 py-1 rounded text-xs font-medium ${styles[status] || 'bg-gray-100 text-gray-800'}`;
  };

  const getProgressText = (status, progress) => {
    if (status === 'completed') return 'Course Completed 🎉';
    if (status === 'in-progress') return `${progress}% Complete`;
    if (status === 'pending') return 'Pending Approval';
    return 'Ready to Start';
  };

  const getButtonConfig = (status) => {
    switch (status) {
      case 'enrolled':
        return {
          text: 'Start Course',
          icon: <FiPlay size={16} />,
          variant: 'bg-emerald-500 hover:bg-emerald-600'
        };
      case 'in-progress':
        return {
          text: 'Continue',
          icon: <FiPlay size={16} />,
          variant: 'bg-blue-500 hover:bg-blue-600'
        };
      case 'completed':
        return {
          text: 'Review',
          icon: <FiBook size={16} />,
          variant: 'bg-gray-500 hover:bg-gray-600'
        };
      case 'pending':
        return {
          text: 'Pending',
          icon: <FiAlertCircle size={16} />,
          variant: 'bg-gray-400 cursor-not-allowed',
          disabled: true
        };
      default:
        return {
          text: 'Start',
          icon: <FiPlay size={16} />,
          variant: 'bg-emerald-500 hover:bg-emerald-600'
        };
    }
  };

  const buttonConfig = getButtonConfig(status);
  
  // Check if course has content
  const hasContent = progress > 0 || status === 'completed';

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
      {/* Course Icon Header */}
      <div className="w-full h-32 bg-gray-50 flex items-center justify-center">
        <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center">
          {getCategoryIcon(course.category)}
        </div>
      </div>

      <div className="p-5">
        {/* Course Title and Status */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 flex-1 mr-2">
            {course.title}
          </h3>
          <span className={getStatusBadge(status)}>
            {status.replace('-', ' ')}
          </span>
        </div>

        {/* Course Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {course.description}
        </p>

        {/* Course Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
            {course.category}
          </span>
          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
            {course.level}
          </span>
          {!hasContent && (
            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">
              No Content
            </span>
          )}
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
            <p className="text-xs text-gray-600 font-medium">
              {getProgressText(status, progress)}
            </p>
          </div>
        )}

        {/* Course Meta */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <FiClock className="mr-1" size={14} />
            <span>{course.duration}h</span>
          </div>
          <div className="flex items-center">
            <FiDollarSign className="mr-1" size={14} />
            <span>${course.price}</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => onStartCourse(course._id, course.title, hasContent)}
          disabled={buttonConfig.disabled || status === 'pending'}
          className={`w-full flex items-center justify-center gap-2 px-4 py-2 text-white rounded-lg transition-colors ${buttonConfig.variant} ${
            (buttonConfig.disabled || status === 'pending') ? 'opacity-75 cursor-not-allowed' : 'hover:shadow-md'
          }`}
        >
          {buttonConfig.icon}
          {buttonConfig.text}
        </button>
      </div>
    </div>
  );
};

export default function MyCoursesPage() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [currentCourse, setCurrentCourse] = useState({ id: '', title: '', hasContent: false });

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth/verify');
      const data = await res.json();
      
      if (data.success && data.valid) {
        // Redirect tutors to tutor dashboard
        if (data.user.role === 'tutor') {
          window.location.href = '/tutor/dashboard';
          return;
        }
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

  const handleStartCourse = (courseId, courseTitle, hasContent) => {
    if (hasContent) {
      // For students with available content, redirect to course page
      window.location.href = `/course/${courseId}/content`;
    } else {
      // For students without content, show coming soon modal
      setCurrentCourse({ id: courseId, title: courseTitle, hasContent });
      setModalOpen(true);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentCourse({ id: '', title: '', hasContent: false });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="h-80 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
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
            <button
              onClick={checkAuth}
              className="mt-4 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            My Learning Courses
          </h1>
          <p className="text-gray-600">
            {enrollments.length} enrolled course{enrollments.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrollments.length === 0 ? (
            <div className="col-span-full text-center py-12 bg-white rounded-lg border border-gray-200">
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