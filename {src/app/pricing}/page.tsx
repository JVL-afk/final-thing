'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Link from 'next/link'

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false)

  const plans = [
    {
      name: 'Starter',
      monthlyPrice: 29,
      yearlyPrice: 290,
      features: [
        '5 Website Generations per month',
        '10 Website Analyses per month',
        'Basic AI Templates',
        'Email Support',
        'Standard Analytics'
      ]
    },
    {
      name: 'Professional',
      monthlyPrice: 79,
      yearlyPrice: 790,
      features: [
        '25 Website Generations per month',
        '50 Website Analyses per month',
        'Premium AI Templates',
        'Priority Support',
        'Advanced Analytics',
        'Custom Branding',
        'API Access'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      monthlyPrice: 199,
      yearlyPrice: 1990,
      features: [
        'Unlimited Website Generations',
        'Unlimited Website Analyses',
        'All AI Templates',
        '24/7 Phone Support',
        'White-label Solution',
        'Custom Integrations',
        'Dedicated Account Manager'
      ]
    }
  ]

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold gradient-text mb-6">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-200 mb-8">
            Start generating profitable affiliate websites today
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center mb-12">
            <span className={`mr-3 ${!isYearly ? 'text-white' : 'text-gray-400'}`}>Monthly</span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isYearly ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`ml-3 ${isYearly ? 'text-white' : 'text-gray-400'}`}>
              Yearly <span className="text-green-400">(Save 17%)</span>
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white/10 backdrop-blur-sm rounded-lg p-8 ${
                plan.popular ? 'ring-2 ring-red-500' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-red-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-4">{plan.name}</h3>
                <div className="text-4xl font-bold text-white mb-2">
                  ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                </div>
                <p className="text-gray-300">
                  per {isYearly ? 'year' : 'month'}
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-200">
                    <span className="text-green-400 mr-3">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href="/signup"
                className={`block w-full text-center py-3 rounded-lg font-semibold transition-colors ${
                  plan.popular
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'bg-white/20 hover:bg-white/30 text-white'
                }`}
              >
                Get Started
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
