import Link from 'next/link'

export default function Unauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Access Denied</h1>
        <p className="text-gray-600 mb-8">You don't have permission to access this page.</p>
        <Link 
          href="/"
          className="px-4 py-2 bg-emerald-700 text-white rounded-md hover:bg-emerald-800 transition-colors"
        >
          Return to Home
        </Link>
      </div>
    </div>
  )
}