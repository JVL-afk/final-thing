'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'

export default function MyWebsitesPage() {
  const [websites] = useState([
    {
      id: 1,
      name: "TechReviews Pro",
      url: "techreviews-pro.affilify.com",
      status: "Live",
      visitors: {
        today: "341",
        week: "2,341",
        month: "12,456"
      },
      revenue: {
        today: "$67",
        week: "$456",
        month: "$2,134"
      },
      conversionRate: "3.2%",
      created: "2 days ago",
      lastUpdated: "1 hour ago",
      affiliateLink: "https://amazon.com/dp/B123456789",
      traffic: [
        { date: "Mon", visitors: 234, revenue: 45 },
        { date: "Tue", visitors: 345, revenue: 67 },
        { date: "Wed", visitors: 456, revenue: 89 },
        { date: "Thu", visitors: 567, revenue: 123 },
        { date: "Fri", visitors: 678, revenue: 156 },
        { date: "Sat", visitors: 789, revenue: 189 },
        { date: "Sun", visitors: 890, revenue: 234 }
      ]
    },
    {
      id: 2,
      name: "Fitness Gear Hub",
      url: "fitness-gear.affilify.com", 
      status: "Live",
      visitors: {
        today: "198",
        week: "1,876",
        month: "8,234"
      },
      revenue: {
        today: "$34",
        week: "$298",
        month: "$1,456"
      },
      conversionRate: "2.8%",
      created: "1 week ago",
      lastUpdated: "3 hours ago",
      affiliateLink: "https://clickbank.com/affiliate/fitness123",
      traffic: [
        { date: "Mon", visitors: 156, revenue: 28 },
        { date: "Tue", visitors: 234, revenue: 45 },
        { date: "Wed", visitors: 298, revenue: 56 },
        { date: "Thu", visitors: 345, revenue: 67 },
        { date: "Fri", visitors: 456, revenue: 89 },
        { date: "Sat", visitors: 567, revenue: 123 },
        { date: "Sun", visitors: 678, revenue: 156 }
      ]
    },
    {
      id: 3,
      name: "Gaming Setup Guide",
      url: "gaming-setup.affilify.com",
      status: "Draft",
      visitors: {
        today: "0",
        week: "0",
        month: "0"
      },
      revenue: {
        today: "$0",
        week: "$0",
        month: "$0"
      },
      conversionRate: "0%",
      created: "3 hours ago",
      lastUpdated: "1 hour ago",
      affiliateLink: "https://newegg.com/affiliate/gaming456",
      traffic: []
    }
  ])

  const [selectedWebsite, setSelectedWebsite] = useState(null)

  const handleViewWebsite = (website) => {
    window.open(`https://${website.url}`, '_blank')
  }

  const handleEditWebsite = (website) => {
    alert(`Editing ${website.name}... 🛠️`)
  }

  const handleDeleteWebsite = (website) => {
    if (confirm(`Are you sure you want to delete ${website.name}?`)) {
      alert(`${website.name} deleted! 🗑️`)
    }
  }

  const handleViewDetails = (website) => {
    setSelectedWebsite(selectedWebsite?.id === website.id ? null : website)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-900 via-orange-800 to-black">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-4">My Websites</h1>
            <p className="text-xl text-orange-200">Manage and track all your affiliate websites</p>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="dashboard-card text-center">
              <div className="text-3xl font-bold text-orange-400 mb-2">{websites.length}</div>
              <div className="text-white">Total Websites</div>
            </div>
            <div className="dashboard-card text-center">
              <div className="text-3xl font-bold text-orange-400 mb-2">
                {websites.filter(w => w.status === 'Live').length}
              </div>
              <div className="text-white">Live Websites</div>
            </div>
            <div className="dashboard-card text-center">
              <div className="text-3xl font-bold text-orange-400 mb-2">
                {websites.reduce((sum, w) => sum + parseInt(w.visitors.today.replace(',', '')), 0).toLocaleString()}
              </div>
              <div className="text-white">Today's Visitors</div>
            </div>
            <div className="dashboard-card text-center">
              <div className="text-3xl font-bold text-orange-400 mb-2">
                ${websites.reduce((sum, w) => sum + parseFloat(w.revenue.today.replace('$', '')), 0).toFixed(0)}
              </div>
              <div className="text-white">Today's Revenue</div>
            </div>
          </div>

          {/* Create New Website Button */}
          <div className="text-center mb-8">
            <Link href="/dashboard/create-website">
              <button className="dashboard-button-create">
                + CREATE NEW WEBSITE
              </button>
            </Link>
          </div>

          {/* Websites List */}
          <div className="space-y-6">
            {websites.map((website) => (
              <div key={website.id} className="dashboard-card">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4">
                  <div className="mb-4 lg:mb-0">
                    <div className="flex items-center mb-2">
                      <h3 className="text-2xl font-semibold text-white mr-4">{website.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        website.status === 'Live' 
                          ? 'bg-green-500 text-white' 
                          : 'bg-yellow-500 text-black'
                      }`}>
                        {website.status}
                      </span>
                    </div>
                    <p className="text-orange-200 mb-1">{website.url}</p>
                    <p className="text-sm text-gray-300">Created {website.created} • Updated {website.lastUpdated}</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => handleViewDetails(website)}
                      className="dashboard-button text-sm"
                    >
                      {selectedWebsite?.id === website.id ? 'Hide Details' : 'View Details'}
                    </button>
                    <button
                      onClick={() => handleViewWebsite(website)}
                      className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 text-sm"
                      disabled={website.status !== 'Live'}
                    >
                      Visit Site
                    </button>
                    <button
                      onClick={() => handleEditWebsite(website)}
                      className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteWebsite(website)}
                      className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-orange-400">{website.visitors.today}</div>
                    <div className="text-sm text-gray-300">Today</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-orange-400">{website.visitors.week}</div>
                    <div className="text-sm text-gray-300">This Week</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-400">{website.revenue.today}</div>
                    <div className="text-sm text-gray-300">Today</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-400">{website.conversionRate}</div>
                    <div className="text-sm text-gray-300">Conversion</div>
                  </div>
                </div>

                {/* Detailed View */}
                {selectedWebsite?.id === website.id && (
                  <div className="border-t border-white border-opacity-20 pt-6 mt-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Traffic Chart */}
                      <div className="bg-white bg-opacity-5 rounded-lg p-4">
                        <h4 className="text-lg font-bold text-white mb-4">📈 7-Day Traffic</h4>
                        {website.traffic.length > 0 ? (
                          <div className="space-y-2">
                            {website.traffic.map((day, index) => (
                              <div key={index} className="flex justify-between items-center">
                                <span className="text-orange-200">{day.date}</span>
                                <div className="flex items-center space-x-4">
                                  <span className="text-white">{day.visitors} visitors</span>
                                  <span className="text-green-400">${day.revenue}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-400">No traffic data yet</p>
                        )}
                      </div>

                      {/* Website Details */}
                      <div className="bg-white bg-opacity-5 rounded-lg p-4">
                        <h4 className="text-lg font-bold text-white mb-4">🔗 Website Details</h4>
                        <div className="space-y-3">
                          <div>
                            <span className="text-orange-200">Affiliate Link:</span>
                            <p className="text-white text-sm break-all">{website.affiliateLink}</p>
                          </div>
                          <div>
                            <span className="text-orange-200">Monthly Visitors:</span>
                            <span className="text-white ml-2">{website.visitors.month}</span>
                          </div>
                          <div>
                            <span className="text-orange-200">Monthly Revenue:</span>
                            <span className="text-green-400 ml-2">{website.revenue.month}</span>
                          </div>
                          <div>
                            <span className="text-orange-200">Conversion Rate:</span>
                            <span className="text-blue-400 ml-2">{website.conversionRate}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {websites.length === 0 && (
            <div className="dashboard-card text-center py-12">
              <div className="text-6xl mb-4">🚀</div>
              <h3 className="text-2xl font-bold text-white mb-4">No websites yet!</h3>
              <p className="text-orange-200 mb-6">Create your first affiliate website and start earning money today.</p>
              <Link href="/dashboard/create-website">
                <button className="dashboard-button">
                  Create Your First Website
                </button>
              </Link>
            </div>
          )}

          {/* Back to Dashboard */}
          <div className="text-center mt-8">
            <Link href="/dashboard">
              <button className="dashboard-button">
                ← Back to Dashboard
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
