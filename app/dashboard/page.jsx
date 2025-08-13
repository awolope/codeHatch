// pages/dashboard.js  (Next.js 12)
// or app/dashboard/page.js for App Router

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-5">
        <h2 className="text-2xl font-bold mb-8 text-blue-600">My Dashboard</h2>
        <nav className="space-y-4">
          <a href="#" className="block text-gray-700 hover:text-blue-500">Overview</a>
          <a href="#" className="block text-gray-700 hover:text-blue-500">Analytics</a>
          <a href="#" className="block text-gray-700 hover:text-blue-500">Settings</a>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold">Welcome Back</h1>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Logout
          </button>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-lg font-semibold mb-2">Total Users</h3>
            <p className="text-2xl font-bold text-blue-600">1,245</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-lg font-semibold mb-2">Sales</h3>
            <p className="text-2xl font-bold text-green-600">$9,300</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-lg font-semibold mb-2">New Signups</h3>
            <p className="text-2xl font-bold text-purple-600">320</p>
          </div>
        </div>
      </div>
    </div>
  );
}
