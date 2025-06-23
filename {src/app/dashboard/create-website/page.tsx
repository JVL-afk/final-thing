'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'

export default function CreateWebsitePage() {
  const [affiliateLink, setAffiliateLink] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedWebsite, setGeneratedWebsite] = useState(null)

  const handleGenerate = async () => {
    if (!affiliateLink.trim()) {
      alert('Please enter an affiliate link!')
      return
    }

    setIsGenerating(true)
    
    // Simulate AI generation
    setTimeout(() => {
      setGeneratedWebsite({
        name: "TechReviews Pro",
        url: "techreviews-pro.affilify.com",
        preview: "Your professional affiliate website is ready!"
      })
      setIsGenerating(false)
    }, 3000)
  }

  const handleDeploy = () => {
    alert('Website deployed successfully! 🚀')
    // Redirect to my websites
    window.location.href = '/dashboard/my-websites'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-900 via-orange-800 to-black">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-4">Create New Website</h1>
            <p className="text-xl text-orange-200">Let AI build your affiliate website in seconds</p>
          </div>

          {/* AI Chatbot Interface */}
          <div className="dashboard-card mb-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mr-4">
                <span className="text-white text-xl">🤖</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">AFFILIFY AI Assistant</h2>
                <p className="text-orange-200">Ready to create your affiliate website</p>
              </div>
            </div>

            {!generatedWebsite ? (
              <div>
                <div className="mb-6">
                  <label className="block text-white text-lg font-semibold mb-3">
                    Enter your affiliate link:
                  </label>
                  <input
                    type="url"
                    value={affiliateLink}
                    onChange={(e) => setAffiliateLink(e.target.value)}
                    placeholder="https://example.com/affiliate-link"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-800"
                    disabled={isGenerating}
                  />
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className={`w-full py-4 px-6 rounded-lg font-bold text-xl transition-all duration-300 ${
                    isGenerating
                      ? 'bg-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 transform hover:scale-105'
                  } text-white`}
                >
                  {isGenerating ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                      Generating your website...
                    </div>
                  ) : (
                    'Generate Website'
                  )}
                </button>

                {isGenerating && (
                  <div className="mt-6 text-center">
                    <div className="text-orange-200 mb-4">
                      🤖 AI is analyzing your affiliate link and creating a professional website...
                    </div>
                    <div className="bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full animate-pulse" style={{width: '60%'}}></div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                  ✅ Website generated successfully!
                </div>

                <div className="bg-white rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">{generatedWebsite.name}</h3>
                  <p className="text-gray-600 mb-4">URL: {generatedWebsite.url}</p>
                  <div className="bg-gray-100 p-4 rounded">
                    <p className="text-gray-700">{generatedWebsite.preview}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={handleDeploy}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300"
                  >
                    Deploy Website
                  </button>
                  <button
                    onClick={() => setGeneratedWebsite(null)}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300"
                  >
                    Generate New
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Instructions */}
          <div className="dashboard-card">
            <h3 className="text-2xl font-bold text-white mb-4">How it works:</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1">1</div>
                <div>
                  <h4 className="text-white font-semibold">Enter your affiliate link</h4>
                  <p className="text-orange-200">Paste any affiliate link from Amazon, ClickBank, or other networks</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1">2</div>
                <div>
                  <h4 className="text-white font-semibold">AI analyzes and creates</h4>
                  <p className="text-orange-200">Our AI analyzes the product and generates a professional website</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1">3</div>
                <div>
                  <h4 className="text-white font-semibold">Deploy and earn</h4>
                  <p className="text-orange-200">Your website goes live instantly and starts generating revenue</p>
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
