'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Link from 'next/link'

export default function MyAnalyses() {
  const [analyses, setAnalyses] = useState([
    {
      id: '1',
      url: 'https://competitor-tech-site.com',
      title: 'Tech Competitor Analysis',
      score: 87,
      analyzed: '2024-06-21',
      insights: 5,
      recommendations: 8
    },
    {
      id: '2',
      url: 'https://fitness-authority.com',
      title: 'Fitness Authority Review',
      score: 92,
      analyzed: '2024-06-20',
      insights: 7,
      recommendations: 6
    },
    {
      id: '3',
      url: 'https://home-design-pro.com',
      title: 'Home Design Analysis',
      score: 78,
      analyzed: '2024-06-19',
      insights: 4,
      recommendations: 9
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')

  const filteredAnalyses = analyses.filter(analysis => 
    analysis.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    analysis.url.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">📈 My Analyses</h1>
          <Link 
            href="/dashboard/analyze-website"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold btn-hover"
          >
            + Analyze New Website
          </Link>
        </div>

        {/* Search */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search analyses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* Analyses List */}
        <div className="space-y-6">
          {filteredAnalyses.map((analysis) => (
            <div key={analysis.id} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-colors">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{analysis.title}</h3>
                  <p className="text-blue-400 hover:text-blue-300">
                    <a href={analysis.url} target="_blank" rel="noopener noreferrer">
                      {analysis.url}
                    </a>
                  </p>
                </div>
                <div className="text-right mt-4 md:mt-0">
                  <div className="text-3xl font-bold text-white mb-1">{analysis.score}/100</div>
                  <div className="text-sm text-gray-400">Overall Score</div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-400">Analyzed</p>
                  <p className="text-white font-semibold">{analysis.analyzed}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Insights</p>
                  <p className="text-green-400 font-semibold">{analysis.insights} found</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Recommendations</p>
                  <p className="text-yellow-400 font-semibold">{analysis.recommendations} suggestions</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-semibold">
                  View Full Report
                </button>
                <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg text-sm font-semibold">
                  Export PDF
                </button>
                <button className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg text-sm font-semibold">
                  Archive
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredAnalyses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No analyses found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  )
}
