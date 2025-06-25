'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'

export default function MyAnalysesPage() {
  const [analyses, setAnalyses] = useState([])
  const [selectedAnalysis, setSelectedAnalysis] = useState(null)

  useEffect(() => {
    // Load saved analyses from localStorage
    const savedAnalyses = JSON.parse(localStorage.getItem('affilify_analyses') || '[]')
    setAnalyses(savedAnalyses)
  }, [])

  const handleViewDetails = (analysis) => {
    setSelectedAnalysis(selectedAnalysis?.id === analysis.id ? null : analysis)
  }

  const handleDeleteAnalysis = (analysisId) => {
    if (confirm('Are you sure you want to delete this analysis?')) {
      const updatedAnalyses = analyses.filter(a => a.id !== analysisId)
      setAnalyses(updatedAnalyses)
      localStorage.setItem('affilify_analyses', JSON.stringify(updatedAnalyses))
      if (selectedAnalysis?.id === analysisId) {
        setSelectedAnalysis(null)
      }
    }
  }

  const handleCreateWebsite = (analysis) => {
    localStorage.setItem('affilify_analysis_for_website', JSON.stringify(analysis))
    window.location.href = '/dashboard/create-website?from=analysis'
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-900 via-orange-800 to-black animate-color-transition">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-4">My Analyses</h1>
            <p className="text-xl text-orange-200">View and manage all your saved website analyses</p>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="dashboard-card text-center">
              <div className="text-3xl font-bold text-orange-400 mb-2">{analyses.length}</div>
              <div className="text-white">Total Analyses</div>
            </div>
            <div className="dashboard-card text-center">
              <div className="text-3xl font-bold text-orange-400 mb-2">
                {analyses.filter(a => a.score >= 80).length}
              </div>
              <div className="text-white">High-Scoring Sites</div>
            </div>
            <div className="dashboard-card text-center">
              <div className="text-3xl font-bold text-orange-400 mb-2">
                {analyses.length > 0 ? Math.round(analyses.reduce((sum, a) => sum + a.score, 0) / analyses.length) : 0}
              </div>
              <div className="text-white">Average Score</div>
            </div>
          </div>

          {/* New Analysis Button */}
          <div className="text-center mb-8">
            <Link href="/dashboard/analyze-website">
              <button className="dashboard-button-create">
                + ANALYZE NEW WEBSITE
              </button>
            </Link>
          </div>

          {/* Analyses List */}
          {analyses.length > 0 ? (
            <div className="space-y-6">
              {analyses.map((analysis) => (
                <div key={analysis.id} className="dashboard-card">
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4">
                    <div className="mb-4 lg:mb-0">
                      <div className="flex items-center mb-2">
                        <h3 className="text-2xl font-semibold text-white mr-4">
                          {analysis.title || `Analysis of ${analysis.url}`}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          analysis.score >= 80 
                            ? 'bg-green-500 text-white' 
                            : analysis.score >= 60
                            ? 'bg-yellow-500 text-black'
                            : 'bg-red-500 text-white'
                        }`}>
                          Score: {analysis.score}/100
                        </span>
                      </div>
                      <p className="text-orange-200 mb-1">{analysis.url}</p>
                      <p className="text-sm text-gray-300">
                        Analyzed on {formatDate(analysis.analyzedAt)}
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => handleViewDetails(analysis)}
                        className="dashboard-button text-sm"
                      >
                        {selectedAnalysis?.id === analysis.id ? 'Hide Details' : 'View Details'}
                      </button>
                      <button
                        onClick={() => handleCreateWebsite(analysis)}
                        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 text-sm"
                      >
                        Create Website
                      </button>
                      <button
                        onClick={() => handleDeleteAnalysis(analysis.id)}
                        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-orange-400">{analysis.traffic?.monthly || 'N/A'}</div>
                      <div className="text-sm text-gray-300">Monthly Visitors</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-400">{analysis.revenue?.monthly || 'N/A'}</div>
                      <div className="text-sm text-gray-300">Monthly Revenue</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-400">{analysis.conversionRate || 'N/A'}</div>
                      <div className="text-sm text-gray-300">Conversion Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-purple-400">{analysis.topProducts?.length || 0}</div>
                      <div className="text-sm text-gray-300">Top Products</div>
                    </div>
                  </div>

                  {/* Detailed View */}
                  {selectedAnalysis?.id === analysis.id && (
                    <div className="border-t border-white border-opacity-20 pt-6 mt-6">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Strengths & Weaknesses */}
                        <div className="space-y-4">
                          <div className="bg-green-500 bg-opacity-10 rounded-lg p-4">
                            <h4 className="text-lg font-bold text-green-400 mb-3">✅ Strengths</h4>
                            <ul className="space-y-2">
                              {(analysis.strengths || []).map((strength, index) => (
                                <li key={index} className="text-green-200 text-sm">• {strength}</li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="bg-red-500 bg-opacity-10 rounded-lg p-4">
                            <h4 className="text-lg font-bold text-red-400 mb-3">⚠️ Areas for Improvement</h4>
                            <ul className="space-y-2">
                              {(analysis.weaknesses || []).map((weakness, index) => (
                                <li key={index} className="text-red-200 text-sm">• {weakness}</li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Recommendations & Products */}
                        <div className="space-y-4">
                          <div className="bg-blue-500 bg-opacity-10 rounded-lg p-4">
                            <h4 className="text-lg font-bold text-blue-400 mb-3">🎯 AI Recommendations</h4>
                            <ul className="space-y-2">
                              {(analysis.recommendations || []).slice(0, 5).map((rec, index) => (
                                <li key={index} className="text-blue-200 text-sm">• {rec}</li>
                              ))}
                            </ul>
                          </div>

                          {analysis.topProducts && analysis.topProducts.length > 0 && (
                            <div className="bg-purple-500 bg-opacity-10 rounded-lg p-4">
                              <h4 className="text-lg font-bold text-purple-400 mb-3">🏆 Top Products</h4>
                              <div className="space-y-2">
                                {analysis.topProducts.map((product, index) => (
                                  <div key={index} className="flex justify-between items-center text-sm">
                                    <span className="text-purple-200">{product.name}</span>
                                    <span className="text-green-400">{product.revenue}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col md:flex-row gap-4 mt-6">
                        <button
                          onClick={() => handleCreateWebsite(analysis)}
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300"
                        >
                          🌐 Create Optimized Website
                        </button>
                        <Link href="/dashboard/analyze-website" className="flex-1">
                          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300">
                            🔍 Analyze Similar Website
                          </button>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="dashboard-card text-center py-12">
              <div className="text-6xl mb-4">📊</div>
              <h3 className="text-2xl font-bold text-white mb-4">No analyses yet!</h3>
              <p className="text-orange-200 mb-6">
                Start analyzing affiliate websites to get insights and optimization recommendations.
              </p>
              <Link href="/dashboard/analyze-website">
                <button className="dashboard-button">
                  Analyze Your First Website
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
