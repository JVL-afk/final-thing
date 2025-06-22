'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Chatbot from '@/components/Chatbot'

export default function CreateWebsite() {
  const [generatedWebsite, setGeneratedWebsite] = useState<any>(null)

  const handleWebsiteComplete = (websiteData: any) => {
    setGeneratedWebsite(websiteData)
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8">
          🌐 Create New Website
        </h1>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">AI Assistant</h2>
            <Chatbot type="create" onComplete={handleWebsiteComplete} />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Website Preview</h2>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 h-96">
              {generatedWebsite ? (
                <div className="text-white">
                  <h3 className="text-xl font-bold mb-4">{generatedWebsite.title}</h3>
                  <p className="mb-4">{generatedWebsite.description}</p>
                  <div className="bg-green-500/20 p-4 rounded-lg">
                    <p className="text-green-200">✅ Website generated successfully!</p>
                    <p className="text-sm text-green-300 mt-2">
                      URL: {generatedWebsite.url}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  <p>Website preview will appear here...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
