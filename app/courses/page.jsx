'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiClock, FiDollarSign, FiBook, FiSearch, FiX, FiFilter, FiCheck, FiUser, FiLogIn } from 'react-icons/fi';
import { FaCode, FaPalette, FaMobile, FaChartBar, FaBullhorn, FaFire } from 'react-icons/fa';
import LoadingSpinner from '../components/LoadingSpinner';

// Login Prompt Modal Component
const LoginPromptModal = ({ isOpen, onClose, onLogin }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            {/* Modal */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiLogIn className="text-emerald-600 text-2xl" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Login Required
                </h3>
                <p className="text-gray-600 text-sm mb-6">
                  Please log in to enroll in this course and access all features.
                </p>
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={onLogin}
                    className="px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600 transition-colors text-sm"
                  >
                    Go to Login
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Enrollment Success Modal Component
const EnrollmentSuccessModal = ({ isOpen, onClose, courseTitle }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            {/* Modal */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiCheck className="text-emerald-600 text-2xl" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Successfully Enrolled!
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  You are now enrolled in <span className="font-medium">{courseTitle}</span>
                </p>
                <p className="text-gray-500 text-xs mb-6">
                  You can access the course materials from your dashboard.
                </p>
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600 transition-colors text-sm"
                >
                  Continue Browsing
                </button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// CourseCard Component
const CourseCard = ({ course, userEnrollments, user, onLoginPrompt }) => {
  // Check for any enrollment (regardless of status)
  const enrollment = userEnrollments.find(enrollment => 
    enrollment.course && enrollment.course._id === course._id
  );
  
  const isEnrolled = enrollment && enrollment.status === 'enrolled';
  const isPending = enrollment && enrollment.status === 'pending';
  const isFeatured = course.isFeatured;

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

  const getCategoryColor = (category) => {
    const colors = {
      'Web Development': {
        bg: 'bg-blue-100',
        text: 'text-blue-800',
        icon: 'text-blue-600',
        border: 'border-blue-200'
      },
      'Design': {
        bg: 'bg-purple-100',
        text: 'text-purple-800',
        icon: 'text-purple-600',
        border: 'border-purple-200'
      },
      'App Development': {
        bg: 'bg-green-100',
        text: 'text-green-800',
        icon: 'text-green-600',
        border: 'border-green-200'
      },
      'Data Science': {
        bg: 'bg-orange-100',
        text: 'text-orange-800',
        icon: 'text-orange-600',
        border: 'border-orange-200'
      },
      'Marketing': {
        bg: 'bg-pink-100',
        text: 'text-pink-800',
        icon: 'text-pink-600',
        border: 'border-pink-200'
      }
    };
    return colors[category] || {
      bg: 'bg-gray-100',
      text: 'text-gray-800',
      icon: 'text-gray-600',
      border: 'border-gray-200'
    };
  };

  const getLevelColor = (level) => {
    const colors = {
      'Beginner': {
        bg: 'bg-emerald-100',
        text: 'text-emerald-800',
        border: 'border-emerald-200'
      },
      'Intermediate': {
        bg: 'bg-blue-100',
        text: 'text-blue-800',
        border: 'border-blue-200'
      },
      'Advanced': {
        bg: 'bg-purple-100',
        text: 'text-purple-800',
        border: 'border-purple-200'
      }
    };
    return colors[level] || {
      bg: 'bg-gray-100',
      text: 'text-gray-800',
      border: 'border-gray-200'
    };
  };

  const categoryColor = getCategoryColor(course.category);
  const levelColor = getLevelColor(course.level);

  const handleEnrollClick = () => {
    if (!user) {
      onLoginPrompt();
    } else {
      // Redirect to payment page
      window.location.href = `/payment/${course._id}`;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-sm transition-all duration-150 cursor-pointer relative overflow-hidden"
    >
      {/* Featured Banner */}
      {isFeatured && (
        <div className="absolute top-2 right-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 z-10">
          <FaFire size={10} />
          <span>Hot</span>
        </div>
      )}

      {/* Category Icon */}
      <div className={`w-10 h-10 rounded-lg ${categoryColor.bg} flex items-center justify-center mb-3 border ${categoryColor.border}`}>
        <div className={categoryColor.icon}>
          {getCategoryIcon(course.category)}
        </div>
      </div>

      {/* Course Title */}
      <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-2">
        {course.title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 mb-3 line-clamp-2 leading-relaxed text-sm">
        {course.description}
      </p>

      {/* Level Badge */}
      <div className="mb-3">
        <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${levelColor.bg} ${levelColor.text}`}>
          {course.level}
        </span>
      </div>

      {/* Meta Information */}
      <div className="flex items-center justify-between text-xs mb-3">
        <div className="flex items-center space-x-2 text-gray-500">
          <div className="flex items-center">
            <FiClock className="mr-1" size={10} />
            <span>{course.duration}h</span>
          </div>
          <div className="flex items-center">
            <FiDollarSign className="mr-1" size={10} />
            <span>${course.price}</span>
          </div>
        </div>
        
        {/* Category */}
        <span className={`px-2 py-1 rounded text-xs ${categoryColor.bg} ${categoryColor.text}`}>
          {course.category}
        </span>
      </div>

      {/* Enroll Button */}
      <button
        onClick={handleEnrollClick}
        disabled={isEnrolled || isPending}
        className={`w-full py-2 rounded text-sm font-medium transition-colors ${
          isEnrolled
            ? 'bg-emerald-100 text-emerald-700 cursor-default'
            : isPending
            ? 'bg-yellow-100 text-yellow-700 cursor-default'
            : !user
            ? 'bg-gray-500 hover:bg-gray-600 text-white'
            : 'bg-emerald-500 hover:bg-emerald-600 text-white'
        }`}
      >
        {isEnrolled ? (
          <span className="flex items-center justify-center gap-1">
            <FiCheck size={14} /> Enrolled
          </span>
        ) : isPending ? (
          <span className="flex items-center justify-center gap-1">
            ⏳ Pending Approval
          </span>
        ) : !user ? (
          <span className="flex items-center justify-center gap-1">
            <FiLogIn size={14} /> Login to Enroll
          </span>
        ) : (
          'Enroll Now'
        )}
      </button>
    </motion.div>
  );
};

// Mobile Filter Sheet Component
const MobileFilterSheet = ({
  isOpen,
  onClose,
  categories,
  levels,
  currentFilter,
  currentLevel,
  setFilter,
  setLevel,
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
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-xl p-4 z-50 shadow-lg md:hidden max-h-[60vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-gray-900">
                Filter Courses
              </h3>
              <button
                onClick={onClose}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <FiX size={18} />
              </button>
            </div>

            {/* Category Filters */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Category</h4>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setFilter(category)}
                    className={`p-2 rounded text-xs font-medium transition-colors ${
                      currentFilter === category
                        ? "bg-emerald-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Level Filters */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Level</h4>
              <div className="grid grid-cols-3 gap-2">
                {levels.map((level) => (
                  <button
                    key={level}
                    onClick={() => setLevel(level)}
                    className={`p-2 rounded text-xs font-medium transition-colors ${
                      currentLevel === level
                        ? "bg-emerald-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {level}
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

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [userEnrollments, setUserEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(true);
  const [error, setError] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [levelFilter, setLevelFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successCourseTitle, setSuccessCourseTitle] = useState('');

  // Define categories and levels with default values
  const categories = ['All', ...new Set(courses.map(course => course.category).filter(Boolean))];
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch courses (available to everyone)
        const coursesRes = await fetch('/api/courses');
        if (!coursesRes.ok) {
          throw new Error(`Failed to fetch courses: ${coursesRes.status}`);
        }

        const coursesData = await coursesRes.json();
        if (!coursesData.success) {
          throw new Error(coursesData.error || 'Something went wrong');
        }

        setCourses(coursesData.data);

        // Fetch user data and enrollments only if user is authenticated
        const userRes = await fetch('/api/auth/verify');
        if (userRes.ok) {
          const userData = await userRes.json();
          if (userData.success && userData.valid) {
            setUser(userData.user);
            
            // Fetch user enrollments
            const enrollmentsRes = await fetch(`/api/enrollments?userId=${userData.user.id}`);
            if (enrollmentsRes.ok) {
              const enrollmentsData = await enrollmentsRes.json();
              if (enrollmentsData.success) {
                setUserEnrollments(enrollmentsData.data);
              }
            }
          }
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message || 'Failed to load data');
      } finally {
        setLoading(false);
        setAuthLoading(false);
      }
    };

    fetchData();
  }, []);

  // Check for success message when component mounts
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const message = urlParams.get('message');
    
    if (message === 'pending_enrollment') {
      // Clean up the URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  // Filter courses based on selected filters and search term
  const filteredCourses = courses.filter(course => {
    const matchesCategory = categoryFilter === 'All' || course.category === categoryFilter;
    const matchesLevel = levelFilter === 'All' || course.level === levelFilter;
    const matchesSearch = searchTerm === '' || 
                         course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesLevel && matchesSearch;
  });

  const handleLoginPrompt = () => {
    setShowLoginModal(true);
  };

  const handleLogin = () => {
    window.location.href = '/login';
  };

  // Add user greeting to the header
  const UserGreeting = () => {
    if (authLoading) {
      return <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>;
    }
    
    if (user) {
      return (
        <p className="text-gray-600 text-sm flex items-center gap-1">
          <FiUser size={12} />
          Welcome back, {user.name}
        </p>
      );
    }
    
    return (
      <p className="text-gray-600 text-sm flex items-center gap-1">
        <FiLogIn size={12} />
        Log in to enroll in courses
      </p>
    );
  };

  // Loading states
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center">
          <div className="bg-white rounded-lg p-4 border border-red-200 max-w-md mx-auto">
            <h1 className="text-lg font-semibold text-gray-900 mb-2">Oops!</h1>
            <p className="text-red-600 text-sm">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-3 px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors text-xs"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16 pb-8 mt-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header with user greeting */}
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
            Course Catalog
          </h1>
          <UserGreeting />
          <p className="text-gray-500 text-xs mt-1">
            Browse our collection of learning resources
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-6">
          <div className="bg-white rounded-lg p-3 ">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              {/* Search Input */}
              <div className="w-1/2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                  />
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} />
                </div>
              </div>

              {/* Filter Button for Mobile */}
              <button
                onClick={() => setIsFilterOpen(true)}
                className="w-full md:w-auto flex items-center justify-center gap-2 px-3 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600 transition-colors md:hidden text-sm"
              >
                <FiFilter size={14} />
                Filter
              </button>
              
              {/* Desktop Filters */}
              <div className="hidden md:flex gap-6 items-end">
                <div className="flex flex-col">
                  <label className="text-xs text-gray-500 font-medium mb-4">Category</label>
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="px-3 mb-8 py-2 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col">
                  <label className="text-xs text-gray-500 font-medium mb-1">Level</label>
                  <select
                    value={levelFilter}
                    onChange={(e) => setLevelFilter(e.target.value)}
                    className="px-3 py-2 rounded-lg border mb-8  border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    {levels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>
              </div>
            
            </div>
          </div>
        </div>

        {/* Mobile Filter Sheet */}
        <MobileFilterSheet
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          categories={categories}
          levels={levels}
          currentFilter={categoryFilter}
          currentLevel={levelFilter}
          setFilter={setCategoryFilter}
          setLevel={setLevelFilter}
        />

        {/* Courses Grid */}
        <div>
          {filteredCourses.length === 0 ? (
            <div className="text-center py-8 bg-white rounded-lg border border-gray-200">
              <FiBook className="mx-auto text-2xl text-gray-400 mb-2" />
              <h3 className="text-base font-semibold text-gray-900 mb-1">No courses found</h3>
              <p className="text-gray-600 text-xs">Try different search or filter terms</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredCourses.map(course => (
                <CourseCard 
                  key={course._id} 
                  course={course} 
                  userEnrollments={userEnrollments}
                  user={user}
                  onLoginPrompt={handleLoginPrompt}
                />
              ))}
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="text-center mt-6 text-gray-600 bg-white rounded py-2 border border-gray-200 text-xs">
          Showing <span className="font-semibold text-emerald-600">{filteredCourses.length}</span> of{' '}
          <span className="font-semibold">{courses.length}</span> courses
        </div>

        {/* Login Prompt Modal */}
        <LoginPromptModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onLogin={handleLogin}
        />

        {/* Enrollment Success Modal */}
        <EnrollmentSuccessModal
          isOpen={showSuccessModal}
          onClose={() => setShowSuccessModal(false)}
          courseTitle={successCourseTitle}
        />
      </div>
    </div>
  );
}