'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Import useRouter

export default function DashboardPage() {
  const [userEmail, setUserEmail] = useState('');
  const [analytics, setAnalytics] = useState({
    totalClicks: 0,
    totalConversions: 0,
    totalRevenue: 0,
    totalWebsiteGenerations: 0,
    conversionRate: '0.00',
    dailyPerformance: [],
  });
  const [loadingAnalytics, setLoadingAnalytics] = useState(true);
  const [currentTime, setCurrentTime] = useState(''); // New state for current time
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      setUserEmail(storedEmail);
      fetchAnalytics(storedEmail);
    } else {
      // If no user email, redirect to login (or handle as unauthorized)
      router.push('/login');
    }

    // Set current time only on the client side after mount
    setCurrentTime(`${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`);

  }, [router]); // Add router to dependency array

  const fetchAnalytics = async (email: string) => {
    setLoadingAnalytics(true);
    try {
      const response = await fetch(`/api/analytics/track?range=365d&userId=${email}`);
      const data = await response.json();
      if (data.success) {
        setAnalytics(data.analytics);
      } else {
        console.error('Failed to fetch analytics:', data.error);
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoadingAnalytics(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userEmail'); // Clear user session
    router.push('/login'); // Redirect to login page
  };

  const handleTestTracking = async () => {
    if (!userEmail) {
      alert('User email not found. Please log in.');
      return;
    }
    try {
      const response = await fetch('/api/analytics/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventType: 'click',
          userId: userEmail,
          data: { source: 'test_button_click' }
        }),
      });
      const data = await response.json();
      if (data.success) {
        alert('Test click tracked! Refreshing data...');
        fetchAnalytics(userEmail); // Re-fetch analytics after tracking
      } else {
        alert('Failed to track test click: ' + data.error);
      }
    } catch (error) {
      alert('Error tracking test click.');
    }
  };

  // Dummy data for daily performance chart (replace with actual data from analytics.dailyPerformance)
  const dailyPerformanceData = analytics.dailyPerformance.map(item => ({
    date: item.date,
    clicks: item.clicks,
    conversions: item.conversions,
    revenue: item.revenue
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-orange-600 to-black text-white">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm p-4 border-b border-orange-500/20">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">AFFILIFY</h1>
          <div className="flex items-center space-x-4">
            <span className="text-orange-200">Welcome, {userEmail.split('@')[0]}!</span>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-8">
        <h2 className="text-4xl font-bold mb-8">Welcome back, {userEmail.split('@')[0]}! 👋</h2>
        <p className="text-orange-200 text-lg mb-8">You have {analytics.totalWebsiteGenerations} websites generating ${analytics.totalRevenue.toFixed(2)} in revenue!</p>

        {/* Analytics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-purple-500/20 flex flex-col justify-between">
            <h3 className="text-purple-300 text-lg font-semibold mb-2">Total Websites</h3>
            <p className="text-4xl font-bold text-white">{analytics.totalWebsiteGenerations}</p>
            <p className="text-sm text-orange-200">0 active</p>
          </div>
          <div className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-purple-500/20 flex flex-col justify-between">
            <h3 className="text-purple-300 text-lg font-semibold mb-2">Total Clicks</h3>
            <p className="text-4xl font-bold text-white">{analytics.totalClicks}</p>
            <p className="text-sm text-orange-200">0 this week</p>
          </div>
          <div className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-purple-500/20 flex flex-col justify-between">
            <h3 className="text-purple-300 text-lg font-semibold mb-2">Revenue</h3>
            <p className="text-4xl font-bold text-white">${analytics.totalRevenue.toFixed(2)}</p>
            <p className="text-sm text-orange-200">$0.00 this week</p>
          </div>
          <div className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-purple-500/20 flex flex-col justify-between">
            <h3 className="text-purple-300 text-lg font-semibold mb-2">Conversion Rate</h3>
            <p className="text-4xl font-bold text-white">{analytics.conversionRate}%</p>
            <p className="text-sm text-orange-200">0 conversions</p>
          </div>
        </div>

        {/* Quick Actions */}
        <h3 className="text-2xl font-bold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Link href="/dashboard/create-website" className="bg-orange-600 hover:bg-orange-700 rounded-xl p-6 transition-all duration-200 transform group-hover:scale-105">
            <div className="flex items-center mb-3">
              <svg className="w-8 h-8 text-white mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <h4 className="text-xl font-semibold text-white">Create Website</h4>
            </div>
            <p className="text-orange-200">Generate a new affiliate website with AI</p>
          </Link>

          <Link href="/dashboard/analyze-website" className="bg-purple-600 hover:bg-purple-700 rounded-xl p-6 transition-all duration-200 transform group-hover:scale-105">
            <div className="flex items-center mb-3">
              <svg className="w-8 h-8 text-white mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <h4 className="text-xl font-semibold text-white">Analyze Website</h4>
            </div>
            <p className="text-purple-200">Get AI insights on any website</p>
          </Link>

          <Link href="/dashboard/my-websites" className="bg-green-600 hover:bg-green-700 rounded-xl p-6 transition-all duration-200 transform group-hover:scale-105">
            <div className="flex items-center mb-3">
              <svg className="w-8 h-8 text-white mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-1.25-3M3 5h18M3 12h18M3 19h18" />
              </svg>
              <h4 className="text-xl font-semibold text-white">My Websites</h4>
            </div>
            <p className="text-green-200">View and manage your affiliate sites</p>
          </Link>

          <button onClick={handleTestTracking} className="bg-blue-600 hover:bg-blue-700 rounded-xl p-6 transition-all duration-200 transform group-hover:scale-105 text-left">
            <div className="flex items-center mb-3">
              <svg className="w-8 h-8 text-white mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <h4 className="text-xl font-semibold text-white">Test Click Tracking</h4>
            </div>
            <p className="text-blue-200">Click to test real analytics</p>
          </button>
        </div>

        {/* Account Info */}
        <h3 className="text-2xl font-bold mb-4">Account Info</h3>
        <div className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-purple-500/20 grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <p className="text-purple-300 font-semibold">Email</p>
            <p className="text-white">{userEmail}</p>
          </div>
          <div>
            <p className="text-purple-300 font-semibold">Member Since</p>
            <p className="text-white">1/15/2024</p> {/* Placeholder, ideally fetched from user data */}
          </div>
          <div>
            <p className="text-purple-300 font-semibold">Last Active</p>
            {/* Use the state variable for currentTime */}
            <p className="text-white">{currentTime}</p>
          </div>
        </div>

        {/* Quick Stats */}
        <h3 className="text-2xl font-bold mb-4">Quick Stats</h3>
        <div className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-purple-500/20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <p className="text-purple-300 font-semibold">This Week:</p>
            <p className="text-white">${analytics.totalRevenue.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-purple-300 font-semibold">This Month:</p>
            <p className="text-white">${analytics.totalRevenue.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-purple-300 font-semibold">All Time:</p>
            <p className="text-white">${analytics.totalRevenue.toFixed(2)}</p>
          </div>
        </div>

        {/* Daily Performance Chart (Placeholder) */}
        <h3 className="text-2xl font-bold mt-8 mb-4">Daily Performance</h3>
        <div className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-purple-500/20">
          {loadingAnalytics ? (
            <p className="text-center text-orange-200">Loading daily performance data...</p>
          ) : dailyPerformanceData.length > 0 ? (
            <div className="h-64 flex items-center justify-center text-orange-200">
              {/* In a real app, you'd integrate a charting library like Recharts or Chart.js here */}
              <p>Chart will go here. Data points: {dailyPerformanceData.length}</p>
              {/* Example of how you might render data points */}
              {/* {dailyPerformanceData.map((day, index) => (
                <div key={index}>{day.date}: Clicks {day.clicks}, Conversions {day.conversions}</div>
              ))} */}
            </div>
          ) : (
            <p className="text-center text-orange-200">No daily performance data available yet. Track some events!</p>
          )}
        </div>
      </main>
    </div>
  );
}

