'use client'

import Link from 'next/link'
import { useState } from 'react'
import Navbar from '@/components/Navbar'

export default function DashboardPage() {
  const [websites] = useState([
    {
      id: 1,
      name: "TechReviews Pro",
      url: "techreviews-pro.affilify.com",
      status: "Live",
      visitors: "2,341",
      revenue: "$1,234",
      created: "2 days ago"
    },
    {
      id: 2,
      name: "Fitness Gear Hub",
      url: "fitness-gear.affilify.com", 
      status: "Live",
      visitors: "1,876",
      revenue: "$892",
      created: "1 week ago"
    }
  ])

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-900 via-orange-800 to-black">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Dashboard Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">Dashboard</h1>
          <p className="text-xl text-orange-200">Manage your affiliate empire</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="dashboard-card text-center">
            <div className="text-3xl font-bold text-orange-400 mb-2">{websites.length}</div>
            <div className="text-white">Active Websites</div>
          </div>
          <div className="dashboard-card text-center">
            <div className="text-3xl font-bold text-orange-400 mb-2">4,217</div>
            <div className="text-white">Total Visitors</div>
          </div>
          <div className="dashboard-card text-center">
            <div className="text-3xl font-bold text-orange-400 mb-2">$2,126</div>
            <div className="text-white">Total Revenue</div>
          </div>
          <div className="dashboard-card text-center">
            <div className="text-3xl font-bold text-orange-400 mb-2">12.3%</div>
            <div className="text-white">Conversion Rate</div>
          </div>
        </div>

        {/* Main Action Buttons */}
        <div className="flex flex-col md:flex-row gap-6 justify-center mb-12">
          <Link href="/dashboard/create-website">
            <button className="dashboard-button-create">
              CREATE A NEW WEBSITE
            </button>
          </Link>
          <Link href="/dashboard/analytics">
            <button className="dashboard-button-analyze">
              ANALYZE A WEBSITE
            </button>
          </Link>
        </div>

        {/* My Websites Section */}
        <div className="dashboard-card">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-white">My Websites</h2>
            <Link href="/dashboard/my-websites">
              <button className="dashboard-button">
                View All
              </button>
            </Link>
          </div>

          <div className="grid gap-4">
            {websites.map((website) => (
              <div key={website.id} className="bg-white bg-opacity-5 rounded-lg p-6 border border-white border-opacity-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                  <div className="mb-4 md:mb-0">
                    <h3 className="text-xl font-semibold text-white mb-2">{website.name}</h3>
                    <p className="text-orange-200 mb-1">{website.url}</p>
                    <p className="text-sm text-gray-300">Created {website.created}</p>
                  </div>
                  <div className="flex flex-col md:flex-row gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-orange-400">{website.visitors}</div>
                      <div className="text-sm text-gray-300">Visitors</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-green-400">{website.revenue}</div>
                      <div className="text-sm text-gray-300">Revenue</div>
                    </div>
                    <div>
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                        {website.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {websites.length === 0 && (
            <div className="text-center py-12">
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
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <Link href="/dashboard/analytics">
            <div className="dashboard-card hover:bg-white hover:bg-opacity-15 transition-all duration-300 cursor-pointer">
              <div className="text-center">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-xl font-bold text-white mb-2">Analytics</h3>
                <p className="text-orange-200">Track your website performance</p>
              </div>
            </div>
          </Link>
          
          <Link href="/pricing">
            <div className="dashboard-card hover:bg-white hover:bg-opacity-15 transition-all duration-300 cursor-pointer">
              <div className="text-center">
                <div className="text-4xl mb-4">⭐</div>
                <h3 className="text-xl font-bold text-white mb-2">Upgrade Plan</h3>
                <p className="text-orange-200">Unlock more features</p>
              </div>
            </div>
          </Link>
          
          <Link href="/docs">
            <div className="dashboard-card hover:bg-white hover:bg-opacity-15 transition-all duration-300 cursor-pointer">
              <div className="text-center">
                <div className="text-4xl mb-4">📚</div>
                <h3 className="text-xl font-bold text-white mb-2">Documentation</h3>
                <p className="text-orange-200">Learn how to maximize profits</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

