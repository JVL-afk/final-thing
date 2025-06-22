'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalWebsites: 0,
    totalAnalyses: 0,
    totalClicks: 0,
    revenue: 0
  })

  useEffect(() => {
    // Fetch dashboard stats
    fetchDashboardStats()
  }, [])

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch('/api/dashboard')
      const data = await response.json()
      setStats(data)
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    }
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8">
          Welcome to Your AFFILIFY Dashboard 🚀
        </h1>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-2">Total Websites</h3>
            <p className="text-3xl font-bold text-green-400">{stats.totalWebsites}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-2">Analyses Done</h3>
            <p className="text-3xl font-bold text-blue-400">{stats.totalAnalyses}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-2">Total Clicks</h3>
            <p className="text-3xl font-bold text-yellow-400">{stats.totalClicks}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-2">Revenue</h3>
            <p className="text-3xl font-bold text-red-400">${stats.revenue}</p>
          </div>
        </div>

        {/* Main Action Buttons */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Link href="/dashboard/create-website">
            <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-lg p-8 text-center hover:scale-105 transition-transform cursor-pointer">
              <div className="text-6xl mb-4">🌐</div>
              <h2 className="text-2xl font-bold text-white mb-2">CREATE A NEW WEBSITE</h2>
              <p className="text-red-100">Generate a professional affiliate website with AI</p>
            </div>
          </Link>

          <Link href="/dashboard/analyze-website">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-8 text-center hover:scale-105 transition-transform cursor-pointer">
              <div className="text-6xl mb-4">📊</div>
              <h2 className="text-2xl font-bold text-white mb-2">ANALYZE A WEBSITE</h2>
              <p className="text-blue-100">Get detailed insights and optimization suggestions</p>
            </div>
          </Link>
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-2 gap-6">
          <Link href="/dashboard/my-websites" className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-colors">
            <h3 className="text-xl font-semibold text-white mb-2">📁 My Websites</h3>
            <p className="text-gray-300">View and manage all your generated websites</p>
          </Link>

          <Link href="/dashboard/my-analyses" className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-colors">
            <h3 className="text-xl font-semibold text-white mb-2">📈 My Analyses</h3>
            <p className="text-gray-300">Review your website analysis reports</p>
          </Link>
        </div>
      </div>
    </div>
  )
}
