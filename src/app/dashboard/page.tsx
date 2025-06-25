'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function DashboardPage() {
  const [userData, setUserData] = useState({
    name: 'User',
    email: 'user@example.com',
    totalWebsites: 0,
    activeSites: 0,
    totalClicks: 0,
    revenue: 0,
    createdAt: new Date().toISOString(),
    lastActive: new Date().toISOString(),
    analytics: {
      allTime: {
        clicks: 0,
        conversions: 0,
        revenue: 0,
        conversionRate: 0,
      },
      last7Days: {
        clicks: 0,
        conversions: 0,
        revenue: 0,
      },
      last30Days: {
        clicks: 0,
        conversions: 0,
        revenue: 0,
      },
    },
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching user data and analytics
    const fetchUserData = async () => {
      setLoading(true)
      try {
        // In a real app, you'd fetch this from your backend
        const email = localStorage.getItem('userEmail') || 'demo@user.com' // Use stored email or default
        
        // Simulate fetching user details
        const userResponse = await new Promise(resolve => setTimeout(() => {
          resolve({
            name: 'John Doe', // Replace with actual user name from DB
            email: email,
            createdAt: '2024-01-15T10:00:00Z',
            lastActive: new Date().toISOString(),
          })
        }, 500))

        // Simulate fetching analytics data
        const analyticsResponse = await fetch(`/api/analytics/track?range=365d`, { // Fetch all-time data
          headers: {
            'x-user-email': email
          }
        })
        const analyticsData = await analyticsResponse.json()

        if (analyticsData.success) {
          const allTime = analyticsData.data
          
          // Simulate website count (can be fetched from a separate API)
          const simulatedWebsites = Math.floor(Math.random() * 5) + 1 // 1 to 5 websites
          const simulatedActiveSites = Math.floor(Math.random() * simulatedWebsites)

          setUserData({
            ...userResponse,
            totalWebsites: simulatedWebsites,
            activeSites: simulatedActiveSites,
            totalClicks: allTime.totalClicks,
            revenue: allTime.totalRevenue,
            analytics: {
              allTime: {
                clicks: allTime.totalClicks,
                conversions: allTime.totalConversions,
                revenue: allTime.totalRevenue,
                conversionRate: allTime.conversionRate,
              },
              last7Days: allTime.dailyData.slice(-7).reduce((acc, day) => ({
                clicks: acc.clicks + day.clicks,
                conversions: acc.conversions + day.conversions,
                revenue: acc.revenue + day.revenue,
              }), { clicks: 0, conversions: 0, revenue: 0 }),
              last30Days: allTime.dailyData.slice(-30).reduce((acc, day) => ({
                clicks: acc.clicks + day.clicks,
                conversions: acc.conversions + day.conversions,
                revenue: acc.revenue + day.revenue,
              }), { clicks: 0, conversions: 0, revenue: 0 }),
            },
          })
        }
      } catch (error) {
        console.error('Failed to fetch user data or analytics:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])

  const trackAction = (type, data) => {
    if (typeof window !== 'undefined' && window.AFFILIFY) {
      if (type === 'track_click') {
        window.AFFILIFY.trackClick(data.websiteId, 'Demo Product', 'https://example.com/demo-affiliate-link' )
      } else if (type === 'track_conversion') {
        window.AFFILIFY.trackConversion(data.websiteId, 'Demo Product', data.amount)
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-orange-600 to-black flex items-center justify-center">
        <div className="text-white text-xl">Loading dashboard...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-orange-600 to-black">
      {/* Navigation */}
      <nav className="bg-black/20 backdrop-blur-sm border-b border-orange-500/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-white">
              AFFILIFY
            </Link>
            <div className="flex items-center space-x-4">
              <span className="text-orange-200">Welcome, {userData.name}!</span>
              <button 
                onClick={() => {
                  localStorage.removeItem('userEmail')
                  window.location.href = '/login'
                }}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome back, {userData.name}! 👋
          </h1>
          <p className="text-orange-200 text-lg">
            {userData.totalWebsites === 0 
              ? "Ready to create your first affiliate website?" 
              : `You have ${userData.totalWebsites} websites generating $${userData.revenue.toFixed(2)} in revenue!`
            }
          </p>
        </div>

        {/* Real Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-orange-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-200 text-sm font-medium">Total Websites</p>
                <p className="text-3xl font-bold text-white">{userData.totalWebsites}</p>
                <p className="text-xs text-green-400 mt-1">
                  {userData.totalWebsites > 0 ? `${userData.activeSites} active` : 'Start creating!'}
                </p>
              </div>
              <div className="bg-purple-600 p-3 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-orange-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-200 text-sm font-medium">Total Clicks</p>
                <p className="text-3xl font-bold text-white">{userData.totalClicks.toLocaleString()}</p>
                <p className="text-xs text-blue-400 mt-1">
                  {userData.analytics.last7Days.clicks} this week
                </p>
              </div>
              <div className="bg-blue-600 p-3 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-orange-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-200 text-sm font-medium">Revenue</p>
                <p className="text-3xl font-bold text-white">${userData.revenue.toFixed(2)}</p>
                <p className="text-xs text-green-400 mt-1">
                  ${userData.analytics.last7Days.revenue.toFixed(2)} this week
                </p>
              </div>
              <div className="bg-green-600 p-3 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-orange-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-200 text-sm font-medium">Conversion Rate</p>
                <p className="text-3xl font-bold text-white">{userData.analytics.allTime.conversionRate.toFixed(2)}%</p>
                <p className="text-xs text-purple-400 mt-1">
                  {userData.analytics.allTime.conversions} conversions
                </p>
              </div>
              <div className="bg-purple-600 p-3 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-orange-500/20">
              <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/dashboard/create-website" className="group">
                  <div className="bg-purple-600 hover:bg-purple-700 rounded-xl p-6 transition-all duration-200 transform group-hover:scale-105">
                    <div className="flex items-center mb-3">
                      <svg className="w-8 h-8 text-white mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      <h3 className="text-xl font-bold text-white">Create Website</h3>
                    </div>
                    <p className="text-purple-100">Generate a new affiliate website with AI</p>
                  </div>
                </Link>

                <Link href="/dashboard/analyze-website" className="group">
                  <div className="bg-blue-600 hover:bg-blue-700 rounded-xl p-6 transition-all duration-200 transform group-hover:scale-105">
                    <div className="flex items-center mb-3">
                      <svg className="w-8 h-8 text-white mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      <h3 className="text-xl font-bold text-white">Analyze Website</h3>
                    </div>
                    <p className="text-blue-100">Get AI insights on any website</p>
                  </div>
                </Link>

                <Link href="/dashboard/my-websites" className="group">
                  <div className="bg-orange-600 hover:bg-orange-700 rounded-xl p-6 transition-all duration-200 transform group-hover:scale-105">
                    <div className="flex items-center mb-3">
                      <svg className="w-8 h-8 text-white mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                      <h3 className="text-xl font-bold text-white">My Websites</h3>
                    </div>
                    <p className="text-orange-100">View and manage your affiliate sites</p>
                  </div>
                </Link>

                <button 
                  onClick={() => trackAction('track_click', { websiteId: 'demo', source: 'dashboard' })}
                  className="group bg-blue-600 hover:bg-blue-700 rounded-xl p-6 transition-all duration-200 transform group-hover:scale-105"
                >
                  <div className="flex items-center mb-3">
                    <svg className="w-8 h-8 text-white mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <h3 className="text-xl font-bold text-white">Test Click Tracking</h3>
                  </div>
                  <p className="text-blue-100">Click to test real analytics</p>
                </button>

                <button 
                  onClick={() => trackAction('track_conversion', { websiteId: 'demo', amount: 25.99 })}
                  className="group bg-green-600 hover:bg-green-700 rounded-xl p-6 transition-all duration-200 transform group-hover:scale-105"
                >
                  <div className="flex items-center mb-3">
                    <svg className="w-8 h-8 text-white mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                    <h3 className="text-xl font-bold text-white">Test Conversion</h3>
                  </div>
                  <p className="text-green-100">Simulate a $25.99 sale</p>
                </button>
              </div>
            </div>
          </div>

          {/* User Info */}
          <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-orange-500/20">
            <h2 className="text-2xl font-bold text-white mb-6">Account Info</h2>
            
            <div className="space-y-4">
              <div>
                <p className="text-orange-200 text-sm">Email</p>
                <p className="text-white font-medium">{userData.email}</p>
              </div>
              
              <div>
                <p className="text-orange-200 text-sm">Member Since</p>
                <p className="text-white font-medium">
                  {new Date(userData.createdAt).toLocaleDateString()}
                </p>
              </div>
              
              <div>
                <p className="text-orange-200 text-sm">Last Active</p>
                <p className="text-white font-medium">
                  {new Date(userData.lastActive).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-orange-500/20">
              <h3 className="text-lg font-bold text-white mb-4">Quick Stats</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-orange-200">This Week:</span>
                  <span className="text-white">${userData.analytics.last7Days.revenue.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-orange-200">This Month:</span>
                  <span className="text-white">${userData.analytics.last30Days.revenue.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-orange-200">All Time:</span>
                  <span className="text-white font-bold">${userData.analytics.allTime.revenue.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

