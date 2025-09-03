// app/tutor/courses/page.js
'use client';
import { useState, useEffect } from 'react';
import { FiBook, FiPlus, FiEdit, FiClock, FiDollarSign, FiAlertCircle, FiGrid } from 'react-icons/fi';
import { FaCode, FaPalette, FaMobile, FaChartBar, FaBullhorn } from 'react-icons/fa';
import Link from 'next/link';

export default function TutorCoursesPage() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth/verify');
      const data = await res.json();
      
      if (data.success && data.valid) {
        fetchTutorCourses(data.user.id);
      } else {
        setError('Please login to view your courses');
        setLoading(false);
      }
    } catch (err) {
      setError('Authentication failed');
      setLoading(false);
    }
  };

  const fetchTutorCourses = async (userId) => {
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
      'completed': 'bg-green-100 text-green-800',
      'pending': 'bg-gray-100 text-gray-800'
    };
    return `px-2 py-1 rounded text-xs font-medium ${styles[status] || 'bg-gray-100 text-gray-800'}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
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
            My Teaching Assignments
          </h1>
          <p className="text-gray-600">
            {enrollments.length} assigned course{enrollments.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrollments.map((enrollment) => (
            <div key={enrollment._id} className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
              <div className="p-6">
                {/* Course Icon */}
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center text-white mb-4">
                  {getCategoryIcon(enrollment.course.category)}
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {enrollment.course.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {enrollment.course.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                    {enrollment.course.category}
                  </span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                    {enrollment.course.level}
                  </span>
                  <span className={getStatusBadge(enrollment.status)}>
                    {enrollment.status.replace('-', ' ')}
                  </span>
                </div>

                {/* Progress Bar */}
                {(enrollment.status === 'in-progress' || enrollment.status === 'completed') && (
                  <div className="mb-4">
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div 
                        className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${enrollment.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-600">
                      {enrollment.progress}% Complete
                    </p>
                  </div>
                )}

                {/* Course Meta */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <FiClock className="mr-1" size={14} />
                    <span>{enrollment.course.duration || 0}h</span>
                  </div>
                  <div className="flex items-center">
                    <FiDollarSign className="mr-1" size={14} />
                    <span>${enrollment.course.price || 0}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <Link
                    href={`/`}
                    className="w-full flex items-center justify-center px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors text-sm"
                  >
                    <FiPlus className="mr-2" size={14} />
                    Add Modules
                  </Link>
                  
                  <Link
                    href={`/tutor/courses/${enrollment.course._id}/content`}
                    className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                  >
                    <FiGrid className="mr-2" size={14} />
                    Manage Content
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {/* Empty State */}
          {enrollments.length === 0 && (
            <div className="col-span-full text-center py-12 bg-white rounded-lg shadow border border-gray-200">
              <FiBook className="mx-auto text-3xl text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No teaching assignments</h3>
              <p className="text-gray-600 mb-4">You haven't been assigned to any courses yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}