'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'

export default function AnalyticsPage() {
  const [websiteUrl, setWebsiteUrl] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState(null)

  const handleAnalyze = async () => {
    if (!websiteUrl.trim()) {
      alert('Please enter a website URL!')
      return
    }

    setIsAnalyzing(true)
    
    // Simulate AI analysis
    setTimeout(() => {
      setAnalysisResult({
        url: websiteUrl,
        score: 87,
        traffic: {
          daily: '2,341',
          weekly: '16,387',
          monthly: '71,234'
        },
        revenue: {
          daily: '$234',
          weekly: '$1,642',
          monthly: '$7,123'
        },
        conversionRate: '3.2%',
        topProducts: [
          { name: 'iPhone 15 Pro', sales: 45, revenue: '$1,234' },
          { name: 'MacBook Air M3', sales: 23, revenue: '$892' },
          { name: 'AirPods Pro', sales: 67, revenue: '$567' }
        ],
        recommendations: [
          'Add more product reviews to increase trust',
          'Optimize page loading speed (currently 3.2s)',
          'Include comparison tables for better conversions',
          'Add email capture popup for newsletter'
        ]
      })
      setIsAnalyzing(false)
    }, 4000)
  }

  const handleSaveAnalysis = () => {
    alert('Analysis saved to My Analyses! 📊')
  }

  const handleCreateWebsite = () => {
    alert('Creating optimized website based on this analysis... 🚀')
    window.location.href = '/dashboard/create-website'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-900 via-orange-800 to-black">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-4">Website Analytics</h1>
            <p className="text-xl text-orange-200">Analyze any affiliate website and get AI-powered insights</p>
          </div>

          {/* Analysis Input */}
          <div className="dashboard-card mb-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                <span className="text-white text-xl">📊</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">AI Website Analyzer</h2>
                <p className="text-orange-200">Get detailed insights on any affiliate website</p>
              </div>
            </div>

            {!analysisResult ? (
              <div>
                <div className="mb-6">
                  <label className="block text-white text-lg font-semibold mb-3">
                    Enter website URL to analyze:
                  </label>
                  <input
                    type="url"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    placeholder="https://example.com"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
                    disabled={isAnalyzing}
                  />
                </div>

                <button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className={`w-full py-4 px-6 rounded-lg font-bold text-xl transition-all duration-300 ${
                    isAnalyzing
                      ? 'bg-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 transform hover:scale-105'
                  } text-white`}
                >
                  {isAnalyzing ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                      Analyzing website...
                    </div>
                  ) : (
                    'ANALYZE WEBSITE'
                  )}
                </button>

                {isAnalyzing && (
                  <div className="mt-6 text-center">
                    <div className="text-orange-200 mb-4">
                      🤖 AI is analyzing traffic, conversions, and optimization opportunities...
                    </div>
                    <div className="bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{width: '75%'}}></div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                  ✅ Analysis completed! Overall Score: <strong>{analysisResult.score}/100</strong>
                </div>

                {/* Traffic & Revenue Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-white bg-opacity-5 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-white mb-4">📈 Traffic Analytics</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-orange-200">Daily Visitors:</span>
                        <span className="text-white font-semibold">{analysisResult.traffic.daily}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-orange-200">Weekly Visitors:</span>
                        <span className="text-white font-semibold">{analysisResult.traffic.weekly}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-orange-200">Monthly Visitors:</span>
                        <span className="text-white font-semibold">{analysisResult.traffic.monthly}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white bg-opacity-5 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-white mb-4">💰 Revenue Analytics</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-orange-200">Daily Revenue:</span>
                        <span className="text-green-400 font-semibold">{analysisResult.revenue.daily}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-orange-200">Weekly Revenue:</span>
                        <span className="text-green-400 font-semibold">{analysisResult.revenue.weekly}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-orange-200">Monthly Revenue:</span>
                        <span className="text-green-400 font-semibold">{analysisResult.revenue.monthly}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-orange-200">Conversion Rate:</span>
                        <span className="text-blue-400 font-semibold">{analysisResult.conversionRate}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Top Products */}
                <div className="bg-white bg-opacity-5 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-bold text-white mb-4">🏆 Top Performing Products</h3>
                  <div className="space-y-3">
                    {analysisResult.topProducts.map((product, index) => (
                      <div key={index} className="flex justify-between items-center bg-white bg-opacity-5 rounded p-3">
                        <div>
                          <span className="text-white font-semibold">{product.name}</span>
                          <span className="text-orange-200 ml-2">({product.sales} sales)</span>
                        </div>
                        <span className="text-green-400 font-semibold">{product.revenue}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Recommendations */}
                <div className="bg-white bg-opacity-5 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-bold text-white mb-4">🤖 AI Recommendations</h3>
                  <div className="space-y-3">
                    {analysisResult.recommendations.map((rec, index) => (
                      <div key={index} className="flex items-start">
                        <span className="text-blue-400 mr-3">•</span>
                        <span className="text-orange-200">{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col md:flex-row gap-4">
                  <button
                    onClick={handleSaveAnalysis}
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300"
                  >
                    Archive My Analysis
                  </button>
                  <button
                    onClick={handleCreateWebsite}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300"
                  >
                    Turn My Analysis Into a Website
                  </button>
                  <button
                    onClick={() => setAnalysisResult(null)}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300"
                  >
                    Analyze New Website
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Instructions */}
          <div className="dashboard-card">
            <h3 className="text-2xl font-bold text-white mb-4">How Website Analysis Works:</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1">1</div>
                <div>
                  <h4 className="text-white font-semibold">Enter any website URL</h4>
                  <p className="text-orange-200">Analyze competitors or get insights on any affiliate site</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1">2</div>
                <div>
                  <h4 className="text-white font-semibold">AI analyzes performance</h4>
                  <p className="text-orange-200">Get traffic, revenue, conversion rates, and optimization tips</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1">3</div>
                <div>
                  <h4 className="text-white font-semibold">Save or create website</h4>
                  <p className="text-orange-200">Archive analysis or use insights to build a better website</p>
                </div>
              </div>
            </div>
          </div>

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
