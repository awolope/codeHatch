'use client';
import { useState, useEffect } from 'react';
import { FiBook, FiUsers, FiBarChart, FiTrendingUp, FiUser, FiArrowRight, FiEdit, FiClock, FiAward } from 'react-icons/fi';
import { FaChalkboardTeacher } from 'react-icons/fa';
import Link from 'next/link';

const CourseStatsCard = ({ course }) => {
  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3 flex-1">
          <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center">
            <FiBook className="text-emerald-600 text-lg" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-gray-900 text-sm line-clamp-1">
              {course.title}
            </h4>
            <p className="text-xs text-gray-500">{course.category}</p>
          </div>
        </div>
        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
          {course.level}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 text-xs mb-3">
        <div className="text-center">
          <div className="text-lg font-bold text-emerald-600">{course.enrollmentCount || 0}</div>
          <div className="text-gray-600">Students</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-blue-600">{Math.round(course.completionRate || 0)}%</div>
          <div className="text-gray-600">Completion</div>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center">
          <FiClock className="mr-1" size={12} />
          <span>{course.duration || 0}h</span>
        </div>
        <Link
          href={`/tutor/courses/${course._id}/`}
          className="flex items-center text-emerald-600 hover:text-emerald-700 font-medium"
        >
          <FiEdit className="mr-1" size={12} />
          Manage
        </Link>
      </div>
    </div>
  );
};

const StatsCard = ({ icon, title, value, subtitle, color = 'emerald' }) => {
  const colorClasses = {
    emerald: 'text-emerald-600 bg-emerald-100',
    blue: 'text-blue-600 bg-blue-100',
    purple: 'text-purple-600 bg-purple-100',
    orange: 'text-orange-600 bg-orange-100'
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

export default function TutorDashboardPage() {
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkAuthAndFetchData();
  }, []);

  const checkAuthAndFetchData = async () => {
    try {
      setLoading(true);
      const authRes = await fetch('/api/auth/verify');
      const authData = await authRes.json();

      if (authData.success && authData.valid) {
        if (authData.user.role !== 'tutor') {
          window.location.href = '/dashboard';
          return;
        }
        setUser(authData.user);
        await Promise.all([
          fetchTutorCourses(authData.user.id),
          fetchAllStudents(authData.user.id)
        ]);
      } else {
        setError('Please login to view your dashboard');
      }
    } catch (err) {
      setError('Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const fetchTutorCourses = async (tutorId) => {
    try {
      const response = await fetch(`/api/enrolled-courses?userId=${tutorId}`);
      const data = await response.json();
      
      if (data.success) {
        setCourses(data.data.map(enrollment => enrollment.course));
      }
    } catch (err) {
      
    }
  };

  const fetchAllStudents = async (tutorId) => {
    try {
      const response = await fetch(`/api/tutor/students?tutorId=${tutorId}`);
      const data = await response.json();
      
      if (data.success) {
        setStudents(data.data);
      } else {
        setError(data.error || 'Failed to fetch students');
      }
    } catch (err) {
      setError('Failed to fetch students');
    }
  };

  // Calculate dashboard statistics from the fetched data
  const totalStudents = students.length;
  const totalCoursesCount = courses.length;
  const completedStudents = students.filter(s => s.enrollmentStatus === 'completed').length;
  const completionRate = totalStudents > 0 ? Math.round((completedStudents / totalStudents) * 100) : 0;
  const averageCompletion = courses.length > 0 
    ? Math.round(courses.reduce((sum, course) => sum + (course.completionRate || 0), 0) / courses.length)
    : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
            <div className="h-64 bg-gray-200 rounded-lg mb-8"></div>
            <div className="h-48 bg-gray-200 rounded-lg"></div>
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
            <FaChalkboardTeacher className="mx-auto text-2xl text-red-600 mb-2" />
            <h2 className="text-lg font-semibold text-red-800 mb-2">Error</h2>
            <p className="text-red-600">{error}</p>
            <button
              onClick={checkAuthAndFetchData}
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
              Welcome back, Instructor{user?.name ? ` ${user.name}` : ''}!
            </h1>
            <p className="text-gray-600">Here's your teaching performance overview</p>
          </div>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow border border-gray-200">
            <FaChalkboardTeacher className="text-emerald-600" />
            <span className="text-sm font-medium text-gray-700">Instructor Dashboard</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard
            icon={<FiUsers className="text-2xl" />}
            title="Total Students"
            value={totalStudents}
            subtitle="Across all courses"
            color="blue"
          />
          <StatsCard
            icon={<FiBook className="text-2xl" />}
            title="Total Courses"
            value={totalCoursesCount}
            subtitle="Courses you teach"
            color="purple"
          />
          <StatsCard
            icon={<FiTrendingUp className="text-2xl" />}
            title="Success Rate"
            value={`${completionRate}%`}
            subtitle="Student completion rate"
            color="emerald"
          />
        </div>

        {/* Courses Section */}
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Your Courses</h2>
            <Link
              href="/tutor/courses"
              className="text-emerald-600 hover:text-emerald-700 font-medium text-sm flex items-center"
            >
              View all courses
              <FiArrowRight className="ml-1" size={14} />
            </Link>
          </div>

          {courses.length === 0 ? (
            <div className="text-center py-12">
              <FiBook className="mx-auto text-3xl text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No courses yet</h3>
              <p className="text-gray-600 mb-4">You haven't been assigned to any courses yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {courses.slice(0, 6).map((course) => (
                <CourseStatsCard
                  key={course._id}
                  course={course}
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
              href="/Tutor/students"
              className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 text-center"
            >
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <FiUsers className="text-blue-600 text-xl" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">View Students</h3>
              <p className="text-sm text-gray-600">Manage your students</p>
            </Link>

            <Link
              href="/Tutor/courses"
              className="p-4 border border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all duration-200 text-center"
            >
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <FiBook className="text-purple-600 text-xl" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Manage Courses</h3>
              <p className="text-sm text-gray-600">Edit your course content</p>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6 mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Teaching Overview</h2>
          <div className="text-center py-8 text-gray-600">
            <FiAward className="mx-auto text-3xl mb-4 text-emerald-600" />
            <p className="text-lg font-medium mb-2">Teaching Analytics</p>
            <p className="text-sm">Track your students' progress and course performance</p>
            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="font-semibold text-emerald-600">{averageCompletion}%</div>
                <div>Avg Course Completion</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="font-semibold text-blue-600">{completedStudents}</div>
                <div>Students Completed</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}