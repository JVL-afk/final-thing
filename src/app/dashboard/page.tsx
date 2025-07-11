'use client';

import { useEffect, useState } from 'react';

// Define interfaces for the data structures
interface DailyPerformanceItem {
  date: string;
  clicks: number;
  conversions: number;
  revenue: number;
}

interface AnalyticsData {
  dailyPerformance: DailyPerformanceItem[];
  // Add other properties of your analytics data if they exist
}

export default function DashboardPage() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAnalyticsData() {
      try {
        // In a real application, you would fetch this data from your backend API
        // For now, we'll use mock data
        const mockData: AnalyticsData = {
          dailyPerformance: [
            { date: '2025-07-01', clicks: 100, conversions: 10, revenue: 500 },
            { date: '2025-07-02', clicks: 120, conversions: 12, revenue: 600 },
            { date: '2025-07-03', clicks: 150, conversions: 15, revenue: 750 },
          ],
        };
        setAnalyticsData(mockData);
      } catch (err) {
        setError('Failed to fetch analytics data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchAnalyticsData();
  }, []);

  if (loading) {
    return <p>Loading dashboard data...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  // Dummy data for daily performance chart (replace with actual data from analytics.dailyPerformance)
  const dailyPerformanceData = analyticsData?.dailyPerformance.map((item: DailyPerformanceItem) => ({
    date: item.date,
    clicks: item.clicks,
    conversions: item.conversions,
    revenue: item.revenue,
  })) || [];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1>
      {analyticsData ? (
        <div>
          <h2 className="text-xl font-semibold mb-2">Daily Performance</h2>
          {dailyPerformanceData.length > 0 ? (
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Date</th>
                  <th className="py-2 px-4 border-b">Clicks</th>
                  <th className="py-2 px-4 border-b">Conversions</th>
                  <th className="py-2 px-4 border-b">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {dailyPerformanceData.map((data, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b">{data.date}</td>
                    <td className="py-2 px-4 border-b">{data.clicks}</td>
                    <td className="py-2 px-4 border-b">{data.conversions}</td>
                    <td className="py-2 px-4 border-b">{data.revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No daily performance data available.</p>
          )}
        </div>
      ) : (
        <p>No dashboard data available.</p>
      )}
    </div>
  );
}
