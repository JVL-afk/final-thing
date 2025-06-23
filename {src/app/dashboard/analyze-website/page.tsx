'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'

export default function AnalyzeWebsitePage() {
  const [message, setMessage] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState(null)
  const [chatHistory, setChatHistory] = useState([
    {
      type: 'bot',
      message: 'Hello! I\'m your AI assistant. Please paste the affiliate link you want me to analyze and I\'ll provide you with detailed insights about the website\'s performance, optimization opportunities, and revenue potential.'
    }
  ])

  const handleSendMessage = async () => {
    if (!message.trim()) return

    // Add user message to chat
    const newUserMessage = { type: 'user', message: message.trim() }
    setChatHistory(prev => [...prev, newUserMessage])
    
    setIsAnalyzing(true)
    setMessage('')

    // Simulate AI analysis
    setTimeout(() => {
      const analysisData = {
        url: message.trim(),
        score: Math.floor(Math.random() * 30) + 70, // 70-100
        traffic: {
          daily: (Math.floor(Math.random() * 5000) + 1000).toLocaleString(),
          weekly: (Math.floor(Math.random() * 35000) + 7000).toLocaleString(),
          monthly: (Math.floor(Math.random() * 150000) + 30000).toLocaleString()
        },
        revenue: {
          daily: `$${Math.floor(Math.random() * 500) + 100}`,
          weekly: `$${Math.floor(Math.random() * 3500) + 700}`,
          monthly: `$${Math.floor(Math.random() * 15000) + 3000}`
        },
        conversionRate: `${(Math.random() * 3 + 1).toFixed(1)}%`,
        strengths: [
          'High-quality product images and descriptions',
          'Strong call-to-action buttons placement',
          'Good mobile responsiveness',
          'Fast loading speed (2.1 seconds)'
        ],
        weaknesses: [
          'Missing customer reviews section',
          'No email capture popup',
          'Limited social proof elements',
          'Could improve SEO meta descriptions'
        ],
        recommendations: [
          'Add customer testimonials and reviews',
          'Implement exit-intent popup for email capture',
          'Include comparison tables for products',
          'Add urgency elements (limited time offers)',
          'Optimize for voice search keywords'
        ],
        topProducts: [
          { name: 'Best Selling Product #1', performance: 'Excellent', revenue: '$1,234' },
          { name: 'Featured Product #2', performance: 'Good', revenue: '$892' },
          { name: 'Popular Choice #3', performance: 'Very Good', revenue: '$567' }
        ]
      }

      setAnalysisResult(analysisData)

      const botResponse = {
        type: 'bot',
        message: `✅ Analysis complete! I've analyzed ${analysisData.url} and found some great insights.\n\n📊 **Overall Score: ${analysisData.score}/100**\n\n📈 **Traffic Performance:**\n• Daily: ${analysisData.traffic.daily} visitors\n• Monthly: ${analysisData.traffic.monthly} visitors\n\n💰 **Revenue Estimates:**\n• Daily: ${analysisData.revenue.daily}\n• Monthly: ${analysisData.revenue.monthly}\n• Conversion Rate: ${analysisData.conversionRate}\n\n🎯 **Key Recommendations:**\n${analysisData.recommendations.slice(0, 3).map(rec => `• ${rec}`).join('\n')}\n\nWould you like me to save this analysis or help you create an optimized website based on these insights?`
      }

      setChatHistory(prev => [...prev, botResponse])
      setIsAnalyzing(false)
    }, 3000)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleArchiveAnalysis = () => {
    if (analysisResult) {
      // Save to local storage or send to API
      const savedAnalyses = JSON.parse(localStorage.getItem('affilify_analyses') || '[]')
      const newAnalysis = {
        id: Date.now(),
        ...analysisResult,
        analyzedAt: new Date().toISOString(),
        title: `Analysis of ${analysisResult.url}`
      }
      savedAnalyses.push(newAnalysis)
      localStorage.setItem('affilify_analyses', JSON.stringify(savedAnalyses))
      
      alert('✅ Analysis archived successfully! You can view it in "My Analyses" section.')
    }
  }

  const handleCreateWebsite = () => {
    if (analysisResult) {
      // Store analysis data for website creation
      localStorage.setItem('affilify_analysis_for_website', JSON.stringify(analysisResult))
      window.location.href = '/dashboard/create-website?from=analysis'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-900 via-orange-800 to-black animate-color-transition">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-white mb-4">AI Website Analyzer</h1>
            <p className="text-xl text-orange-200">Get detailed insights on any affiliate website</p>
          </div>

          {/* Chat Interface */}
          <div className="dashboard-card mb-6">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                <span className="text-white text-xl">🤖</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">AI Analysis Assistant</h2>
                <p className="text-orange-200">Paste any website URL for detailed analysis</p>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="bg-white bg-opacity-5 rounded-lg p-4 mb-4 max-h-96 overflow-y-auto">
              {chatHistory.map((chat, index) => (
                <div key={index} className={`mb-4 ${chat.type === 'user' ? 'text-right' : 'text-left'}`}>
                  <div className={`inline-block max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    chat.type === 'user' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white bg-opacity-10 text-orange-200'
                  }`}>
                    <div className="whitespace-pre-line">{chat.message}</div>
                  </div>
                </div>
              ))}
              
              {isAnalyzing && (
                <div className="text-left mb-4">
                  <div className="inline-block bg-white bg-opacity-10 text-orange-200 px-4 py-2 rounded-lg">
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-orange-400 mr-2"></div>
                      Analyzing website... This may take a few moments.
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Message Input */}
            <div className="flex gap-3">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="www.example.com"
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
                disabled={isAnalyzing}
              />
              <button
                onClick={handleSendMessage}
                disabled={isAnalyzing || !message.trim()}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-500 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300"
              >
                {isAnalyzing ? '...' : 'Send'}
              </button>
            </div>
          </div>

          {/* Action Buttons - Only show when analysis is complete */}
          {analysisResult && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <button
                onClick={handleArchiveAnalysis}
                className="dashboard-button-medium bg-purple-600 hover:bg-purple-700 transform hover:scale-105"
              >
                📁 Archive My Analysis
              </button>
              <button
                onClick={handleCreateWebsite}
                className="dashboard-button-medium bg-green-600 hover:bg-green-700 transform hover:scale-105"
              >
                🌐 Turn My Analysis Into a Website
              </button>
            </div>
          )}

          {/* Instructions */}
          <div className="dashboard-card">
            <h3 className="text-2xl font-bold text-white mb-4">How It Works:</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1">1</div>
                <div>
                  <h4 className="text-white font-semibold">Paste Website URL</h4>
                  <p className="text-orange-200">Enter any affiliate website URL in the chat</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1">2</div>
                <div>
                  <h4 className="text-white font-semibold">AI Analyzes Performance</h4>
                  <p className="text-orange-200">Get traffic, revenue, strengths, and improvement opportunities</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1">3</div>
                <div>
                  <h4 className="text-white font-semibold">Save or Create</h4>
                  <p className="text-orange-200">Archive the analysis or use insights to build a better website</p>
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
