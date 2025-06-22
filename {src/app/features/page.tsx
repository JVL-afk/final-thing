'use client'

import Navbar from '@/components/Navbar'
import Link from 'next/link'

export default function Features() {
  const features = [
    {
      icon: '🤖',
      title: 'AI Website Generation',
      description: 'Create professional affiliate websites in minutes with our advanced AI technology.',
      slug: 'ai-website-generation',
      highlights: ['No coding required', 'Professional designs', 'SEO optimized']
    },
    {
      icon: '📊',
      title: 'Smart Analytics',
      description: 'Track clicks, conversions, and revenue with real-time analytics and detailed reports.',
      slug: 'smart-analytics',
      highlights: ['Real-time tracking', 'Detailed reports', 'Performance insights']
    },
    {
      icon: '🔍',
      title: 'Competitor Analysis',
      description: 'Analyze competitor websites to discover their strategies and find opportunities.',
      slug: 'competitor-analysis',
      highlights: ['Strategy insights', 'Market research', 'Competitive advantage']
    },
    {
      icon: '💰',
      title: 'Revenue Optimization',
      description: 'Maximize your affiliate commissions with AI-powered optimization suggestions.',
      slug: 'revenue-optimization',
      highlights: ['A/B testing', 'Conversion optimization', 'Revenue tracking']
    },
    {
      icon: '📱',
      title: 'Mobile Responsive',
      description: 'All generated websites are fully responsive and optimized for mobile devices.',
      slug: 'mobile-responsive',
      highlights: ['Mobile-first design', 'Touch-friendly', 'Fast loading']
    },
    {
      icon: '⚡',
      title: 'Lightning Fast',
      description: 'Generate websites in under 3 minutes with our optimized AI algorithms.',
      slug: 'lightning-fast',
      highlights: ['3-minute generation', 'Cloud infrastructure', 'Instant deployment']
    },
    {
      icon: '🎨',
      title: 'Professional Templates',
      description: 'Choose from hundreds of professionally designed templates for affiliate marketing.',
      slug: 'professional-templates',
      highlights: ['100+ templates', 'Industry-specific', 'Conversion-focused']
    },
    {
      icon: '🔗',
      title: 'Affiliate Link Management',
      description: 'Automatically insert and manage affiliate links with click tracking.',
      slug: 'affiliate-link-management',
      highlights: ['Auto-insertion', 'Click tracking', 'Commission monitoring']
    },
    {
      icon: '📈',
      title: 'SEO Optimization',
      description: 'Built-in SEO tools to help your websites rank higher in search engines.',
      slug: 'seo-optimization',
      highlights: ['Meta optimization', 'Schema markup', 'Site speed optimization']
    }
  ]

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold gradient-text mb-6">
            Powerful Features
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Everything you need to build, analyze, and optimize profitable affiliate websites with AI
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Link 
              key={index} 
              href={`/features/${feature.slug}`}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105 block"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-300 leading-relaxed mb-4">{feature.description}</p>
              
              <div className="space-y-2">
                {feature.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-center text-sm text-gray-400">
                    <span className="text-green-400 mr-2">✓</span>
                    {highlight}
                  </div>
                ))}
              </div>
              
              <div className="mt-4 text-red-400 font-semibold">
                Learn More →
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20">
          <div className="bg-gradient-to-r from-red-600/20 to-blue-600/20 rounded-lg p-8 backdrop-blur-sm">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Experience These Features?
            </h2>
            <p className="text-xl text-gray-200 mb-8">
              Start your free trial and see how AFFILIFY can transform your affiliate marketing
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/signup" 
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg text-xl font-semibold btn-hover"
              >
                Start Free Trial 🚀
              </Link>
              <Link 
                href="/pricing" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-xl font-semibold btn-hover"
              >
                View Pricing 💰
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
