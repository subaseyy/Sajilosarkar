import React, { useState, useEffect, useRef } from 'react';
import Sidebar from '../Components/Sidebar/Sidebar';
import Chart from 'chart.js/auto';

// Define types for issue and real-time update data
type Issue = {
  id: number;
  title: string;
  description: string;
  location: string;
  imageUrl?: string; // optional
};

type RealTimeUpdate = {
  id: number;
  message: string;
  timestamp: string;
};

interface MetricsSummary {
  totalUsers: number;
  totalIssuesReported: number;
  resolvedIssues: number;
  averageResponseTime: string;
}

const Dashboard: React.FC = () => {
  // State for metrics summary
  const [metricsSummary, setMetricsSummary] = useState<MetricsSummary>({
    totalUsers: 0,
    totalIssuesReported: 0,
    resolvedIssues: 0,
    averageResponseTime: '0 days'
  });

  // State for issues and real-time updates
  const [issues, setIssues] = useState<Issue[]>([
    {
      id: 1,
      title: 'Pothole on Main Street',
      description: 'Large pothole near the intersection.',
      location: 'Main Street, City A',
      imageUrl: 'https://example.com/pothole.jpg',
    },
    {
      id: 2,
      title: 'Broken Streetlight',
      description: 'Streetlight not working on Elm Street.',
      location: 'Elm Street, City A',
    },
  ]);

  const [realTimeUpdates, setRealTimeUpdates] = useState<RealTimeUpdate[]>([
    {
      id: 1,
      message: 'Issue 1: Under review',
      timestamp: '2024-06-26T12:30:00Z',
    },
    {
      id: 2,
      message: 'Issue 2: Scheduled for repair',
      timestamp: '2024-06-26T13:00:00Z',
    },
  ]);

  // Reference for the chart canvas element
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  // Dummy chart data
  const chartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Issues Reported',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: '#3182ce',
        borderColor: '#3182ce',
        borderWidth: 1,
      },
    ],
  };

  // Fetch metrics summary (example: replace with actual API call)
  const fetchMetricsSummary = () => {
    const dummyMetricsSummary: MetricsSummary = {
      totalUsers: 1000,
      totalIssuesReported: 500,
      resolvedIssues: 300,
      averageResponseTime: '2 days'
    };
    setMetricsSummary(dummyMetricsSummary);
  };

  useEffect(() => {
    fetchMetricsSummary();
  }, []); // Fetch metrics summary on component mount

  useEffect(() => {
    // Ensure the previous chart instance is destroyed before creating a new one
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Create new chart instance
    if (chartRef.current) {
      chartInstance.current = new Chart(chartRef.current, {
        type: 'bar',
        data: chartData,
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }

    // Clean up
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
  }, [chartData]); // Re-render chart when chartData changes

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="w-3/4 p-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">Dashboard</h1>
         
          {/* Metrics Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-100 p-4 rounded-md">
              <h2 className="text-lg font-semibold text-blue-800">Total Users</h2>
              <p className="text-2xl">{metricsSummary.totalUsers}</p>
            </div>
            <div className="bg-green-100 p-4 rounded-md">
              <h2 className="text-lg font-semibold text-green-800">Total Issues Reported</h2>
              <p className="text-2xl">{metricsSummary.totalIssuesReported}</p>
            </div>
            <div className="bg-yellow-100 p-4 rounded-md">
              <h2 className="text-lg font-semibold text-yellow-800">Resolved Issues</h2>
              <p className="text-2xl">{metricsSummary.resolvedIssues}</p>
            </div>
            <div className="bg-purple-100 p-4 rounded-md">
              <h2 className="text-lg font-semibold text-purple-800">Average Response Time</h2>
              <p className="text-2xl">{metricsSummary.averageResponseTime}</p>
            </div>
          </div>

          {/* Section for Real-Time Updates */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Real-Time Updates</h2>
            <ul className="divide-y divide-gray-200">
              {realTimeUpdates.map((update) => (
                <li key={update.id} className="py-2">
                  <p className="font-semibold">{update.message}</p>
                  <p className="text-sm text-gray-500">{new Date(update.timestamp).toLocaleString()}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Section for Chart */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Issues Reported Chart</h2>
            <div className="bg-white rounded-lg shadow-md p-4">
              <canvas ref={chartRef} id="issuesChart" width={400} height={200}></canvas>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;
