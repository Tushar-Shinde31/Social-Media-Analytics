import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { FaHeart, FaComment, FaCalendarAlt } from 'react-icons/fa';

const EngagementChart = ({ posts }) => {
  const [selectedMetric, setSelectedMetric] = useState('likes'); // 'likes' or 'comments'

  if (!posts || posts.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="text-center py-12">
          <FaHeart className="text-gray-400 text-4xl mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">No Engagement Data</h3>
          <p className="text-gray-600">Connect your Instagram account to see engagement trends.</p>
        </div>
      </div>
    );
  }

  // Process data for charts
  const chartData = useMemo(() => {
    // Sort posts by timestamp
    const sortedPosts = [...posts].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    
    return sortedPosts.map(post => ({
      date: new Date(post.timestamp).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      }),
      likes: post.likeCount,
      comments: post.commentCount,
      timestamp: new Date(post.timestamp).getTime()
    }));
  }, [posts]);

  const metrics = [
    {
      key: 'likes',
      label: 'Likes',
      icon: <FaHeart className="text-red-500" />,
      color: '#ef4444',
      gradient: 'from-red-400 to-red-600'
    },
    {
      key: 'comments',
      label: 'Comments',
      icon: <FaComment className="text-blue-500" />,
      color: '#3b82f6',
      gradient: 'from-blue-400 to-blue-600'
    }
  ];

  const selectedMetricData = metrics.find(m => m.key === selectedMetric);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <div className="flex items-center gap-3 mb-4 sm:mb-0">
          <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${selectedMetricData.gradient} flex items-center justify-center`}>
            {selectedMetricData.icon}
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Engagement Over Time</h3>
            <p className="text-gray-600 text-sm">Track your {selectedMetric} performance</p>
          </div>
        </div>

        {/* Metric Toggle */}
        <div className="flex bg-gray-100 rounded-lg p-1">
          {metrics.map((metric) => (
            <button
              key={metric.key}
              onClick={() => setSelectedMetric(metric.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                selectedMetric === metric.key
                  ? 'bg-white text-gray-800 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {metric.icon}
              {metric.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis 
              dataKey="date" 
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              labelStyle={{ fontWeight: 'bold', color: '#374151' }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey={selectedMetric}
              stroke={selectedMetricData.color}
              strokeWidth={3}
              dot={{ fill: selectedMetricData.color, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: selectedMetricData.color, strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Stats */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-gray-800">
            {Math.max(...chartData.map(d => d[selectedMetric]))?.toLocaleString() || 0}
          </div>
          <div className="text-sm text-gray-600">Peak {selectedMetric}</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-gray-800">
            {Math.round(chartData.reduce((sum, d) => sum + d[selectedMetric], 0) / chartData.length)?.toLocaleString() || 0}
          </div>
          <div className="text-sm text-gray-600">Average {selectedMetric}</div>
        </div>
      </div>
    </div>
  );
};

export default EngagementChart;
