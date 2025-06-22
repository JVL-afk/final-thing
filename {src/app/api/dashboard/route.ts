import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

export async function GET(request: NextRequest) {
  try {
    // Get token from cookie
    const token = request.cookies.get('auth-token')?.value

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as any

    // Mock dashboard stats (replace with real database queries)
    const stats = {
      totalWebsites: Math.floor(Math.random() * 20) + 5,
      totalAnalyses: Math.floor(Math.random() * 50) + 10,
      totalClicks: Math.floor(Math.random() * 1000) + 100,
      revenue: Math.floor(Math.random() * 5000) + 500,
      recentWebsites: [
        {
          id: '1',
          title: 'Tech Gadgets Hub',
          url: 'https://tech-gadgets-hub.netlify.app',
          created: '2024-06-20',
          clicks: 245,
          revenue: 89.50
        },
        {
          id: '2',
          title: 'Fitness Equipment Pro',
          url: 'https://fitness-equipment-pro.netlify.app',
          created: '2024-06-19',
          clicks: 189,
          revenue: 156.30
        }
      ],
      recentAnalyses: [
        {
          id: '1',
          url: 'https://competitor-site.com',
          score: 87,
          analyzed: '2024-06-21'
        },
        {
          id: '2',
          url: 'https://another-competitor.com',
          score: 92,
          analyzed: '2024-06-20'
        }
      ]
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Dashboard error:', error)
    return NextResponse.json({ error: 'Failed to fetch dashboard data' }, { status: 500 })
  }
}
