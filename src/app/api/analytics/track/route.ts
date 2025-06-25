import { NextRequest, NextResponse } from 'next/server'

// Mock database - replace with your actual database
const analyticsData = new Map()
const websiteStats = new Map()

export async function POST(request: NextRequest) {
  try {
    const { type, websiteId, productName, affiliateUrl, value, currency, niche, aiModel, generationTime, timestamp, userAgent, referrer } = await request.json()
    
    const userEmail = request.headers.get('x-user-email') || 'demo@user.com'
    const today = new Date().toISOString().split('T')[0]
    
    // Initialize user analytics if not exists
    if (!analyticsData.has(userEmail)) {
      analyticsData.set(userEmail, {
        totalClicks: 0,
        totalConversions: 0,
        totalRevenue: 0,
        dailyData: new Map(),
        websiteData: new Map()
      })
    }
    
    const userAnalytics = analyticsData.get(userEmail)
    
    // Initialize daily data if not exists
    if (!userAnalytics.dailyData.has(today)) {
      userAnalytics.dailyData.set(today, {
        clicks: 0,
        conversions: 0,
        revenue: 0,
        uniqueVisitors: new Set(),
        topProducts: new Map()
      })
    }
    
    const todayData = userAnalytics.dailyData.get(today)
    
    // Initialize website data if not exists
    if (websiteId && !userAnalytics.websiteData.has(websiteId)) {
      userAnalytics.websiteData.set(websiteId, {
        clicks: 0,
        conversions: 0,
        revenue: 0,
        topProducts: new Map(),
        trafficSources: new Map(),
        dailyStats: new Map()
      })
    }
    
    const websiteData = websiteId ? userAnalytics.websiteData.get(websiteId) : null
    
    switch (type) {
      case 'click':
        // Track click
        userAnalytics.totalClicks++
        todayData.clicks++
        
        if (websiteData) {
          websiteData.clicks++
          
          // Track product clicks
          if (productName) {
            const currentCount = websiteData.topProducts.get(productName) || 0
            websiteData.topProducts.set(productName, currentCount + 1)
            
            const todayProductCount = todayData.topProducts.get(productName) || 0
            todayData.topProducts.set(productName, todayProductCount + 1)
          }
          
          // Track traffic source
          if (referrer) {
            const domain = new URL(referrer).hostname
            const currentTraffic = websiteData.trafficSources.get(domain) || 0
            websiteData.trafficSources.set(domain, currentTraffic + 1)
          }
        }
        
        console.log(`🔥 REAL CLICK TRACKED: ${websiteId} - ${productName}`)
        break
        
      case 'conversion':
        // Track conversion
        const conversionValue = parseFloat(value) || 0
        userAnalytics.totalConversions++
        userAnalytics.totalRevenue += conversionValue
        todayData.conversions++
        todayData.revenue += conversionValue
        
        if (websiteData) {
          websiteData.conversions++
          websiteData.revenue += conversionValue
          
          // Track daily website stats
          if (!websiteData.dailyStats.has(today)) {
            websiteData.dailyStats.set(today, { clicks: 0, conversions: 0, revenue: 0 })
          }
          const websiteTodayStats = websiteData.dailyStats.get(today)
          websiteTodayStats.conversions++
          websiteTodayStats.revenue += conversionValue
        }
        
        console.log(`💰 REAL CONVERSION TRACKED: ${websiteId} - $${conversionValue}`)
        break
        
      case 'website_generation':
        // Track AI website generation
        console.log(`🤖 WEBSITE GENERATED: ${niche} in ${generationTime}ms`)
        break
    }
    
    // Update user analytics
    analyticsData.set(userEmail, userAnalytics)
    
    return NextResponse.json({
      success: true,
      message: `${type} tracked successfully`,
      data: {
        totalClicks: userAnalytics.totalClicks,
        totalConversions: userAnalytics.totalConversions,
        totalRevenue: userAnalytics.totalRevenue
      }
    })
    
  } catch (error: any) {
    console.error('Analytics tracking error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to track analytics' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const websiteId = url.searchParams.get('websiteId')
    const range = url.searchParams.get('range') || '7d'
    const userEmail = request.headers.get('x-user-email') || 'demo@user.com'
    
    const userAnalytics = analyticsData.get(userEmail)
    
    // Ensure conversionRate is always present, even if userAnalytics is not found
    if (!userAnalytics) {
      return NextResponse.json({
        success: true,
        data: {
          totalClicks: 0,
          totalConversions: 0,
          totalRevenue: 0,
          conversionRate: 0, // This is the crucial line added
          dailyData: [],
          websiteData: null
        }
      })
    }
    
    // Calculate date range
    const days = parseInt(range.replace('d', ''))
    const endDate = new Date()
    const startDate = new Date(endDate.getTime() - (days * 24 * 60 * 60 * 1000))
    
    // Get daily data for range
    const dailyData = []
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split('T')[0]
      const dayData = userAnalytics.dailyData.get(dateStr) || { clicks: 0, conversions: 0, revenue: 0 }
      dailyData.push({
        date: dateStr,
        clicks: dayData.clicks,
        conversions: dayData.conversions,
        revenue: dayData.revenue
      })
    }
    
    // Get website-specific data
    let websiteData = null
    if (websiteId && userAnalytics.websiteData.has(websiteId)) {
      const data = userAnalytics.websiteData.get(websiteId)
      websiteData = {
        clicks: data.clicks,
        conversions: data.conversions,
        revenue: data.revenue,
        conversionRate: data.clicks > 0 ? (data.conversions / data.clicks * 100) : 0,
        topProducts: Array.from(data.topProducts.entries()).map(([name, clicks]) => ({ name, clicks })),
        trafficSources: Array.from(data.trafficSources.entries()).map(([source, clicks]) => ({ source, clicks }))
      }
    }
    
    return NextResponse.json({
      success: true,
      data: {
        totalClicks: userAnalytics.totalClicks,
        totalConversions: userAnalytics.totalConversions,
        totalRevenue: userAnalytics.totalRevenue,
        conversionRate: userAnalytics.totalClicks > 0 ? (userAnalytics.totalConversions / userAnalytics.totalClicks * 100) : 0,
        dailyData,
        websiteData
      }
    })
    
  } catch (error: any) {
    console.error('Analytics data error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
