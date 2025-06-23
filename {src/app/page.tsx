import Link from 'next/link'
import { ArrowRight, Zap, Globe, BarChart3, Users, Star, Check } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link href="/" className="text-2xl font-bold text-white">
              AFFILIFY
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                Home
              </Link>
              <Link href="/pricing" className="text-gray-300 hover:text-white transition-colors">
                Pricing
              </Link>
              <Link href="/docs" className="text-gray-300 hover:text-white transition-colors">
                Docs
              </Link>
              <Link href="/login" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">
                Login
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Create Affiliate Websites
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              In Seconds
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            AI-powered platform that generates professional affiliate marketing websites instantly. 
            No coding required, just results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup" className="btn-primary text-lg px-8 py-4">
              Start Creating <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link href="/docs" className="btn-secondary text-lg px-8 py-4">
              View Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              From AI-generated content to advanced analytics, AFFILIFY provides all the tools 
              you need to build a profitable affiliate business.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card text-center">
              <Zap className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">AI-Powered Generation</h3>
              <p className="text-gray-300">
                Create professional websites in seconds with our advanced AI that understands 
                affiliate marketing best practices.
              </p>
            </div>
            
            <div className="card text-center">
              <Globe className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Global Reach</h3>
              <p className="text-gray-300">
                Deploy your affiliate websites worldwide with our global CDN and 
                multi-language support.
              </p>
            </div>
            
            <div className="card text-center">
              <BarChart3 className="h-12 w-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Advanced Analytics</h3>
              <p className="text-gray-300">
                Track performance, conversions, and revenue with detailed analytics 
                and reporting tools.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-purple-400 mb-2">10K+</div>
              <div className="text-gray-300">Websites Created</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-400 mb-2">$2M+</div>
              <div className="text-gray-300">Revenue Generated</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-400 mb-2">500+</div>
              <div className="text-gray-300">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-pink-400 mb-2">99.9%</div>
              <div className="text-gray-300">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Trusted by Top Creators
            </h2>
            <p className="text-xl text-gray-300">
              See what successful affiliate marketers are saying about AFFILIFY
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-300 mb-4">
                "AFFILIFY transformed my affiliate business. I went from spending weeks 
                building websites to creating them in minutes."
              </p>
              <div className="text-white font-semibold">Sarah Johnson</div>
              <div className="text-gray-400">Digital Marketer</div>
            </div>
            
            <div className="card">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-300 mb-4">
                "The AI understands what converts. My affiliate sites now generate 
                3x more revenue than my manually built ones."
              </p>
              <div className="text-white font-semibold">Mike Chen</div>
              <div className="text-gray-400">Affiliate Marketer</div>
            </div>
            
            <div className="card">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-300 mb-4">
                "Finally, a platform that gets affiliate marketing. The analytics 
                alone are worth the subscription price."
              </p>
              <div className="text-white font-semibold">Emma Rodriguez</div>
              <div className="text-gray-400">Content Creator</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Scale Your Affiliate Business?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Join thousands of successful affiliate marketers who trust AFFILIFY 
            to power their online business.
          </p>
          <Link href="/signup" className="bg-white text-purple-600 hover:bg-gray-100 font-semibold text-lg px-8 py-4 rounded-lg transition-colors">
            Start Your Free Trial
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/20 backdrop-blur-sm border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold text-white mb-4">AFFILIFY</div>
              <p className="text-gray-300">
                AI-powered affiliate website generation platform for modern marketers.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-300">
                <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="/docs" className="hover:text-white transition-colors">Documentation</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">API</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-300">
                <li><Link href="#" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-300">
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-300">
            © 2025 AFFILIFY. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
