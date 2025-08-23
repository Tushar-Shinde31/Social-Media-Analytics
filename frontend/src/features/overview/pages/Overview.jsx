import React, { useState, useEffect } from 'react';
import { FaUsers, FaHeart, FaComment, FaTwitter, FaEye, FaChartLine, FaArrowLeft } from 'react-icons/fa';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Navbar from '../../../components/Navbar';
import { overviewData } from '../../../mock/overviewData';
import { formatNumber } from '../../../utils/format';

const Overview = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading mock data
    const loadMockData = async () => {
      try {
        setIsLoading(true);
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setData(overviewData);
      } catch (error) {
        console.error('Failed to load overview data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMockData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
        <div className="max-w-7xl mx-auto py-12 px-4">
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <span className="ml-3 text-gray-600">Loading overview analytics...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
        <Navbar />
        <div className="max-w-7xl mx-auto py-12 px-4">
          <div className="text-center py-20">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Failed to load overview data</h3>
            <p className="text-gray-600">Please try refreshing the page.</p>
          </div>
        </div>
      </div>
    );
  }

  const { totals, engagementTrends, platformComparison } = data;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <Navbar />
      
      <div className="max-w-7xl mx-auto py-12 px-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => window.history.back()}
            className="p-2 rounded-lg bg-white/80 hover:bg-white transition-colors"
          >
            <FaArrowLeft className="text-gray-600" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-400 to-pink-600 flex items-center justify-center">
              <FaChartLine className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Overview Analytics</h1>
              <p className="text-gray-600">Cross-platform insights and performance metrics</p>
            </div>
          </div>
        </div>

        {/* Top Section - Total Followers */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl p-8 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold mb-2">Total Audience</h2>
                <p className="text-purple-100">Combined followers across all platforms</p>
              </div>
              <div className="text-right">
                <div className="text-5xl font-bold">{formatNumber(totals.followers)}</div>
                <div className="text-purple-100">Followers</div>
              </div>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Key Performance Indicators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Likes */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
                  <FaHeart className="text-red-500 text-xl" />
                </div>
                <div className="w-16 h-2 rounded-full bg-gradient-to-r from-red-400 to-red-600"></div>
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Likes</h3>
              <div className="text-3xl font-bold text-gray-800">{formatNumber(totals.likes)}</div>
              <div className="mt-4">
                <div className="w-full h-1 rounded-full bg-gradient-to-r from-red-400 to-red-600"></div>
              </div>
            </div>

            {/* Total Comments */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                  <FaComment className="text-blue-500 text-xl" />
                </div>
                <div className="w-16 h-2 rounded-full bg-gradient-to-r from-blue-400 to-blue-600"></div>
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Comments</h3>
              <div className="text-3xl font-bold text-gray-800">{formatNumber(totals.comments)}</div>
              <div className="mt-4">
                <div className="w-full h-1 rounded-full bg-gradient-to-r from-blue-400 to-blue-600"></div>
              </div>
            </div>

            {/* Total Tweets */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                  <FaTwitter className="text-blue-500 text-xl" />
                </div>
                <div className="w-16 h-2 rounded-full bg-gradient-to-r from-blue-400 to-blue-600"></div>
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Tweets</h3>
              <div className="text-3xl font-bold text-gray-800">{formatNumber(totals.tweets)}</div>
              <div className="mt-4">
                <div className="w-full h-1 rounded-full bg-gradient-to-r from-blue-400 to-blue-600"></div>
              </div>
            </div>

            {/* Total Views */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
                  <FaEye className="text-red-500 text-xl" />
                </div>
                <div className="w-16 h-2 rounded-full bg-gradient-to-r from-red-400 to-red-600"></div>
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Views</h3>
              <div className="text-3xl font-bold text-gray-800">{formatNumber(totals.views)}</div>
              <div className="mt-4">
                <div className="w-full h-1 rounded-full bg-gradient-to-r from-red-400 to-red-600"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="space-y-8">
          {/* Engagement Trends Line Chart */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Engagement Trends (Last 7 Days)</h2>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={engagementTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="day" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="likes" 
                    stroke="#ef4444" 
                    strokeWidth={3} 
                    dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="comments" 
                    stroke="#3b82f6" 
                    strokeWidth={3} 
                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="retweets" 
                    stroke="#10b981" 
                    strokeWidth={3} 
                    dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="views" 
                    stroke="#8b5cf6" 
                    strokeWidth={3} 
                    dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Platform Comparison Bar Chart */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Platform Performance Comparison</h2>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={platformComparison}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="platform" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="likes" fill="#ef4444" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="comments" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="retweets" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="views" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="followers" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="subscribers" fill="#ec4899" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
