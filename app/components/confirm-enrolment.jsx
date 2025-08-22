'use client';
import { useState, useEffect } from 'react';
import { FiCheck, FiX, FiRefreshCw, FiDollarSign, FiUser, FiBook, FiInfo } from 'react-icons/fi';

// Notification Modal Component
const NotificationModal = ({ isOpen, onClose, type, title, message }) => {
  if (!isOpen) return null;

  const bgColors = {
    success: 'bg-green-50 border-green-200',
    error: 'bg-red-50 border-red-200',
    info: 'bg-blue-50 border-blue-200'
  };

  const textColors = {
    success: 'text-green-800',
    error: 'text-red-800',
    info: 'text-blue-800'
  };

  const icons = {
    success: <FiCheck className="text-green-600" size={20} />,
    error: <FiX className="text-red-600" size={20} />,
    info: <FiInfo className="text-blue-600" size={20} />
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className={`max-w-md w-full p-6 rounded-lg border ${bgColors[type]} shadow-lg`}>
        <div className="flex items-center gap-3 mb-4">
          {icons[type]}
          <h3 className={`text-lg font-semibold ${textColors[type]}`}>{title}</h3>
        </div>
        <p className={`mb-6 ${textColors[type]}`}>{message}</p>
        <button
          onClick={onClose}
          className={`w-full py-2 rounded font-medium ${
            type === 'success' ? 'bg-green-600 hover:bg-green-700' :
            type === 'error' ? 'bg-red-600 hover:bg-red-700' :
            'bg-blue-600 hover:bg-blue-700'
          } text-white transition-colors`}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default function Confirm() {
  const [enrollments, setEnrollments] = useState([]);
  const [filter, setFilter] = useState('all'); // all, pending, paid, failed
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [notification, setNotification] = useState({
    isOpen: false,
    type: 'info',
    title: '',
    message: ''
  });

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (isAdmin) {
      fetchEnrollments();
    }
  }, [isAdmin, filter]);

  const showNotification = (type, title, message) => {
    setNotification({
      isOpen: true,
      type,
      title,
      message
    });
  };

  const closeNotification = () => {
    setNotification({
      isOpen: false,
      type: 'info',
      title: '',
      message: ''
    });
  };

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth/verify');
      const data = await res.json();
      
      if (data.success && data.valid) {
        setUser(data.user);
        setIsAdmin(data.user.role === 'admin');
        
        if (data.user.role !== 'admin') {
          setError('Access denied. Admin privileges required.');
        }
      } else {
        setError('Please login to access admin dashboard');
      }
    } catch (err) {
      setError('Authentication failed');
    }
  };

  const fetchEnrollments = async () => {
    try {
      setLoading(true);
      const url = filter === 'all' 
        ? '/api/admin/enrollments' 
        : `/api/admin/enrollments?status=${filter}`;
      
      const res = await fetch(url);
      const data = await res.json();
      
      if (data.success) {
        setEnrollments(data.data);
      } else {
        setError(data.error || 'Failed to fetch enrollments');
        showNotification('error', 'Error', data.error || 'Failed to fetch enrollments');
      }
    } catch (err) {
      setError('Failed to fetch enrollments');
      showNotification('error', 'Error', 'Failed to fetch enrollments');
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentAction = async (enrollmentId, action) => {
    try {
      const res = await fetch('/api/admin/enrollments/confirm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ enrollmentId, action }),
      });

      const data = await res.json();
      
      if (data.success) {
        showNotification(
          'success', 
          'Success', 
          data.message || `Payment ${action === 'approve' ? 'approved' : 'rejected'} successfully`
        );
        fetchEnrollments(); // Refresh the list
      } else {
        showNotification(
          'error',
          'Error',
          data.error || `Failed to ${action === 'approve' ? 'approve' : 'reject'} payment`
        );
      }
    } catch (err) {
      showNotification(
        'error',
        'Error',
        'Failed to process payment. Please try again.'
      );
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800',
      paid: 'bg-green-100 text-green-800',
      failed: 'bg-red-100 text-red-800',
      refunded: 'bg-gray-100 text-gray-800'
    };
    return `px-2 py-1 rounded text-xs font-medium ${styles[status] || 'bg-gray-100 text-gray-800'}`;
  };

  const getPaymentMethodIcon = (method) => {
    if (method === 'bank_transfer') return <FiDollarSign className="inline mr-1" />;
    return <FiDollarSign className="inline mr-1" />;
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-semibold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Manage course enrollments and payments</p>
        </div>

        {/* Filter Controls */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <span className="text-sm font-medium text-gray-700">Filter by status:</span>
            {['all', 'pending', 'paid', 'failed'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-3 py-1 rounded text-sm ${
                  filter === status
                    ? 'bg-emerald-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
            <button
              onClick={fetchEnrollments}
              className="ml-auto flex items-center gap-2 px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
            >
              <FiRefreshCw size={14} />
              Refresh
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Enrollments List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading enrollments...</p>
            </div>
          ) : enrollments.length === 0 ? (
            <div className="p-8 text-center">
              <FiBook className="mx-auto text-2xl text-gray-400 mb-2" />
              <p className="text-gray-600">No enrollments found</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {enrollments.map((enrollment) => (
                <div key={enrollment._id} className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    {/* Enrollment Info */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {enrollment.course?.title}
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <FiUser className="mr-2 text-gray-400" />
                          <span>{enrollment.user?.name} ({enrollment.user?.email})</span>
                        </div>
                        
                        <div className="flex items-center">
                          <FiDollarSign className="mr-2 text-gray-400" />
                          <span>${enrollment.amountPaid}</span>
                        </div>
                        
                        <div>
                          <span className={getStatusBadge(enrollment.paymentStatus)}>
                            {enrollment.paymentStatus}
                          </span>
                        </div>
                        
                        <div>
                          {enrollment.paymentMethod && (
                            <span className="text-sm text-gray-500">
                              {getPaymentMethodIcon(enrollment.paymentMethod)}
                              {enrollment.paymentMethod.replace('_', ' ')}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Payment Details */}
                      {(enrollment.bankName || enrollment.paymentReference) && (
                        <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                          <h4 className="font-medium text-sm text-gray-700 mb-1">Payment Details:</h4>
                          <div className="text-sm text-gray-600 space-y-1">
                            {enrollment.bankName && <p>Bank: {enrollment.bankName}</p>}
                            {enrollment.paymentReference && <p>Reference: {enrollment.paymentReference}</p>}
                            {enrollment.transferDate && (
                              <p>Date: {new Date(enrollment.transferDate).toLocaleDateString()}</p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    {enrollment.paymentStatus === 'pending' && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handlePaymentAction(enrollment._id, 'approve')}
                          className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                        >
                          <FiCheck size={16} />
                          Approve
                        </button>
                        <button
                          onClick={() => handlePaymentAction(enrollment._id, 'reject')}
                          className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                        >
                          <FiX size={16} />
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Enrollments</h3>
            <p className="text-3xl font-bold text-emerald-600">{enrollments.length}</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Pending Payments</h3>
            <p className="text-3xl font-bold text-yellow-600">
              {enrollments.filter(e => e.paymentStatus === 'pending').length}
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Completed Payments</h3>
            <p className="text-3xl font-bold text-green-600">
              {enrollments.filter(e => e.paymentStatus === 'paid').length}
            </p>
          </div>
        </div>

        {/* Notification Modal */}
        <NotificationModal
          isOpen={notification.isOpen}
          onClose={closeNotification}
          type={notification.type}
          title={notification.title}
          message={notification.message}
        />
      </div>
    </div>
  );
}