import { NextRequest, NextResponse } from 'next/server'

// Real user data storage - will replace with database
const userDashboardData = new Map()

export async function GET(request: NextRequest) {
  try {
    // Extract user from request headers or session
    const authHeader = request.headers.get('authorization')
    const userEmail = request.headers.get('x-user-email') || 'demo@user.com'
    
    let userData = userDashboardData.get(userEmail)
    
    if (!userData) {
      // Initialize ANY USER with zero values
      const userName = extractNameFromEmail(userEmail)
      userData = {
        name: userName,
        email: userEmail,
        totalWebsites: 0,
        activeSites: 0,
        totalClicks: 0,
        revenue: 0.00,
        websites: [],
        analytics: {
          last7Days: { revenue: 0, clicks: 0, conversions: 0, conversionRate: 0 },
          last30Days: { revenue: 0, clicks: 0, conversions: 0, conversionRate: 0 },
          allTime: { revenue: 0, clicks: 0, conversions: 0, conversionRate: 0 }
        },
        createdAt: new Date().toISOString(),
        lastActive: new Date().toISOString()
      }
      userDashboardData.set(userEmail, userData)
    }

    // Update last active
    userData.lastActive = new Date().toISOString()
    userDashboardData.set(userEmail, userData)

    return NextResponse.json(userData)

  } catch (error: any) {
    console.error('Dashboard API error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to load dashboard data' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { action, data } = await request.json()
    const userEmail = request.headers.get('x-user-email') || 'demo@user.com'
    
    let userData = userDashboardData.get(userEmail)
    if (!userData) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      )
    }

    switch (action) {
      case 'add_website':
        userData.totalWebsites += 1
        userData.activeSites += 1
        userData.websites.push({
          id: Date.now().toString(),
          name: data.name,
          url: data.url,
          niche: data.niche,
          status: 'active',
          clicks: 0,
          revenue: 0,
          conversionRate: 0,
          createdAt: new Date().toISOString(),
          analytics: {
            dailyClicks: [],
            dailyRevenue: [],
            topPages: [],
            trafficSources: []
          }
        })
        break
        
      case 'track_click':
        userData.totalClicks += 1
        userData.analytics.allTime.clicks += 1
        userData.analytics.last7Days.clicks += 1
        userData.analytics.last30Days.clicks += 1
        
        const website = userData.websites.find(w => w.id === data.websiteId)
        if (website) {
          website.clicks += 1
          // Track daily clicks
          const today = new Date().toISOString().split('T')[0]
          const todayData = website.analytics.dailyClicks.find(d => d.date === today)
          if (todayData) {
            todayData.clicks += 1
          } else {
            website.analytics.dailyClicks.push({ date: today, clicks: 1 })
          }
        }
        break
        
      case 'track_conversion':
        const amount = parseFloat(data.amount) || 0
        userData.revenue += amount
        userData.analytics.allTime.revenue += amount
        userData.analytics.allTime.conversions += 1
        userData.analytics.last7Days.revenue += amount
        userData.analytics.last7Days.conversions += 1
        userData.analytics.last30Days.revenue += amount
        userData.analytics.last30Days.conversions += 1
        
        const convWebsite = userData.websites.find(w => w.id === data.websiteId)
        if (convWebsite) {
          convWebsite.revenue += amount
          convWebsite.conversionRate = convWebsite.clicks > 0 ? 
            (convWebsite.revenue / convWebsite.clicks * 100) : 0
            
          // Track daily revenue
          const today = new Date().toISOString().split('T')[0]
          const todayRevData = convWebsite.analytics.dailyRevenue.find(d => d.date === today)
          if (todayRevData) {
            todayRevData.revenue += amount
          } else {
            convWebsite.analytics.dailyRevenue.push({ date: today, revenue: amount })
          }
        }
        break
    }

    // Calculate conversion rates
    userData.analytics.allTime.conversionRate = userData.analytics.allTime.clicks > 0 ?
      (userData.analytics.allTime.conversions / userData.analytics.allTime.clicks * 100) : 0
    userData.analytics.last7Days.conversionRate = userData.analytics.last7Days.clicks > 0 ?
      (userData.analytics.last7Days.conversions / userData.analytics.last7Days.clicks * 100) : 0
    userData.analytics.last30Days.conversionRate = userData.analytics.last30Days.clicks > 0 ?
      (userData.analytics.last30Days.conversions / userData.analytics.last30Days.clicks * 100) : 0

    userDashboardData.set(userEmail, userData)
    
    return NextResponse.json({ success: true, data: userData })

  } catch (error: any) {
    console.error('Dashboard update error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update dashboard data' },
      { status: 500 }
    )
  }
}

function extractNameFromEmail(email: string): string {
  const name = email.split('@')[0]
  return name.charAt(0).toUpperCase() + name.slice(1).replace(/[._]/g, ' ')
}

