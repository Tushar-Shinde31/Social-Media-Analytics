import React, { useState, useEffect } from 'react';
import { FaInstagram, FaTwitter, FaYoutube, FaLinkedin, FaArrowLeft, FaUsers, FaChartLine, FaTrendingUp } from 'react-icons/fa';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Navbar from '../../../components/Navbar';
import { Link } from 'react-router-dom';

// Mock overview data
const mockOverviewData = {
  totalFollowers: 125430,
  totalEngagement: 45620,
  avgEngagementRate: 8.7,
  platformBreakdown: [
    { name: 'Instagram', followers: 45620, engagement: 15600, color: '#E4405F' },
    { name: 'Twitter', followers: 15420, engagement: 8900, color: '#1DA1F2' },
    { name: 'YouTube', followers: 45620, engagement: 15600, color: '#FF0000' },
    { name: 'LinkedIn', followers: 18770, engagement: 5520, color: '#0077B5' }
  ],
  engagementTrend: [
    { date: '2024-01-10', instagram: 1200, twitter: 800, youtube: 1500, linkedin: 400 },
    { date: '2024-01-11', instagram: 1350, twitter: 950, youtube: 1800, linkedin: 450 },
    { date: '2024-01-12', instagram: 1100, twitter: 700, youtube: 1200, linkedin: 350 },
    { date: '2024-01-13', instagram: 1600, twitter: 1200, youtube: 2200, linkedin: 600 },
    { date: '2024-01-14', instagram: 1400, twitter: 900, youtube: 1600, linkedin: 500 },
    { date: '2024-01-15', instagram: 1800, twitter: 1100, youtube: 2000, linkedin: 700 }
  ],
  followersTrend: [
    { date: '2024-01-10', instagram: 45000, twitter: 15000, youtube: 45000, linkedin: 18000 },
    { date: '2024-01-11', instagram: 45200, twitter: 15100, youtube: 45200, linkedin: 18100 },
    { date: '2024-01-12', instagram: 45400, twitter: 15200, youtube: 45400, linkedin: 18200 },
    { date: '2024-01-13', instagram: 45600, twitter: 15300, youtube: 45600, linkedin: 18300 },
    { date: '2024-01-14', instagram: 45800, twitter: 15400, youtube: 45800, linkedin: 18400 },
    { date: '2024-01-15', instagram: 46000, twitter: 15500, youtube: 46000, linkedin: 18500 }
  ],
  topPosts: [
    {
      platform: 'Instagram',
      content: 'Amazing sunset view from our office! 🌅',
      engagement: 2340,
      likes: 1890,
      comments: 450
    },
    {
      platform: 'Twitter',
      content: 'Just launched our new social media analytics dashboard! 🚀',
      engagement: 1890,
      likes: 1560,
      comments: 330
    },
    {
      platform: 'YouTube',
      content: 'Complete Social Media Analytics Guide 2024',
      engagement: 15600,
      views: 125000,
      likes: 8900
    }
  ]
};

const SocialOverview = () => {
  const [overviewData, setOverviewData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeFilter, setTimeFilter] = useState('7days');

  useEffect(() => {
    // Simulate API call
    const fetchOverviewData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setOverviewData(mockOverviewData);
      } catch (error) {
        console.error('Failed to fetch overview data:', error);
        setError('Failed to load overview analytics');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOverviewData();
  }, []);

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const getFilterLabel = (filter) => {
    switch (filter) {
      case '7days':
        return 'Last 7 Days';
      case '30days':
        return 'Last 30 Days';
      case '90days':
        return 'Last 90 Days';
      default:
        return 'All Time';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
        <Navbar />
        <div className="max-w-7xl mx-auto py-12 px-4">
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
            <span className="ml-3 text-gray-600">Loading overview analytics...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
        <Navbar />
        <div className="max-w-7xl mx-auto py-12 px-4">
          <div className="text-center py-20">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Analytics</h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!overviewData) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <Navbar />
      
      <div className="max-w-7xl mx-auto py-12 px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link 
              to="/"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <FaArrowLeft className="text-lg" />
              <span>Back to Dashboard</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-white rounded-lg px-4 py-2 shadow-sm">
              <FaChartLine className="text-gray-400" />
              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="bg-transparent border-none outline-none text-gray-700"
              >
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
                <option value="90days">Last 90 Days</option>
              </select>
            </div>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Followers</p>
                <p className="text-2xl font-bold text-gray-800">{formatNumber(overviewData.totalFollowers)}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <FaUsers className="text-blue-500 text-xl" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Engagement</p>
                <p className="text-2xl font-bold text-gray-800">{formatNumber(overviewData.totalEngagement)}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <FaTrendingUp className="text-green-500 text-xl" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Engagement Rate</p>
                <p className="text-2xl font-bold text-gray-800">{overviewData.avgEngagementRate}%</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <FaChartLine className="text-purple-500 text-xl" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Connected Platforms</p>
                <p className="text-2xl font-bold text-gray-800">4</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <div className="flex space-x-1">
                  <FaInstagram className="text-pink-500 text-sm" />
                  <FaTwitter className="text-blue-400 text-sm" />
                  <FaYoutube className="text-red-500 text-sm" />
                  <FaLinkedin className="text-blue-700 text-sm" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Engagement Trend Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Engagement Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={overviewData.engagementTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="instagram" stroke="#E4405F" strokeWidth={2} />
                <Line type="monotone" dataKey="twitter" stroke="#1DA1F2" strokeWidth={2} />
                <Line type="monotone" dataKey="youtube" stroke="#FF0000" strokeWidth={2} />
                <Line type="monotone" dataKey="linkedin" stroke="#0077B5" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Followers Distribution */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Followers Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={overviewData.platformBreakdown}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="followers"
                >
                  {overviewData.platformBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Platform Breakdown */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Platform Performance</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {overviewData.platformBreakdown.map((platform) => (
              <div key={platform.name} className="text-center p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  {platform.name === 'Instagram' && <FaInstagram className="text-pink-500 text-2xl" />}
                  {platform.name === 'Twitter' && <FaTwitter className="text-blue-400 text-2xl" />}
                  {platform.name === 'YouTube' && <FaYoutube className="text-red-500 text-2xl" />}
                  {platform.name === 'LinkedIn' && <FaLinkedin className="text-blue-700 text-2xl" />}
                </div>
                <h4 className="font-semibold text-gray-800 mb-1">{platform.name}</h4>
                <p className="text-2xl font-bold text-gray-800 mb-1">{formatNumber(platform.followers)}</p>
                <p className="text-sm text-gray-600">followers</p>
                <p className="text-sm text-green-600 font-medium mt-1">
                  {formatNumber(platform.engagement)} engagement
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performing Posts */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Performing Content</h3>
          <div className="space-y-4">
            {overviewData.topPosts.map((post, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100">
                    {post.platform === 'Instagram' && <FaInstagram className="text-pink-500" />}
                    {post.platform === 'Twitter' && <FaTwitter className="text-blue-400" />}
                    {post.platform === 'YouTube' && <FaYoutube className="text-red-500" />}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{post.content}</p>
                    <p className="text-sm text-gray-600">{post.platform}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-800">{formatNumber(post.engagement)}</p>
                  <p className="text-sm text-gray-600">engagement</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialOverview; 