import React, { useState, useEffect } from 'react';
import { FaTwitter, FaFilter, FaArrowLeft, FaCalendarAlt, FaHeart, FaRetweet, FaComment } from 'react-icons/fa';
import Navbar from '../../../components/Navbar';
import { Link } from 'react-router-dom';

// Mock Twitter data
const mockTwitterData = {
  profile: {
    username: '@socialanalytics',
    displayName: 'Social Analytics',
    followers: 15420,
    following: 892,
    tweets: 1247,
    profileImage: 'https://via.placeholder.com/150/1DA1F2/FFFFFF?text=SA'
  },
  tweets: [
    {
      id: 1,
      text: "Just launched our new social media analytics dashboard! 🚀 Track your Instagram, Twitter, and YouTube performance all in one place. #SocialMedia #Analytics",
      likes: 234,
      retweets: 89,
      comments: 45,
      timestamp: "2024-01-15T10:30:00Z",
      engagement_rate: 8.5
    },
    {
      id: 2,
      text: "📊 New feature alert: Cross-platform analytics comparison! Compare your performance across different social media platforms with our latest dashboard update.",
      likes: 156,
      retweets: 67,
      comments: 23,
      timestamp: "2024-01-14T15:45:00Z",
      engagement_rate: 6.2
    },
    {
      id: 3,
      text: "🔥 Hot tip: Posting at optimal times can increase your engagement by up to 40%! Use our analytics to find your best posting schedule.",
      likes: 432,
      retweets: 156,
      comments: 78,
      timestamp: "2024-01-13T09:15:00Z",
      engagement_rate: 12.1
    },
    {
      id: 4,
      text: "🎯 Understanding your audience is key to social media success. Our analytics help you identify your most engaged followers and their preferences.",
      likes: 298,
      retweets: 98,
      comments: 34,
      timestamp: "2024-01-12T14:20:00Z",
      engagement_rate: 9.3
    },
    {
      id: 5,
      text: "📈 Weekly insights: Your top performing content type this week was video posts! Consider creating more video content to boost engagement.",
      likes: 187,
      retweets: 73,
      comments: 29,
      timestamp: "2024-01-11T11:00:00Z",
      engagement_rate: 7.8
    }
  ],
  analytics: {
    totalEngagement: 2340,
    avgEngagementRate: 8.8,
    topTweet: {
      text: "🔥 Hot tip: Posting at optimal times can increase your engagement by up to 40%! Use our analytics to find your best posting schedule.",
      engagement: 666
    },
    engagementTrend: [
      { date: '2024-01-10', engagement: 156 },
      { date: '2024-01-11', engagement: 289 },
      { date: '2024-01-12', engagement: 430 },
      { date: '2024-01-13', engagement: 666 },
      { date: '2024-01-14', engagement: 223 },
      { date: '2024-01-15', engagement: 576 }
    ]
  }
};

const TwitterAnalytics = () => {
  const [tweets, setTweets] = useState([]);
  const [filteredTweets, setFilteredTweets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeFilter, setTimeFilter] = useState('all');
  const [profile, setProfile] = useState(null);
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    // Simulate API call
    const fetchTwitterData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setProfile(mockTwitterData.profile);
        setTweets(mockTwitterData.tweets);
        setFilteredTweets(mockTwitterData.tweets);
        setAnalytics(mockTwitterData.analytics);
      } catch (error) {
        console.error('Failed to fetch Twitter data:', error);
        setError('Failed to load Twitter analytics');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTwitterData();
  }, []);

  // Filter tweets based on time selection
  useEffect(() => {
    if (!tweets.length) return;

    const now = new Date();
    let cutoffDate;

    switch (timeFilter) {
      case '7days':
        cutoffDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '30days':
        cutoffDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      default:
        setFilteredTweets(tweets);
        return;
    }

    const filtered = tweets.filter(tweet => new Date(tweet.timestamp) >= cutoffDate);
    setFilteredTweets(filtered);
  }, [tweets, timeFilter]);

  const getFilterLabel = (filter) => {
    switch (filter) {
      case '7days':
        return 'Last 7 Days';
      case '30days':
        return 'Last 30 Days';
      default:
        return 'All Time';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
        <Navbar />
        <div className="max-w-7xl mx-auto py-12 px-4">
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <span className="ml-3 text-gray-600">Loading Twitter analytics...</span>
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
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

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
              <FaCalendarAlt className="text-gray-400" />
              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="bg-transparent border-none outline-none text-gray-700"
              >
                <option value="all">All Time</option>
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
              </select>
            </div>
          </div>
        </div>

        {/* Profile Section */}
        {profile && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex items-center space-x-4">
              <img 
                src={profile.profileImage} 
                alt={profile.displayName}
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{profile.displayName}</h1>
                <p className="text-gray-600">{profile.username}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">{profile.followers.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Followers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">{profile.following.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Following</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">{profile.tweets.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Tweets</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-500">{analytics?.avgEngagementRate}%</div>
                <div className="text-sm text-gray-600">Avg Engagement</div>
              </div>
            </div>
          </div>
        )}

        {/* Analytics Overview */}
        {analytics && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Engagement</p>
                  <p className="text-2xl font-bold text-gray-800">{analytics.totalEngagement.toLocaleString()}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <FaHeart className="text-blue-500 text-xl" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Engagement Rate</p>
                  <p className="text-2xl font-bold text-gray-800">{analytics.avgEngagementRate}%</p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <FaTwitter className="text-green-500 text-xl" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Top Tweet Engagement</p>
                  <p className="text-2xl font-bold text-gray-800">{analytics.topTweet.engagement.toLocaleString()}</p>
                </div>
                <div className="bg-yellow-100 p-3 rounded-full">
                  <FaRetweet className="text-yellow-500 text-xl" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tweets Grid */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Recent Tweets</h2>
            <div className="text-sm text-gray-600">
              Showing {filteredTweets.length} tweets ({getFilterLabel(timeFilter)})
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            {filteredTweets.map((tweet) => (
              <div key={tweet.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start space-x-3">
                  <img 
                    src={profile.profileImage} 
                    alt="Profile" 
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-semibold text-gray-800">{profile.displayName}</span>
                      <span className="text-gray-500">{profile.username}</span>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-500">{formatDate(tweet.timestamp)}</span>
                    </div>
                    
                    <p className="text-gray-800 mb-3 leading-relaxed">{tweet.text}</p>
                    
                    <div className="flex items-center space-x-6 text-gray-500">
                      <div className="flex items-center space-x-1">
                        <FaComment className="text-sm" />
                        <span className="text-sm">{tweet.comments}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FaRetweet className="text-sm" />
                        <span className="text-sm">{tweet.retweets}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FaHeart className="text-sm" />
                        <span className="text-sm">{tweet.likes}</span>
                      </div>
                      <div className="text-sm text-blue-500 font-medium">
                        {tweet.engagement_rate}% engagement
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwitterAnalytics; 