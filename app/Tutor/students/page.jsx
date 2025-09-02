'use client';
import { useState, useEffect } from 'react';
import {
  FiUsers, FiMail, FiBook, FiClock, FiSearch, FiAlertCircle,
  FiUserCheck, FiRefreshCw, FiChevronLeft, FiChevronRight, FiX,
  FiChevronDown, FiChevronUp
} from 'react-icons/fi';
import { FaChalkboardTeacher, FaGraduationCap } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

// Pagination Component for Course Tables
const CoursePagination = ({ currentPage, totalPages, onPageChange }) => {
  const maxVisiblePages = 5;
  
  const getPageNumbers = () => {
    const half = Math.floor(maxVisiblePages / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, start + maxVisiblePages - 1);
    
    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }
    
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 bg-white sm:px-6">
      <div className="flex justify-between flex-1 sm:hidden">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing page <span className="font-medium">{currentPage}</span> of{' '}
            <span className="font-medium">{totalPages}</span>
          </p>
        </div>
        <div>
          <nav className="inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="sr-only">Previous</span>
              <FiChevronLeft className="w-5 h-5" aria-hidden="true" />
            </button>
            
            {getPageNumbers().map(page => (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`relative inline-flex items-center px-4 py-2 text-sm font-medium ${
                  currentPage === page
                    ? 'z-10 bg-emerald-50 border-emerald-500 text-emerald-600'
                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                } border`}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="sr-only">Next</span>
              <FiChevronRight className="w-5 h-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

// Mobile Filter Sheet Component
const MobileFilterSheet = ({
  isOpen,
  onClose,
  statusOptions,
  courseOptions,
  currentStatus,
  currentCourse,
  setStatus,
  setCourse,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 z-50 md:hidden"
            onClick={onClose}
          />

          {/* Filter Sheet */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-xl p-4 z-50 shadow-lg md:hidden max-h-[70vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-gray-900">
                Filter Students
              </h3>
              <button
                onClick={onClose}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <FiX size={18} />
              </button>
            </div>

            {/* Status Filters */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Status</h4>
              <div className="grid grid-cols-2 gap-2">
                {statusOptions.map((status) => (
                  <button
                    key={status.value}
                    onClick={() => setStatus(status.value)}
                    className={`p-2 rounded text-xs font-medium transition-colors ${
                      currentStatus === status.value
                        ? "bg-emerald-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {status.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Course Filters */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Course</h4>
              <div className="grid grid-cols-1 gap-2">
                {courseOptions.map((course) => (
                  <button
                    key={course.value}
                    onClick={() => setCourse(course.value)}
                    className={`p-2 rounded text-xs font-medium transition-colors text-left ${
                      currentCourse === course.value
                        ? "bg-emerald-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {course.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Course Group Component
const CourseGroup = ({ course, students, isExpanded, onToggle, getStatusBadge, getStatusIcon }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  // Calculate pagination
  const totalPages = Math.ceil(students.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedStudents = students.slice(startIndex, startIndex + itemsPerPage);
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Reset to page 1 when students change
  useEffect(() => {
    setCurrentPage(1);
  }, [students]);

  return (
    <div className="mb-6 border border-gray-200 rounded-lg overflow-hidden">
      {/* Course Header */}
      <div 
        className="bg-gray-50 p-4 flex justify-between items-center cursor-pointer hover:bg-gray-100 transition-colors"
        onClick={onToggle}
      >
        <div className="flex items-center gap-3">
          <FiBook className="text-emerald-600" size={18} />
          <h3 className="font-semibold text-gray-900">{course.title}</h3>
          <span className="bg-emerald-100 text-emerald-800 text-xs font-medium px-2 py-1 rounded">
            {students.length} student{students.length !== 1 ? 's' : ''}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {isExpanded ? <FiChevronUp size={18} /> : <FiChevronDown size={18} />}
        </div>
      </div>

      {/* Students List - Animated Expand/Collapse */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {/* Table container with horizontal scrolling for mobile */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Progress
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Enrolled Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedStudents.map(student => (
                    <tr
                      key={student._id || `${student.user?.email}-${student.course?._id}`}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      {/* Student Info */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                            {student.user?.name?.charAt(0)?.toUpperCase() || 'U'}
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{student.user?.name || 'Unknown User'}</h4>
                            <p className="text-sm text-gray-500 flex items-center gap-1">
                              <FiMail size={12} /> {student.user?.email || 'No email'}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(student.enrollmentStatus)}
                          <span className={getStatusBadge(student.enrollmentStatus)}>
                            {student.enrollmentStatus?.replace('-', ' ') || 'unknown'}
                          </span>
                        </div>
                      </td>

                      {/* Progress */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="w-32">
                          <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                            <div
                              className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${student.progress}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-gray-600">{student.progress}% complete</p>
                        </div>
                      </td>

                      {/* Enrolled Date */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {student.enrolledAt ? new Date(student.enrolledAt).toLocaleDateString() : 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            <CoursePagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function TutorStudentsPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [courseFilter, setCourseFilter] = useState('all');
  const [courses, setCourses] = useState([]);
  const [expandedCourses, setExpandedCourses] = useState({});
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const router = useRouter();

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
          setError('Access denied. Tutor role required.');
          if (authData.user.role === 'student') router.push('/my-courses');
          else router.push('/');
          return;
        }
        await Promise.all([
          fetchTutorCourses(authData.user.id),
          fetchAllStudents(authData.user.id)
        ]);
      } else {
        setError('Please login to view your students');
      }
    } catch {
      setError('Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const fetchTutorCourses = async (tutorId) => {
    try {
      const response = await fetch(`/api/enrolled-courses?userId=${tutorId}`);
      const data = await response.json();
      if (data.success) setCourses(data.data.map(enrollment => enrollment.course));
    } catch (err) {
      
    }
  };

  const fetchAllStudents = async (tutorId) => {
    try {
      const response = await fetch(`/api/tutor/students?tutorId=${tutorId}`);
      const data = await response.json();
      if (data.success) {
        setStudents(data.data);
        
        // Expand the first course by default
        if (data.data.length > 0) {
          const firstCourseId = data.data[0].course?._id;
          if (firstCourseId) {
            setExpandedCourses({ [firstCourseId]: true });
          }
        }
      }
      else setError(data.error || 'Failed to fetch students');
    } catch {
      setError('Failed to fetch students');
    }
  };

  // Group students by course
  const groupStudentsByCourse = (studentsList) => {
    const grouped = {};
    
    studentsList.forEach(student => {
      const courseId = student.course?._id || 'unknown';
      if (!grouped[courseId]) {
        grouped[courseId] = {
          course: student.course || { title: 'Unknown Course', _id: 'unknown' },
          students: []
        };
      }
      grouped[courseId].students.push(student);
    });
    
    return grouped;
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch =
      student.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.course?.title?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || student.enrollmentStatus === statusFilter;
    const matchesCourse = courseFilter === 'all' || student.course?._id === courseFilter;

    return matchesSearch && matchesStatus && matchesCourse;
  });

  // Group the filtered students
  const groupedStudents = groupStudentsByCourse(filteredStudents);

  const toggleCourseExpansion = (courseId) => {
    setExpandedCourses(prev => ({
      ...prev,
      [courseId]: !prev[courseId]
    }));
  };

  const getStatusBadge = (status) => {
    const styles = {
      enrolled: 'bg-blue-100 text-blue-800',
      'in-progress': 'bg-yellow-100 text-yellow-800',
      completed: 'bg-green-100 text-green-800',
    };
    return `px-2 py-1 rounded text-xs font-medium ${styles[status] || 'bg-gray-100 text-gray-800'}`;
  };

  const getStatusIcon = (status) => {
    const icons = {
      enrolled: <FiUserCheck className="text-blue-500" size={14} />,
      'in-progress': <FiClock className="text-yellow-500" size={14} />,
      completed: <FaGraduationCap className="text-green-500" size={14} />,
    };
    return icons[status] || <FiUserCheck size={14} />;
  };

  // Prepare filter options for mobile sheet
  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'enrolled', label: 'Enrolled' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' }
  ];

  const courseOptions = [
    { value: 'all', label: 'All Courses' },
    ...Object.values(groupedStudents).map(group => ({
      value: group.course._id,
      label: group.course.title
    }))
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
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
            <FiAlertCircle className="mx-auto text-2xl text-red-600 mb-2" />
            <h2 className="text-lg font-semibold text-red-800 mb-2">Error</h2>
            <p className="text-red-600">{error}</p>
            <button
              onClick={checkAuthAndFetchData}
              className="mt-4 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors flex items-center mx-auto"
            >
              <FiRefreshCw className="mr-2" /> Try Again
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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              My Students
            </h1>
            <p className="text-gray-600">
              {filteredStudents.length} student{filteredStudents.length !== 1 && 's'} across{' '}
              {Object.keys(groupedStudents).length} course{Object.keys(groupedStudents).length !== 1 && 's'}
            </p>
          </div>
          <div className="flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-lg self-start">
            <FaChalkboardTeacher className="text-lg" />
            <span className="font-semibold">Tutor Overview </span>
          </div>
        </div>

        {/* Mobile Filter Button */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setShowMobileFilters(true)}
            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg flex items-center justify-between"
          >
            <span>Filter Students</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            {/* Search */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search
              </label>
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search students or courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Status Filter */}
        {/* Status Filter */}
<div className='hidden md:flex flex-col'>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Status
  </label>
  <select
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value)}
    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
  >
    <option value="all">All Statuses</option>
    <option value="enrolled">Enrolled</option>
    <option value="in-progress">In Progress</option>
    <option value="completed">Completed</option>
  </select>
</div>

{/* Course Filter */}
<div className='hidden md:flex flex-col'>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Course
  </label>
  <select
    value={courseFilter}
    onChange={(e) => setCourseFilter(e.target.value)}
    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
  >
    <option value="all">All Courses</option>
    {Object.values(groupedStudents).map(group => (
      <option key={group.course._id} value={group.course._id}>
        {group.course.title}
      </option>
    ))}
  </select>
</div>
          </div>
        </div>

        {/* Students List Grouped by Course */}
        <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden p-6">
          {Object.keys(groupedStudents).length === 0 ? (
            <div className="text-center py-12">
              <FiUsers className="mx-auto text-3xl text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {students.length === 0 ? 'No students found' : 'No matching students'}
              </h3>
              <p className="text-gray-600">
                {students.length === 0
                  ? "You don't have any students enrolled yet."
                  : 'Try adjusting your search or filters'}
              </p>
            </div>
          ) : (
            <div>
              {Object.values(groupedStudents).map(group => (
                <CourseGroup
                  key={group.course._id}
                  course={group.course}
                  students={group.students}
                  isExpanded={expandedCourses[group.course._id] || false}
                  onToggle={() => toggleCourseExpansion(group.course._id)}
                  getStatusBadge={getStatusBadge}
                  getStatusIcon={getStatusIcon}
                />
              ))}
            </div>
          )}
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white rounded-lg shadow border border-gray-200 p-4 text-center">
            <div className="text-2xl font-bold text-emerald-600">{students.length}</div>
            <div className="text-sm text-gray-600">Total Students</div>
          </div>
          <div className="bg-white rounded-lg shadow border border-gray-200 p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {students.filter(s => s.enrollmentStatus === 'enrolled').length}
            </div>
            <div className="text-sm text-gray-600">Newly Enrolled</div>
          </div>
          <div className="bg-white rounded-lg shadow border border-gray-200 p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {students.filter(s => s.enrollmentStatus === 'in-progress').length}
            </div>
            <div className="text-sm text-gray-600">In Progress</div>
          </div>
          <div className="bg-white rounded-lg shadow border border-gray-200 p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {students.filter(s => s.enrollmentStatus === 'completed').length}
            </div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
        </div>
      </div>

      {/* Mobile Filter Sheet */}
      <MobileFilterSheet
        isOpen={showMobileFilters}
        onClose={() => setShowMobileFilters(false)}
        statusOptions={statusOptions}
        courseOptions={courseOptions}
        currentStatus={statusFilter}
        currentCourse={courseFilter}
        setStatus={setStatusFilter}
        setCourse={setCourseFilter}
      />
    </div>
  );
}