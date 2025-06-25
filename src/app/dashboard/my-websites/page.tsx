'use client'
import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'

export default function MyWebsitesPage() {
  const [websites] = useState([
    {
      id: 1,
      title: 'TechReviews Pro',
      url: 'techreviews-pro.com',
      category: 'Electronics & Gadgets',
      status: 'active',
      created: '2024-06-15',
      clicks: 1247,
      revenue: 234.50,
      conversionRate: 3.2,
      template: 'modern-reviews',
      lastUpdated: '2 hours ago'
    },
    {
      id: 2,
      title: 'Fashion Finds',
      url: 'fashion-finds.net',
      category: 'Clothing & Accessories',
      status: 'active',
      created: '2024-06-10',
      clicks: 892,
      revenue: 189.25,
      conversionRate: 2.8,
      template: 'lifestyle-blog',
      lastUpdated: '1 day ago'
    },
    {
      id: 3,
      title: 'Home & Garden Hub',
      url: 'homegardenHub.org',
      category: 'Home Improvement',
      status: 'draft',
      created: '2024-06-20',
      clicks: 634,
      revenue: 156.75,
      conversionRate: 4.1,
      template: 'product-showcase',
      lastUpdated: '3 days ago'
    },
    {
      id: 4,
      title: 'Fitness Gear Central',
      url: 'fitnessgear-central.com',
      category: 'Health & Fitness',
      status: 'active',
      created: '2024-06-05',
      clicks: 1456,
      revenue: 312.80,
      conversionRate: 3.7,
      template: 'fitness-focused',
      lastUpdated: '5 hours ago'
    },
    {
      id: 5,
      title: 'Gaming Paradise',
      url: 'gaming-paradise.net',
      category: 'Gaming & Entertainment',
      status: 'paused',
      created: '2024-06-12',
      clicks: 723,
      revenue: 98.40,
      conversionRate: 2.1,
      template: 'gaming-theme',
      lastUpdated: '1 week ago'
    }
  ])

  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'
  const [filterStatus, setFilterStatus] = useState('all')

  const filteredWebsites = websites.filter(site => 
    filterStatus === 'all' || site.status === filterStatus
  )

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-green-600'
      case 'draft': return 'bg-yellow-600'
      case 'paused': return 'bg-red-600'
      default: return 'bg-gray-600'
    }
  }

  const getStatusIcon = (status) => {
    switch(status) {
      case 'active': return '🟢'
      case 'draft': return '🟡'
      case 'paused': return '🔴'
      default: return '⚪'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-600 via-orange-700 to-black">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link href="/dashboard" className="text-purple-400 hover:text-purple-300 transition-colors mb-4 inline-flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Dashboard
            </Link>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">
                  My Websites 🌐
                </h1>
                <p className="text-orange-200 text-lg">
                  Manage and track your affiliate websites
                </p>
              </div>
              <Link 
                href="/dashboard/create-website"
                className="mt-4 md:mt-0 bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-purple-800 transition-all duration-200 inline-flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Create New Website
              </Link>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-orange-500/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Total Websites</p>
                  <p className="text-3xl font-bold text-white">{websites.length}</p>
                </div>
                <div className="bg-purple-600 p-3 rounded-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-orange-500/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Active Sites</p>
                  <p className="text-3xl font-bold text-white">{websites.filter(w => w.status === 'active').length}</p>
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
                  <p className="text-gray-300 text-sm">Total Clicks</p>
                  <p className="text-3xl font-bold text-white">{websites.reduce((sum, w) => sum + w.clicks, 0).toLocaleString()}</p>
                </div>
                <div className="bg-blue-600 p-3 rounded-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-orange-500/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Total Revenue</p>
                  <p className="text-3xl font-bold text-white">${websites.reduce((sum, w) => sum + w.revenue, 0).toFixed(2)}</p>
                </div>
                <div className="bg-orange-600 p-3 rounded-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Filters and View Controls */}
          <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-orange-500/20 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex items-center space-x-4 mb-4 md:mb-0">
                <div>
                  <label className="text-gray-300 text-sm mr-2">Filter by status:</label>
                  <select 
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="bg-black/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                  >
                    <option value="all">All Websites</option>
                    <option value="active">Active</option>
                    <option value="draft">Draft</option>
                    <option value="paused">Paused</option>
                  </select>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-gray-300 text-sm">View:</span>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === 'grid' 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-black/20 text-gray-400 hover:text-white'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === 'list' 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-black/20 text-gray-400 hover:text-white'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Websites Grid/List */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredWebsites.map((website) => (
                <div key={website.id} className="bg-black/30 backdrop-blur-sm rounded-xl border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300">
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-white mb-1">{website.title}</h3>
                        <p className="text-gray-400 text-sm">{website.url}</p>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-semibold text-white ${getStatusColor(website.status)}`}>
                        {getStatusIcon(website.status)} {website.status.toUpperCase()}
                      </div>
                    </div>

                    {/* Category */}
                    <div className="mb-4">
                      <span className="bg-purple-600/20 text-purple-300 px-2 py-1 rounded text-xs">
                        {website.category}
                      </span>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <p className="text-gray-400 text-xs">Clicks</p>
                        <p className="text-white font-semibold">{website.clicks.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs">Revenue</p>
                        <p className="text-green-400 font-semibold">${website.revenue}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs">Conversion</p>
                        <p className="text-white font-semibold">{website.conversionRate}%</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs">Updated</p>
                        <p className="text-white font-semibold text-xs">{website.lastUpdated}</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2">
                      <button className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 px-3 rounded-lg text-sm font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200">
                        View
                      </button>
                      <button className="flex-1 bg-gradient-to-r from-orange-600 to-orange-700 text-white py-2 px-3 rounded-lg text-sm font-semibold hover:from-orange-700 hover:to-orange-800 transition-all duration-200">
                        Edit
                      </button>
                      <button className="bg-gray-600 text-white py-2 px-3 rounded-lg text-sm hover:bg-gray-700 transition-all duration-200">
                        ⚙️
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-black/30 backdrop-blur-sm rounded-xl border border-orange-500/20">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-600/30">
                      <th className="text-left p-4 text-gray-300 font-semibold">Website</th>
                      <th className="text-left p-4 text-gray-300 font-semibold">Status</th>
                      <th className="text-left p-4 text-gray-300 font-semibold">Clicks</th>
                      <th className="text-left p-4 text-gray-300 font-semibold">Revenue</th>
                      <th className="text-left p-4 text-gray-300 font-semibold">Conversion</th>
                      <th className="text-left p-4 text-gray-300 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredWebsites.map((website) => (
                      <tr key={website.id} className="border-b border-gray-600/20 hover:bg-black/20 transition-all duration-200">
                        <td className="p-4">
                          <div>
                            <h3 className="text-white font-semibold">{website.title}</h3>
                            <p className="text-gray-400 text-sm">{website.url}</p>
                            <span className="bg-purple-600/20 text-purple-300 px-2 py-1 rounded text-xs mt-1 inline-block">
                              {website.category}
                            </span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className={`px-2 py-1 rounded-full text-xs font-semibold text-white ${getStatusColor(website.status)} inline-block`}>
                            {getStatusIcon(website.status)} {website.status.toUpperCase()}
                          </div>
                        </td>
                        <td className="p-4 text-white font-semibold">{website.clicks.toLocaleString()}</td>
                        <td className="p-4 text-green-400 font-semibold">${website.revenue}</td>
                        <td className="p-4 text-white font-semibold">{website.conversionRate}%</td>
                        <td className="p-4">
                          <div className="flex space-x-2">
                            <button className="bg-blue-600 text-white py-1 px-3 rounded text-sm hover:bg-blue-700 transition-all duration-200">
                              View
                            </button>
                            <button className="bg-orange-600 text-white py-1 px-3 rounded text-sm hover:bg-orange-700 transition-all duration-200">
                              Edit
                            </button>
                            <button className="bg-gray-600 text-white py-1 px-2 rounded text-sm hover:bg-gray-700 transition-all duration-200">
                              ⚙️
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

