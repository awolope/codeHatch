'use client';
import { useState, useEffect } from 'react';
import { FiCopy, FiCheck, FiArrowLeft, FiDollarSign, FiClock, FiCheckCircle } from 'react-icons/fi';
import { useParams, useRouter } from 'next/navigation';

export default function PaymentPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.courseId;
  
  const [course, setCourse] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copiedAccount, setCopiedAccount] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [existingEnrollment, setExistingEnrollment] = useState(null);
  
  // Bank transfer form fields
  const [bankName, setBankName] = useState('');
  const [transferDate, setTransferDate] = useState('');
  const [paymentReference, setPaymentReference] = useState('');

  // Sample bank accounts
  const bankAccounts = [
    {
      id: 1,
      bankName: 'ABC Bank',
      accountName: 'Your Company Name',
      accountNumber: '1234567890',
      branch: 'Main Branch'
    },
    {
      id: 2,
      bankName: 'XYZ Bank',
      accountName: 'Your Company Name',
      accountNumber: '0987654321',
      branch: 'Downtown Branch'
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch user data first
        const userRes = await fetch('/api/auth/verify');
        if (userRes.ok) {
          const userData = await userRes.json();
          if (userData.success && userData.valid) {
            setUser(userData.user);
            
            // Fetch course details
            const courseRes = await fetch(`/api/courses/${courseId}`);
            if (courseRes.ok) {
              const courseData = await courseRes.json();
              if (courseData.success) {
                setCourse(courseData.data);
                
                // Check if user already has an enrollment for this course
                const enrollmentsRes = await fetch(`/api/enrollments?userId=${userData.user.id}`);
                if (enrollmentsRes.ok) {
                  const enrollmentsData = await enrollmentsRes.json();
                  if (enrollmentsData.success) {
                    const existing = enrollmentsData.data.find(
                      enrollment => enrollment.course._id === courseId
                    );
                    if (existing) {
                      setExistingEnrollment(existing);
                    }
                  }
                }
              } else {
                setError(courseData.error || 'Course not found');
              }
            } else {
              setError('Failed to fetch course details');
            }
          } else {
            router.push('/login');
          }
        } else {
          setError('Authentication failed');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('An error occurred while loading the page');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [courseId, router]);

  const copyToClipboard = (text, accountId) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(accountId);
    setTimeout(() => setCopiedAccount(null), 2000);
  };

  const handlePaymentComplete = async () => {
  if (existingEnrollment) {
    setError('You already have an enrollment for this course');
    return;
  }

  // Validate form fields
  if (!bankName.trim()) {
    setError('Please enter the bank name you transferred from');
    return;
  }
  
  if (!transferDate) {
    setError('Please select the transfer date');
    return;
  }
  
  if (!paymentReference.trim()) {
    setError('Please enter a payment reference number');
    return;
  }

  try {
    setSubmitting(true);
    setError('');
    
    const res = await fetch('/api/payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: user.id,
        courseId: courseId,
        bankName: bankName.trim(),
        transferDate: transferDate,
        paymentReference: paymentReference.trim()
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      // Get more detailed error message
      const errorMessage = data.message || data.error || `HTTP error! status: ${res.status}`;
      throw new Error(errorMessage);
    }

    if (data.success) {
      router.push('/courses?message=pending_enrollment');
    } else {
      throw new Error(data.message || 'Payment failed');
    }
  } catch (error) {
    console.error('Error processing payment:', error);
    
    // Show more specific error messages
    if (error.message.includes('Failed to fetch')) {
      setError('Cannot connect to server. Please check your internet connection and try again.');
    } else if (error.message.includes('Already enrolled')) {
      setError('You already have an enrollment for this course. Please check your dashboard.');
    } else {
      setError(error.message || 'Failed to process payment. Please try again.');
    }
  } finally {
    setSubmitting(false);
  }
};

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (!course || !user) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-semibold text-gray-900 mb-2">Course not found</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => router.push('/courses')}
            className="px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  // If user already has an enrollment, show status instead of payment form
  if (existingEnrollment) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="mb-6">
            <button 
              onClick={() => router.push('/courses')}
              className="flex items-center text-emerald-600 hover:text-emerald-700 mb-4"
            >
              <FiArrowLeft className="mr-2" />
              Back to Courses
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Enrollment Status</h1>
            <p className="text-gray-600">Course: {course.title}</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="text-center">
              {existingEnrollment.paymentStatus === 'pending' ? (
                <>
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FiClock className="text-yellow-600 text-2xl" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">Payment Pending Verification</h2>
                  <p className="text-gray-600 mb-4">
                    Your enrollment is pending payment verification. Our team will review your 
                    bank transfer and activate your course access within 24 hours.
                  </p>
                  <p className="text-sm text-gray-500">
                    Payment Status: <span className="font-medium capitalize">{existingEnrollment.paymentStatus}</span>
                  </p>
                </>
              ) : existingEnrollment.status === 'enrolled' ? (
                <>
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FiCheckCircle className="text-emerald-600 text-2xl" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">Already Enrolled</h2>
                  <p className="text-gray-600 mb-4">
                    You are already enrolled in this course. You can access the course materials from your dashboard.
                  </p>
                  <button
                    onClick={() => router.push('/dashboard')}
                    className="px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600"
                  >
                    Go to Dashboard
                  </button>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FiClock className="text-gray-600 text-2xl" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">Enrollment Status: {existingEnrollment.status}</h2>
                  <p className="text-gray-600 mb-4">
                    Your enrollment is currently: <span className="font-medium capitalize">{existingEnrollment.status}</span>
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <button 
            onClick={() => router.push('/courses')}
            className="flex items-center text-emerald-600 hover:text-emerald-700 mb-4"
          >
            <FiArrowLeft className="mr-2" />
            Back to Courses
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Complete Your Enrollment</h1>
          <p className="text-gray-600">Payment for: {course.title}</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {/* Course Summary */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Order Summary</h2>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">{course.title}</span>
              <span className="font-semibold">${course.price}</span>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center font-semibold">
                <span>Total</span>
                <span>${course.price}</span>
              </div>
            </div>
          </div>

          {/* Bank Transfer Instructions */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Bank Transfer Instructions</h2>
            <p className="text-gray-600 mb-4">
              Please transfer the amount of <strong>${course.price}</strong> to one of our bank accounts listed below. 
              After completing the transfer, fill in your payment details and click the "I've Paid" button.
            </p>

            <div className="space-y-4 mb-6">
              {bankAccounts.map((account) => (
                <div key={account.id} className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">{account.bankName}</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Account Name:</span>
                      <span className="font-medium">{account.accountName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Account Number:</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono">{account.accountNumber}</span>
                        <button
                          onClick={() => copyToClipboard(account.accountNumber, account.id)}
                          className="p-1 text-gray-500 hover:text-emerald-600 transition-colors"
                          title="Copy to clipboard"
                        >
                          {copiedAccount === account.id ? (
                            <FiCheck className="text-emerald-600" />
                          ) : (
                            <FiCopy />
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Branch:</span>
                      <span className="font-medium">{account.branch}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Payment Details Form */}
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-3">Your Payment Details</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bank Name (Your Bank) *
                  </label>
                  <input
                    type="text"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Which bank did you transfer from?"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Transfer Date *
                  </label>
                  <input
                    type="date"
                    value={transferDate}
                    onChange={(e) => setTransferDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Payment Reference Number *
                  </label>
                  <input
                    type="text"
                    value={paymentReference}
                    onChange={(e) => setPaymentReference(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Transaction reference number from your bank"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Important Notes */}
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h3 className="font-semibold text-yellow-800 mb-2">Important Notes</h3>
            <ul className="text-yellow-700 text-sm space-y-1">
              <li>• Include your name and course title in the transfer reference</li>
              <li>• Enrollment will be activated after we verify your payment (usually within 24 hours)</li>
              <li>• You'll receive a confirmation email once your enrollment is approved</li>
              <li>• Keep your transaction receipt for reference</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={() => router.push('/courses')}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handlePaymentComplete}
              disabled={submitting}
              className="flex-1 px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Processing...
                </>
              ) : (
                <>
                  <FiDollarSign />
                  I've Paid - Complete Enrollment
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}