'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function AnalyzeWebsitePage() {
  const [websiteUrl, setWebsiteUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [analysisResult, setAnalysisResult] = useState(null)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setAnalysisResult(null)

    try {
      const response = await fetch('/api/ai/analyze-website', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-email': localStorage.getItem('userEmail') || 'demo@user.com' // Pass user email for tracking
        },
        body: JSON.stringify({ websiteUrl }),
      })

      const data = await response.json()

      if (data.success) {
        setAnalysisResult(data.analysis)
      } else {
        setError(data.error || 'Failed to analyze website. Please try again.')
      }
    } catch (err) {
      setError('An error occurred while analyzing the website. Please try again.')
    } finally {
      setLoading(false)
    }
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
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-6 text-center">
            AI Website Analysis 🧠
          </h1>
          <p className="text-orange-200 text-lg mb-8 text-center">
            Get an AI-powered analysis of any website for SEO, content, and affiliate optimization opportunities.
          </p>

          <div className="bg-black/30 backdrop-blur-sm rounded-xl p-8 border border-orange-500/20">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="websiteUrl" className="block text-sm font-medium text-orange-200 mb-2">
                  Website URL to Analyze
                </label>
                <input
                  type="url"
                  id="websiteUrl"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  className="w-full px-4 py-3 bg-black/50 border border-orange-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                  placeholder="e.g., https://example.com"
                  required
                />
              </div>

              {error && (
                <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3">
                  <p className="text-red-200 text-sm">{error}</p>
                </div>
               )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 px-4 rounded-lg font-semibold hover:from-purple-700 hover:to-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200"
              >
                {loading ? 'Analyzing Website...' : 'Analyze Website'}
              </button>
            </form>

            {analysisResult && (
              <div className="mt-8 pt-8 border-t border-orange-500/20">
                <h2 className="text-3xl font-bold text-white mb-4">Analysis Results for {analysisResult.url}:</h2>
                <div className="bg-black/20 rounded-lg p-6 border border-purple-500/30 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-purple-300 mb-2">Summary:</h3>
                    <p className="text-gray-300">{analysisResult.summary}</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-purple-300 mb-2">SEO Recommendations:</h3>
                    <ul className="list-disc list-inside text-gray-300">
                      {analysisResult.seoRecommendations.map((rec, index) => (
                        <li key={index}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-purple-300 mb-2">Content Opportunities:</h3>
                    <ul className="list-disc list-inside text-gray-300">
                      {analysisResult.contentOpportunities.map((opp, index) => (
                        <li key={index}>{opp}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-purple-300 mb-2">Affiliate Integration Suggestions:</h3>
                    <ul className="list-disc list-inside text-gray-300">
                      {analysisResult.affiliateSuggestions.map((sugg, index) => (
                        <li key={index}>{sugg}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

