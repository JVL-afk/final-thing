import { NextRequest, NextResponse } from 'next/server';
// @ts-ignore
import clientPromise from '../../../../../lib/mongodb'; // Correct path for this file

export async function POST(request: NextRequest) {
  try {
    const { eventType, userId, data } = await request.json();

    if (!eventType || !userId) {
      return NextResponse.json(
        { success: false, error: 'Event type and user ID are required' },
        { status: 400 }
      );
    }

// @ts-ignore
    const client = await clientPromise;
    const db = client.db('affilify'); // Use your database name
    const analyticsCollection = db.collection('analyticsEvents');

    const newEvent = {
      eventType,
      userId,
      timestamp: new Date(),
      data: data || {}, // Store additional event-specific data
    };

    await analyticsCollection.insertOne(newEvent);

    console.log(`Analytics event tracked: ${eventType} for user ${userId}`);

    return NextResponse.json(
      { success: true, message: 'Analytics event tracked successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Analytics tracking error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error during analytics tracking' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const range = searchParams.get('range') || '7d'; // e.g., '7d', '30d', '365d'
    const userId = searchParams.get('userId'); // Get userId from query param

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID is required for analytics' },
        { status: 400 }
      );
    }

// @ts-ignore
    const client = await clientPromise;
    const db = client.db('affilify'); // Use your database name
    const analyticsCollection = db.collection('analyticsEvents');
    const websitesCollection = db.collection('generatedWebsites'); // Get reference to websites collection

    // --- Get total websites for the user ---
    const totalWebsiteGenerations = await websitesCollection.countDocuments({ userId });

    let startDate = new Date();
    if (range === '7d') {
      startDate.setDate(startDate.getDate() - 7);
    } else if (range === '30d') {
      startDate.setDate(startDate.getDate() - 30);
    } else if (range === '365d') {
      startDate.setFullYear(startDate.getFullYear() - 1);
    } else {
      // Default to a long range if invalid
      startDate.setFullYear(startDate.getFullYear() - 1);
    }

    // Fetch events for the specified user and time range
    const events = await analyticsCollection.find({
      userId: userId,
      timestamp: { $gte: startDate }
    }).toArray();

    // Aggregate data for dashboard display
    let totalClicks = 0;
    let totalConversions = 0;
    let totalRevenue = 0;
    // totalWebsiteGenerations is now fetched directly from websitesCollection

    // Daily performance data
    const dailyPerformanceMap = new Map(); // Date string -> { clicks, conversions, revenue }

// @ts-ignore
    events.forEach(event => {
      const dateStr = event.timestamp.toISOString().split('T')[0]; // YYYY-MM-DD

      if (!dailyPerformanceMap.has(dateStr)) {
        dailyPerformanceMap.set(dateStr, { clicks: 0, conversions: 0, revenue: 0 });
      }
      const dailyStats = dailyPerformanceMap.get(dateStr);

      if (event.eventType === 'click') {
        totalClicks++;
        dailyStats.clicks++;
      } else if (event.eventType === 'conversion') {
        totalConversions++;
        const revenue = event.data?.revenue || 0;
        totalRevenue += revenue;
        dailyStats.conversions++;
        dailyStats.revenue += revenue;
      }
      // No need to count website_generation events here, as we get total from websitesCollection
    });

    // Convert map to sorted array for daily performance chart
    const dailyPerformance = Array.from(dailyPerformanceMap.entries())
      .sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
      .map(([date, stats]) => ({ date, ...stats }));

    const conversionRate = totalClicks > 0 ? (totalConversions / totalClicks) * 100 : 0;

    return NextResponse.json({
      success: true,
      analytics: {
        totalClicks,
        totalConversions,
        totalRevenue,
        totalWebsiteGenerations, // Ensure this is included in the response
        conversionRate: conversionRate.toFixed(2), // Format to 2 decimal places
        dailyPerformance,
      },
    });

  } catch (error: any) {
    console.error('Analytics data fetch error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error fetching analytics' },
      { status: 500 }
    );
  }
}

