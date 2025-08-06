import React, { useState, useEffect } from 'react';
import { FaYoutube, FaFilter, FaArrowLeft, FaCalendarAlt, FaEye, FaThumbsUp, FaComment, FaPlay } from 'react-icons/fa';
import Navbar from '../../../components/Navbar';
import { Link } from 'react-router-dom';

// Mock YouTube data
const mockYouTubeData = {
  channel: {
    name: 'Social Analytics Channel',
    subscribers: 45620,
    totalViews: 2340000,
    videos: 89,
    profileImage: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=YT'
  },
  videos: [
    {
      id: 1,
      title: "Complete Social Media Analytics Guide 2024",
      thumbnail: "https://via.placeholder.com/320x180/FF0000/FFFFFF?text=Analytics+Guide",
      views: 125000,
      likes: 8900,
      comments: 456,
      publishDate: "2024-01-15T10:30:00Z",
      duration: "12:34",
      engagement_rate: 7.2
    },
    {
      id: 2,
      title: "How to Track Instagram Performance Like a Pro",
      thumbnail: "https://via.placeholder.com/320x180/FF0000/FFFFFF?text=Instagram+Pro",
      views: 89000,
      likes: 6700,
      comments: 234,
      publishDate: "2024-01-14T15:45:00Z",
      duration: "8:45",
      engagement_rate: 8.1
    },
    {
      id: 3,
      title: "Twitter Analytics: Boost Your Engagement",
      thumbnail: "https://via.placeholder.com/320x180/FF0000/FFFFFF?text=Twitter+Analytics",
      views: 156000,
      likes: 12300,
      comments: 678,
      publishDate: "2024-01-13T09:15:00Z",
      duration: "15:22",
      engagement_rate: 9.5
    },
    {
      id: 4,
      title: "YouTube Analytics Dashboard Tutorial",
      thumbnail: "https://via.placeholder.com/320x180/FF0000/FFFFFF?text=YT+Dashboard",
      views: 78000,
      likes: 5400,
      comments: 189,
      publishDate: "2024-01-12T14:20:00Z",
      duration: "10:15",
      engagement_rate: 6.8
    },
    {
      id: 5,
      title: "Cross-Platform Social Media Strategy",
      thumbnail: "https://via.placeholder.com/320x180/FF0000/FFFFFF?text=Cross+Platform",
      views: 112000,
      likes: 8900,
      comments: 345,
      publishDate: "2024-01-11T11:00:00Z",
      duration: "18:30",
      engagement_rate: 8.9
    },
    {
      id: 6,
      title: "Best Times to Post on Social Media",
      thumbnail: "https://via.placeholder.com/320x180/FF0000/FFFFFF?text=Best+Times",
      views: 134000,
      likes: 10200,
      comments: 567,
      publishDate: "2024-01-10T16:30:00Z",
      duration: "11:45",
      engagement_rate: 9.8
    }
  ],
  analytics: {
    totalViews: 694000,
    avgViews: 115667,
    totalLikes: 52200,
    avgEngagementRate: 8.4,
    topVideo: {
      title: "Twitter Analytics: Boost Your Engagement",
      views: 156000
    },
    viewsTrend: [
      { date: '2024-01-10', views: 134000 },
      { date: '2024-01-11', views: 112000 },
      { date: '2024-01-12', views: 78000 },
      { date: '2024-01-13', views: 156000 },
      { date: '2024-01-14', views: 89000 },
      { date: '2024-01-15', views: 125000 }
    ]
  }
};

const YouTubeAnalytics = () => {
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeFilter, setTimeFilter] = useState('all');
  const [channel, setChannel] = useState(null);
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    // Simulate API call
    const fetchYouTubeData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setChannel(mockYouTubeData.channel);
        setVideos(mockYouTubeData.videos);
        setFilteredVideos(mockYouTubeData.videos);
        setAnalytics(mockYouTubeData.analytics);
      } catch (error) {
        console.error('Failed to fetch YouTube data:', error);
        setError('Failed to load YouTube analytics');
      } finally {
        setIsLoading(false);
      }
    };

    fetchYouTubeData();
  }, []);

  // Filter videos based on time selection
  useEffect(() => {
    if (!videos.length) return;

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
        setFilteredVideos(videos);
        return;
    }

    const filtered = videos.filter(video => new Date(video.publishDate) >= cutoffDate);
    setFilteredVideos(filtered);
  }, [videos, timeFilter]);

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
      year: 'numeric'
    });
  };

  const formatViews = (views) => {
    if (views >= 1000000) {
      return (views / 1000000).toFixed(1) + 'M';
    } else if (views >= 1000) {
      return (views / 1000).toFixed(1) + 'K';
    }
    return views.toString();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
        <Navbar />
        <div className="max-w-7xl mx-auto py-12 px-4">
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
            <span className="ml-3 text-gray-600">Loading YouTube analytics...</span>
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
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors"
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

        {/* Channel Section */}
        {channel && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex items-center space-x-4">
              <img 
                src={channel.profileImage} 
                alt={channel.name}
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{channel.name}</h1>
                <p className="text-gray-600">YouTube Channel</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">{channel.subscribers.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Subscribers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">{formatViews(channel.totalViews)}</div>
                <div className="text-sm text-gray-600">Total Views</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">{channel.videos}</div>
                <div className="text-sm text-gray-600">Videos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-500">{analytics?.avgEngagementRate}%</div>
                <div className="text-sm text-gray-600">Avg Engagement</div>
              </div>
            </div>
          </div>
        )}

        {/* Analytics Overview */}
        {analytics && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Views</p>
                  <p className="text-2xl font-bold text-gray-800">{formatViews(analytics.totalViews)}</p>
                </div>
                <div className="bg-red-100 p-3 rounded-full">
                  <FaEye className="text-red-500 text-xl" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Views</p>
                  <p className="text-2xl font-bold text-gray-800">{formatViews(analytics.avgViews)}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <FaPlay className="text-blue-500 text-xl" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Likes</p>
                  <p className="text-2xl font-bold text-gray-800">{analytics.totalLikes.toLocaleString()}</p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <FaThumbsUp className="text-green-500 text-xl" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Top Video Views</p>
                  <p className="text-2xl font-bold text-gray-800">{formatViews(analytics.topVideo.views)}</p>
                </div>
                <div className="bg-yellow-100 p-3 rounded-full">
                  <FaYoutube className="text-yellow-500 text-xl" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Videos Grid */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Recent Videos</h2>
            <div className="text-sm text-gray-600">
              Showing {filteredVideos.length} videos ({getFilterLabel(timeFilter)})
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video) => (
              <div key={video.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                    <FaPlay className="text-white text-3xl opacity-0 hover:opacity-100 transition-opacity" />
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{video.title}</h3>
                  
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                    <span>{formatDate(video.publishDate)}</span>
                    <span className="text-red-500 font-medium">{video.engagement_rate}% engagement</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <FaEye className="text-sm" />
                      <span>{formatViews(video.views)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <FaThumbsUp className="text-sm" />
                      <span>{video.likes.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <FaComment className="text-sm" />
                      <span>{video.comments}</span>
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

export default YouTubeAnalytics; 