'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (response.ok) {
        router.push('/dashboard')
      } else {
        setMessage(data.error || 'Login failed')
      }
    } catch (error) {
      setMessage('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-md mx-auto bg-white/10 backdrop-blur-sm rounded-lg p-8">
          <h1 className="text-3xl font-bold text-white text-center mb-8">
            Welcome Back
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-white mb-2">Email Address</label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:border-red-500 focus:outline-none"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-white mb-2">Password</label>
              <input
                type="password"
                required
                className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:border-red-500 focus:outline-none"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>

            {message && (
              <div className="p-3 rounded-lg bg-red-500/20 text-red-200">
                {message}
              </div>
            )}
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold btn-hover disabled:opacity-50"
            >
              {loading ? 'Signing In...' : 'Sign In 🚀'}
            </button>
          </form>
          
          <div className="text-center mt-6">
            <Link href="/forgot-password" className="text-red-400 hover:text-red-300">
              Forgot Password?
            </Link>
          </div>
          
          <p className="text-center text-gray-300 mt-4">
            Don't have an account?{' '}
            <Link href="/signup" className="text-red-400 hover:text-red-300">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
