'use client';

import { useState, useEffect } from 'react';

export default function AnalyticsPage() {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAnalyticsData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setLoading(false);
          return;
        }

        const response = await fetch('http://45.32.73.36:3000/api/analytics', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        } );

        if (response.ok) {
          const data = await response.json();
          setAnalyticsData(data);
        }
      } catch (error) {
        console.error('Error loading analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAnalyticsData();
  }, []);

  if (loading) {
    return <div className="p-6">Loading analytics...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Analytics Dashboard</h1>
      {analyticsData ? (
        <div>
          <p>Website generations: {analyticsData.generations || 0}</p>
          <p>AI analyses: {analyticsData.analyses || 0}</p>
        </div>
      ) : (
        <p>No analytics data available. Please log in.</p>
      )}
    </div>
  );
}

