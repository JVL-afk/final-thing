'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long')
      setLoading(false)
      return
    }

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        // LAUNCH DAY: Skip verification, go straight to dashboard
        console.log('✅ Account created successfully')
        router.push('/dashboard')
      } else {
        setError(data.error || 'Failed to create account')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-orange-600 via-orange-700 to-black animate-pulse" 
           style={{
             animation: 'backgroundShift 6s ease-in-out infinite',
             background: 'linear-gradient(135deg, #ea580c 0%, #c2410c 30%, #9a3412 60%, #000000 100%)'
           }}>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {/* Simple Navbar */}
        <nav className="bg-black/20 backdrop-blur-sm border-b border-orange-500/20">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <Link href="/" className="text-2xl font-bold text-white">
                AFFILIFY
              </Link>
              <div className="space-x-4">
                <Link href="/login" className="text-orange-200 hover:text-white">
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </nav>
        
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto">
            <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-orange-500/20">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">
                  Join AFFILIFY
                </h1>
                <p className="text-orange-200">
                  Start your affiliate marketing journey today
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-orange-200 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black/50 border border-orange-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-orange-200 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black/50 border border-orange-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-orange-200 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black/50 border border-orange-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                    placeholder="Create a password"
                    required
                    minLength={8}
                  />
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-orange-200 mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black/50 border border-orange-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                    placeholder="Confirm your password"
                    required
                    minLength={8}
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
                  {loading ? 'Creating Account...' : 'Create Account & Enter Dashboard'}
                </button>

                <div className="text-center">
                  <p className="text-orange-200">
                    Already have an account?{' '}
                    <Link href="/login" className="text-purple-300 hover:text-purple-200 underline font-semibold">
                      Sign in
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Background Animation Styles */}
      <style jsx>{`
        @keyframes backgroundShift {
          0% { background: linear-gradient(135deg, #ea580c 0%, #c2410c 30%, #9a3412 60%, #000000 100%); }
          33% { background: linear-gradient(135deg, #c2410c 0%, #9a3412 30%, #7c2d12 60%, #000000 100%); }
          66% { background: linear-gradient(135deg, #9a3412 0%, #7c2d12 30%, #451a03 60%, #000000 100%); }
          100% { background: linear-gradient(135deg, #ea580c 0%, #c2410c 30%, #9a3412 60%, #000000 100%); }
        }
      `}</style>
    </div>
  )
}

