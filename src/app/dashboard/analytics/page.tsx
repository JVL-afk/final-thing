'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function AnalyticsPage() {
  const [analyticsData, setAnalyticsData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [dateRange, setDateRange] = useState('7d')
  const [selectedWebsite, setSelectedWebsite] = useState('all')

  useEffect(() => {
  }, [dateRange, selectedWebsite])

    try {
      const userEmail = localStorage.getItem('userEmail') || 'demo@user.com'
      const websiteParam = selectedWebsite !== 'all' ? `&websiteId=${selectedWebsite}` : ''
      
      const response = await fetch(`/api/analytics/track?range=${dateRange}${websiteParam}`, {
        headers: {
          'x-user-email': userEmail
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        setAnalyticsData(data.data)
      }
    } catch (error) {
      console.error('Failed to load analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  const testTracking = async () => {
    const userEmail = localStorage.getItem('userEmail') || 'demo@user.com'
    
    // Test click tracking
    await fetch('/api/analytics/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-user-email': userEmail
      },
      body: JSON.stringify({
        type: 'click',
        websiteId: 'test-website',
        productName: 'Test Product',
        affiliateUrl: 'https://example.com',
        timestamp: new Date( ).toISOString()
      })
    })
    
    // Test conversion tracking
    setTimeout(async () => {
      await fetch('/api/analytics/track', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-email': userEmail
        },
        body: JSON.stringify({
          type: 'conversion',
          websiteId: 'test-website',
          productName: 'Test Product',
          value: 29.99,
          currency: 'USD',
          timestamp: new Date().toISOString()
        })
      })
      
      // Reload data
    }, 1000)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-orange-600 to-black flex items-center justify-center">
        <div className="text-white text-xl">Loading analytics...</div>
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
              <Link href="/dashboard" className="text-orange-200 hover:text-white">
                ← Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Analytics Dashboard 📊
            </h1>
            <p className="text-orange-200">Real-time tracking and performance metrics</p>
          </div>
          
          <div className="flex space-x-4">
            <select 
              value={dateRange} 
              onChange={(e) => setDateRange(e.target.value)}
              className="bg-black/50 border border-orange-500/30 rounded-lg px-4 py-2 text-white"
            >
              <option value="1d">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
            </select>
            
            <button
              onClick={testTracking}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
            >
              Test Tracking
            </button>
          </div>
        </div>

        {/* Real Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-orange-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-200 text-sm font-medium">Total Clicks</p>
                <p className="text-3xl font-bold text-white">
                  {analyticsData?.totalClicks?.toLocaleString() || 0}
                </p>
                <p className="text-xs text-blue-400 mt-1">Real-time tracking</p>
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
                <p className="text-orange-200 text-sm font-medium">Conversions</p>
                <p className="text-3xl font-bold text-white">
                  {analyticsData?.totalConversions?.toLocaleString() || 0}
                </p>
                <p className="text-xs text-green-400 mt-1">Tracked sales</p>
              </div>
              <div className="bg-green-600 p-3 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-orange-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-200 text-sm font-medium">Revenue</p>
                <p className="text-3xl font-bold text-white">
                  ${analyticsData?.totalRevenue?.toFixed(2) || '0.00'}
                </p>
                <p className="text-xs text-green-400 mt-1">Total earnings</p>
              </div>
              <div className="bg-orange-600 p-3 rounded-lg">
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
                <p className="text-3xl font-bold text-white">
                  {analyticsData?.conversionRate?.toFixed(2) || '0.00'}%
                </p>
                <p className="text-xs text-purple-400 mt-1">Click to sale ratio</p>
              </div>
              <div className="bg-purple-600 p-3 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Daily Performance Chart */}
        <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-orange-500/20 mb-8">
          <h3 className="text-2xl font-bold text-white mb-6">Daily Performance</h3>
          
          {analyticsData?.dailyData?.length > 0 ? (
            <div className="space-y-4">
              {analyticsData.dailyData.map((day, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-black/20 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="text-orange-200 font-medium">
                      {new Date(day.date).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="text-center">
                      <div className="text-blue-400 text-sm">Clicks</div>
                      <div className="text-white font-bold">{day.clicks}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-green-400 text-sm">Conversions</div>
                      <div className="text-white font-bold">{day.conversions}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-orange-400 text-sm">Revenue</div>
                      <div className="text-white font-bold">${day.revenue.toFixed(2)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-orange-200 text-lg mb-4">No data yet</div>
              <p className="text-gray-400">Start tracking clicks and conversions to see your analytics here!</p>
              <button
                onClick={testTracking}
                className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg"
              >
                Generate Test Data
              </button>
            </div>
          )}
        </div>

        {/* Integration Instructions */}
        <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-orange-500/20">
          <h3 className="text-2xl font-bold text-white mb-6">Integration Guide</h3>
          
          <div className="space-y-4">
            <div className="bg-black/20 rounded-lg p-4">
              <h4 className="text-lg font-bold text-white mb-2">Track Clicks</h4>
              <code className="text-green-400 text-sm">
                window.AFFILIFY.trackClick('website-id', 'Product Name', 'https://affiliate-link.com' )
              </code>
            </div>
            
            <div className="bg-black/20 rounded-lg p-4">
              <h4 className="text-lg font-bold text-white mb-2">Track Conversions</h4>
              <code className="text-green-400 text-sm">
                window.AFFILIFY.trackConversion('website-id', 'Product Name', 29.99)
              </code>
            </div>
            
            <div className="bg-black/20 rounded-lg p-4">
              <p className="text-orange-200 text-sm">
                💡 <strong>Pro Tip:</strong> Add these tracking calls to your affiliate website buttons and checkout confirmations for real-time analytics!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

