'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Check, CreditCard, Lock } from 'lucide-react'

export default function CheckoutPage() {
  const [selectedPlan, setSelectedPlan] = useState('pro')
  const [billingCycle, setBillingCycle] = useState('monthly')

  const plans = {
    basic: {
      name: 'Basic',
      monthly: 29,
      annual: 290,
      features: ['5 websites per month', 'Basic templates', 'Standard support']
    },
    pro: {
      name: 'Pro',
      monthly: 79,
      annual: 790,
      features: ['25 websites per month', 'Premium templates', 'Priority support', 'Custom domains']
    },
    enterprise: {
      name: 'Enterprise',
      monthly: 199,
      annual: 1990,
      features: ['Unlimited websites', 'All templates', 'API access', 'White-label solution']
    }
  }

  const currentPlan = plans[selectedPlan as keyof typeof plans]
  const price = billingCycle === 'monthly' ? currentPlan.monthly : currentPlan.annual
  const savings = billingCycle === 'annual' ? (currentPlan.monthly * 12 - currentPlan.annual) : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link href="/" className="text-2xl font-bold text-white">
              AFFILIFY
            </Link>
            <div className="flex items-center space-x-4">
              <div className="text-gray-300">
                <Lock className="h-5 w-5 inline mr-2" />
                Secure Checkout
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Order Summary */}
          <div className="order-2 lg:order-1">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>
              
              {/* Plan Selection */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-4">Select Plan</h3>
                <div className="space-y-3">
                  {Object.entries(plans).map(([key, plan]) => (
                    <div
                      key={key}
                      className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                        selectedPlan === key
                          ? 'border-purple-500 bg-purple-500/20'
                          : 'border-white/20 bg-white/5 hover:bg-white/10'
                      }`}
                      onClick={() => setSelectedPlan(key)}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-white font-semibold">{plan.name}</div>
                          <div className="text-gray-300 text-sm">
                            ${billingCycle === 'monthly' ? plan.monthly : plan.annual}
                            {billingCycle === 'monthly' ? '/month' : '/year'}
                          </div>
                        </div>
                        <div className={`w-4 h-4 rounded-full border-2 ${
                          selectedPlan === key ? 'border-purple-500 bg-purple-500' : 'border-gray-400'
                        }`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Billing Cycle */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-4">Billing Cycle</h3>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setBillingCycle('monthly')}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      billingCycle === 'monthly'
                        ? 'bg-purple-600 text-white'
                        : 'bg-white/10 text-gray-300 hover:bg-white/20'
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setBillingCycle('annual')}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      billingCycle === 'annual'
                        ? 'bg-purple-600 text-white'
                        : 'bg-white/10 text-gray-300 hover:bg-white/20'
                    }`}
                  >
                    Annual
                    {savings > 0 && (
                      <span className="ml-2 text-green-400 text-sm">Save ${savings}</span>
                    )}
                  </button>
                </div>
              </div>

              {/* Features */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-4">What's Included</h3>
                <div className="space-y-2">
                  {currentPlan.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <Check className="h-5 w-5 text-green-400 mr-3" />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="border-t border-white/20 pt-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-300">{currentPlan.name} Plan</span>
                  <span className="text-white">${price}</span>
                </div>
                {billingCycle === 'annual' && savings > 0 && (
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-green-400">Annual Discount</span>
                    <span className="text-green-400">-${savings}</span>
                  </div>
                )}
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span className="text-white">Total</span>
                  <span className="text-white">${price}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="order-1 lg:order-2">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-6">Payment Details</h2>
              
              <form className="space-y-6">
                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>

                {/* Card Information */}
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Card Information
                  </label>
                  <div className="space-y-3">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="1234 1234 1234 1234"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-12"
                      />
                      <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="MM / YY"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        placeholder="CVC"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Billing Address */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                    Cardholder Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Full name on card"
                  />
                </div>

                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-white mb-2">
                    Country
                  </label>
                  <select id="country" name="country" className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                    <option>United States</option>
                    <option>Canada</option>
                    <option>United Kingdom</option>
                    <option>Germany</option>
                    <option>France</option>
                    <option>Other</option>
                  </select>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 w-full text-lg py-4"
                >
                  Complete Payment - ${price}
                </button>

                {/* Security Notice */}
                <div className="text-center text-sm text-gray-300">
                  <Lock className="h-4 w-4 inline mr-1" />
                  Your payment information is secure and encrypted
                </div>
              </form>
            </div>

            {/* Money Back Guarantee */}
            <div className="mt-6 text-center">
              <div className="inline-flex items-center px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-lg">
                <Check className="h-5 w-5 text-green-400 mr-2" />
                <span className="text-green-400 font-semibold">30-Day Money Back Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
