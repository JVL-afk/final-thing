'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Chatbot from '@/components/Chatbot'

export default function AnalyzeWebsite() {
  const [analysisResult, setAnalysisResult] = useState<any>(null)

  const handleAnalysisComplete = (analysisData: any) => {
    setAnalysisResult(analysisData)
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8">
          📊 Analyze Website
        </h1>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">AI Analyzer</h2>
            <Chatbot type="analyze" onComplete={handleAnalysisComplete} />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Analysis Results</h2>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 h-96 overflow-y-auto">
              {analysisResult ? (
                <div className="text-white space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-green-400">Overall Score</h3>
                    <p className="text-2xl font-bold">{analysisResult.score}/100</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-bold text-blue-400">Key Insights</h3>
                    <ul className="list-disc list-inside space-y-1">
                      {analysisResult.insights?.map((insight: string, index: number) => (
                        <li key={index} className="text-sm">{insight}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-yellow-400">Recommendations</h3>
                    <ul className="list-disc list-inside space-y-1">
                      {analysisResult.recommendations?.map((rec: string, index: number) => (
                        <li key={index} className="text-sm">{rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  <p>Analysis results will appear here...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
