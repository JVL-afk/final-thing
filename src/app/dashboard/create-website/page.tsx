'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function CreateWebsitePage() {
  const [affiliateLink, setAffiliateLink] = useState('')
  const [productName, setProductName] = useState('') // Optional: for better AI context
  const [loading, setLoading] = useState(false)
  const [generatedWebsite, setGeneratedWebsite] = useState(null)
  const [error, setError] = useState('')

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setGeneratedWebsite(null)

    try {
      const response = await fetch('/api/ai/generate-website', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-email': localStorage.getItem('userEmail') || 'demo@user.com' // Pass user email for tracking
        },
        body: JSON.stringify({ affiliateLink, productName }),
      })

      const data = await response.json()

      if (data.success) {
        setGeneratedWebsite(data.website)
        // Track website generation
        if (typeof window !== 'undefined' && window.AFFILIFY && window.AFFILIFY.trackWebsiteGeneration) {
          window.AFFILIFY.trackWebsiteGeneration(productName || 'unknown product', 'AI Model X', data.generationTime);
        }
      } else {
        setError(data.error || 'Failed to generate website. Please try again.')
      }
    } catch (err) {
      setError('An error occurred while generating the website. Please try again.')
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
            Generate Your Affiliate Website with AI 🤖
          </h1>
          <p className="text-orange-200 text-lg mb-8 text-center">
            Provide an affiliate link, and our AI will build a high-converting website around that product!
          </p>

          <div className="bg-black/30 backdrop-blur-sm rounded-xl p-8 border border-orange-500/20">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="affiliateLink" className="block text-sm font-medium text-orange-200 mb-2">
                  Affiliate Product Link
                </label>
                <input
                  type="url"
                  id="affiliateLink"
                  value={affiliateLink}
                  onChange={(e) => setAffiliateLink(e.target.value)}
                  className="w-full px-4 py-3 bg-black/50 border border-orange-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                  placeholder="e.g., https://amazon.com/product-xyz?tag=yourid"
                  required
                />
              </div>

              <div>
                <label htmlFor="productName" className="block text-sm font-medium text-orange-200 mb-2">
                  Product Name (Optional, for better AI context )
                </label>
                <input
                  type="text"
                  id="productName"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="w-full px-4 py-3 bg-black/50 border border-orange-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                  placeholder="e.g., 'XYZ Smart Coffee Maker'"
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
                {loading ? 'Generating Website...' : 'Generate Website'}
              </button>
            </form>

            {generatedWebsite && (
              <div className="mt-8 pt-8 border-t border-orange-500/20">
                <h2 className="text-3xl font-bold text-white mb-4">Your AI-Generated Website:</h2>
                <div className="bg-black/20 rounded-lg p-6 border border-purple-500/30">
                  <h3 className="text-2xl font-bold text-purple-300 mb-2">{generatedWebsite.title}</h3>
                  <p className="text-orange-200 mb-4">{generatedWebsite.description}</p>
                  <div className="space-y-4">
                    {generatedWebsite.sections.map((section, index) => (
                      <div key={index} className="bg-black/30 p-4 rounded-lg">
                        <h4 className="text-xl font-semibold text-white mb-2">{section.heading}</h4>
                        <p className="text-gray-300">{section.content}</p>
                        {section.products && section.products.length > 0 && (
                          <div className="mt-4">
                            <h5 className="text-lg font-semibold text-orange-300 mb-2">Recommended Products:</h5>
                            <ul className="list-disc list-inside text-gray-300">
                              {section.products.map((product, pIndex) => (
                                <li key={pIndex}>
                                  <span className="font-medium text-white">{product.name}:</span> {product.description} (<a href={product.affiliateLink} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Buy Now</a>)
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 text-center">
                    <button
                      onClick={() => alert('Publishing website... (This would trigger deployment)')}
                      className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold transform hover:scale-105 transition-all duration-200"
                    >
                      Publish Website
                    </button>
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

