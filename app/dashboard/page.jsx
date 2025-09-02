'use client';
import { useState, useEffect } from 'react';
import { FiBook, FiPlay, FiClock, FiBarChart, FiAward, FiCalendar, FiTrendingUp, FiUser, FiArrowRight, FiAlertCircle } from 'react-icons/fi';
import { FaCode, FaPalette, FaMobile, FaChartBar, FaBullhorn } from 'react-icons/fa';
import Link from 'next/link';

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

const CourseProgressCard = ({ enrollment, onStartCourse }) => {
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

  const getStatusColor = (status) => {
    const colors = {
      'enrolled': 'text-blue-600 bg-blue-100',
      'in-progress': 'text-yellow-600 bg-yellow-100',
      'completed': 'text-green-600 bg-green-100',
      'pending': 'text-gray-600 bg-gray-100'
    };
    return colors[status] || 'text-gray-600 bg-gray-100';
  };

  // Check if course has content
  const hasContent = progress > 0 || status === 'completed';

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3 flex-1">
          <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center">
            {getCategoryIcon(course.category)}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-gray-900 text-sm line-clamp-1">
              {course.title}
            </h4>
            <p className="text-xs text-gray-500">{course.category}</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(status)}`}>
            {status.replace('-', ' ')}
          </span>
          {!hasContent && (
            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">
              No Content
            </span>
          )}
        </div>
      </div>

      <div className="mb-3">
        <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center">
          <FiClock className="mr-1" size={12} />
          <span>{course.duration}h</span>
        </div>
        <button
          onClick={() => onStartCourse(course._id, course.title, hasContent)}
          className="flex items-center text-emerald-600 hover:text-emerald-700 font-medium"
        >
          <FiPlay className="mr-1" size={12} />
          {status === 'completed' ? 'Review' : 'Continue'}
        </button>
      </div>
    </div>
  );
};

const StatsCard = ({ icon, title, value, subtitle, color = 'emerald' }) => {
  const colorClasses = {
    emerald: 'text-emerald-600 bg-emerald-100',
    blue: 'text-blue-600 bg-blue-100',
    yellow: 'text-yellow-600 bg-yellow-100',
    green: 'text-green-600 bg-green-100'
  };

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 ${colorClasses[color]} rounded-lg flex items-center justify-center`}>
          {icon}
        </div>
      </div>
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
      </div>
    </div>
  );
};

export default function DashboardPage() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
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
        if (data.user.role === 'tutor') {
          window.location.href = '/Tutor/dashboard';
          return;
        }
        setUser(data.user);
        fetchEnrolledCourses(data.user.id);
      } else {
        setError('Please login to view your dashboard');
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

  // Calculate dashboard statistics
  const totalCourses = enrollments.length;
  const completedCourses = enrollments.filter(e => e.status === 'completed').length;
  const inProgressCourses = enrollments.filter(e => e.status === 'in-progress').length;
  const averageProgress = enrollments.length > 0 
    ? Math.round(enrollments.reduce((sum, e) => sum + (e.progress || 0), 0) / enrollments.length)
    : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
            <div className="h-64 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <FiBarChart className="mx-auto text-2xl text-red-600 mb-2" />
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
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Welcome back{user?.name ? `, ${user.name}` : ''}!
            </h1>
            <p className="text-gray-600">Here's your learning progress overview</p>
          </div>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow border border-gray-200">
            <FiUser className="text-emerald-600" />
            <span className="text-sm font-medium text-gray-700">Student Dashboard</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            icon={<FiBook className="text-2xl" />}
            title="Total Courses"
            value={totalCourses}
            subtitle="Enrolled"
            color="blue"
          />
          <StatsCard
            icon={<FiTrendingUp className="text-2xl" />}
            title="In Progress"
            value={inProgressCourses}
            subtitle="Active learning"
            color="yellow"
          />
          <StatsCard
            icon={<FiAward className="text-2xl" />}
            title="Completed"
            value={completedCourses}
            subtitle="Courses finished"
            color="green"
          />
          <StatsCard
            icon={<FiBarChart className="text-2xl" />}
            title="Avg Progress"
            value={`${averageProgress}%`}
            subtitle="Overall completion"
            color="emerald"
          />
        </div>

        {/* Recent Courses Section */}
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Your Courses</h2>
            <Link
              href="/my-courses"
              className="text-emerald-600 hover:text-emerald-700 font-medium text-sm flex items-center"
            >
              View all courses
              <FiArrowRight className="ml-1" size={14} />
            </Link>
          </div>

          {enrollments.length === 0 ? (
            <div className="text-center py-12">
              <FiBook className="mx-auto text-3xl text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No courses yet</h3>
              <p className="text-gray-600 mb-4">You haven't enrolled in any courses yet.</p>
              <Link
                href="/courses"
                className="inline-flex items-center px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
              >
                Browse Courses
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {enrollments.slice(0, 6).map((enrollment) => (
                <CourseProgressCard
                  key={enrollment._id}
                  enrollment={enrollment}
                  onStartCourse={handleStartCourse}
                />
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/courses"
              className="p-4 border border-gray-200 rounded-lg hover:border-emerald-500 hover:bg-emerald-50 transition-all duration-200 text-center"
            >
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <FiBook className="text-emerald-600 text-xl" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Browse Courses</h3>
              <p className="text-sm text-gray-600">Discover new courses to enroll in</p>
            </Link>

            <Link
              href="/my-courses"
              className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 text-center"
            >
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <FiPlay className="text-blue-600 text-xl" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">My Courses</h3>
              <p className="text-sm text-gray-600">View all your enrolled courses</p>
            </Link>
          </div>
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