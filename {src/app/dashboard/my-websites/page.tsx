'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Link from 'next/link'

export default function MyWebsites() {
  const [websites, setWebsites] = useState([
    {
      id: '1',
      title: 'Tech Gadgets Hub',
      url: 'https://tech-gadgets-hub.netlify.app',
      niche: 'Technology',
      created: '2024-06-20',
      clicks: 245,
      revenue: 89.50,
      status: 'active'
    },
    {
      id: '2',
      title: 'Fitness Equipment Pro',
      url: 'https://fitness-equipment-pro.netlify.app',
      niche: 'Fitness',
      created: '2024-06-19',
      clicks: 189,
      revenue: 156.30,
      status: 'active'
    },
    {
      id: '3',
      title: 'Home Decor Essentials',
      url: 'https://home-decor-essentials.netlify.app',
      niche: 'Home & Garden',
      created: '2024-06-18',
      clicks: 312,
      revenue: 203.75,
      status: 'active'
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('created')

  const filteredWebsites = websites
    .filter(website => 
      website.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      website.niche.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'revenue') return b.revenue - a.revenue
      if (sortBy === 'clicks') return b.clicks - a.clicks
      return new Date(b.created).getTime() - new Date(a.created).getTime()
    })

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">📁 My Websites</h1>
          <Link 
            href="/dashboard/create-website"
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold btn-hover"
          >
            + Create New Website
          </Link>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Search websites..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:border-red-500 focus:outline-none"
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 rounded-lg bg-white/20 text-white border border-white/30 focus:border-red-500 focus:outline-none"
          >
            <option value="created">Sort by Date</option>
            <option value="revenue">Sort by Revenue</option>
            <option value="clicks">Sort by Clicks</option>
          </select>
        </div>

        {/* Websites Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWebsites.map((website) => (
            <div key={website.id} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-white">{website.title}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  website.status === 'active' ? 'bg-green-500/20 text-green-200' : 'bg-gray-500/20 text-gray-200'
                }`}>
                  {website.status}
                </span>
              </div>
              
              <p className="text-gray-300 mb-4">Niche: {website.niche}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-400">Clicks</p>
                  <p className="text-lg font-bold text-blue-400">{website.clicks}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Revenue</p>
                  <p className="text-lg font-bold text-green-400">${website.revenue}</p>
                </div>
              </div>
              
              <p className="text-sm text-gray-400 mb-4">Created: {website.created}</p>
              
              <div className="flex gap-2">
                <a 
                  href={website.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-center text-sm font-semibold"
                >
                  View Site
                </a>
                <button className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg text-sm font-semibold">
                  Analytics
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredWebsites.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No websites found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  )
}
