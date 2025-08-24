import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { FaImage, FaVideo, FaImages } from 'react-icons/fa';

const MediaTypeChart = ({ posts }) => {
  if (!posts || posts.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="text-center py-12">
          <FaImage className="text-gray-400 text-4xl mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">No Media Data</h3>
          <p className="text-gray-600">Connect your Instagram account to see media type breakdown.</p>
        </div>
      </div>
    );
  }

  // Process data for pie chart
  const chartData = useMemo(() => {
    const mediaTypeCounts = posts.reduce((acc, post) => {
      const type = post.mediaType || 'IMAGE';
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});

    const colors = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];
    
    return Object.entries(mediaTypeCounts).map(([type, count], index) => ({
      name: type,
      value: count,
      color: colors[index % colors.length],
      percentage: Math.round((count / posts.length) * 100)
    }));
  }, [posts]);

  const getMediaTypeIcon = (mediaType) => {
    switch (mediaType) {
      case 'VIDEO':
        return <FaVideo className="text-blue-500" />;
      case 'CAROUSEL_ALBUM':
        return <FaImages className="text-purple-500" />;
      default:
        return <FaImage className="text-red-500" />;
    }
  };

  const getMediaTypeLabel = (mediaType) => {
    switch (mediaType) {
      case 'VIDEO':
        return 'Videos';
      case 'CAROUSEL_ALBUM':
        return 'Carousels';
      default:
        return 'Images';
    }
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-800">{getMediaTypeLabel(data.name)}</p>
          <p className="text-gray-600">
            {data.value} posts ({data.percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }) => {
    return (
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {payload.map((entry, index) => (
          <div key={`legend-${index}`} className="flex items-center gap-2">
            <div 
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm text-gray-700">
              {getMediaTypeLabel(entry.value)} ({entry.payload.percentage}%)
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-purple-600 flex items-center justify-center">
          <FaImage className="text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">Media Type Breakdown</h3>
          <p className="text-gray-600 text-sm">Distribution of your content types</p>
        </div>
      </div>

      {/* Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percentage }) => `${percentage}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Stats */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {chartData.map((item, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              {getMediaTypeIcon(item.name)}
              <span className="text-sm font-medium text-gray-700">
                {getMediaTypeLabel(item.name)}
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-800">{item.value}</div>
            <div className="text-sm text-gray-600">{item.percentage}% of total</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaTypeChart;
