import React, { useState, useEffect } from 'react';
import { FaInstagram, FaFilter, FaArrowLeft, FaCalendarAlt } from 'react-icons/fa';
import Navbar from '../../../shared/components/Navbar';
import TopPostCard from '../components/TopPostCard';
import KPIStats from '../components/KPIStats';
import EngagementChart from '../components/EngagementChart';
import MediaTypeChart from '../components/MediaTypeChart';
import { api } from '../../../shared/utils/api';

const InstagramAnalytics = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeFilter, setTimeFilter] = useState('all'); // '7days', '30days', 'all'

  useEffect(() => {
    const fetchInstagramPosts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const token = localStorage.getItem('token');
        const response = await api.get('/instagram/posts', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        const fetchedPosts = response.data.posts || [];
        setPosts(fetchedPosts);
        setFilteredPosts(fetchedPosts);
      } catch (error) {
        console.error('Failed to fetch Instagram posts:', error);
        setError('Failed to load Instagram posts');
      } finally {
        setIsLoading(false);
      }
    };

    fetchInstagramPosts();
  }, []);

  // Filter posts based on time selection
  useEffect(() => {
    if (!posts.length) return;

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
        setFilteredPosts(posts);
        return;
    }

    const filtered = posts.filter(post => new Date(post.timestamp) >= cutoffDate);
    setFilteredPosts(filtered);
  }, [posts, timeFilter]);

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
        <Navbar />
        <div className="max-w-7xl mx-auto py-12 px-4">
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
            <span className="ml-3 text-gray-600">Loading Instagram analytics...</span>
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
              className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const connectInstagram = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await api.get('/instagram/auth/start', {
        headers: { Authorization: `Bearer ${token}` },
      });
      window.location.href = data.url;
    } catch (e) {
      setError('Failed to start Instagram OAuth');
    }
  };

  const syncLatest = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await api.post('/instagram/sync', {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const fetchedPosts = data.posts || [];
      setPosts(fetchedPosts);
      setFilteredPosts(fetchedPosts);
    } catch (e) {
      if (e?.response?.status === 401 && e?.response?.data?.code === 'IG_TOKEN_EXPIRED') {
        setError('Instagram connection expired. Please reconnect.');
      } else {
        setError('Failed to sync Instagram posts');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <Navbar />
      
      <div className="max-w-7xl mx-auto py-12 px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
          <div className="flex items-center gap-4 mb-4 sm:mb-0">
            <button 
              onClick={() => window.history.back()}
              className="p-2 rounded-lg bg-white/80 hover:bg-white transition-colors"
            >
              <FaArrowLeft className="text-gray-600" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-400 to-yellow-400 flex items-center justify-center">
                <FaInstagram className="text-white text-xl" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Instagram Analytics</h1>
                <p className="text-gray-600">Comprehensive insights into your Instagram performance</p>
              </div>
            </div>
          </div>

          {/* Actions + Filter Controls */}
          <div className="flex items-center gap-3">
            <button 
              onClick={connectInstagram}
              className="hidden sm:inline-flex bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors"
            >
              Connect Instagram
            </button>
            <button 
              onClick={syncLatest}
              className="hidden sm:inline-flex bg-white text-pink-600 border border-pink-500 px-4 py-2 rounded-lg hover:bg-pink-50 transition-colors"
            >
              Sync latest posts
            </button>
            <FaFilter className="text-gray-500" />
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              <option value="all">All Time</option>
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
            </select>
            <div className="text-sm text-gray-500">
              {filteredPosts.length} posts
            </div>
          </div>
        </div>

        {/* Filter Badge */}
        {timeFilter !== 'all' && (
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-gray-700">
              <FaCalendarAlt className="text-pink-500" />
              <span>Showing data from: <strong>{getFilterLabel(timeFilter)}</strong></span>
            </div>
          </div>
        )}

        {/* Analytics Grid */}
        <div className="space-y-8">
          {/* KPI Stats */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Key Performance Indicators</h2>
            <KPIStats posts={filteredPosts} />
          </div>

          {/* Top Post and Media Type */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Top Performing Post</h2>
              <TopPostCard posts={filteredPosts} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Content Distribution</h2>
              <MediaTypeChart posts={filteredPosts} />
            </div>
          </div>

          {/* Engagement Chart */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Engagement Trends</h2>
            <EngagementChart posts={filteredPosts} />
          </div>
        </div>

        {/* No Data State */}
        {filteredPosts.length === 0 && posts.length > 0 && (
          <div className="text-center py-20">
            <FaInstagram className="text-gray-400 text-6xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Posts in Selected Period</h3>
            <p className="text-gray-600 mb-4">
              No Instagram posts found for the selected time period. Try adjusting the filter or check back later.
            </p>
            <button 
              onClick={() => setTimeFilter('all')}
              className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition-colors"
            >
              Show All Posts
            </button>
          </div>
        )}

        {posts.length === 0 && (
          <div className="text-center py-20">
            <FaInstagram className="text-gray-400 text-6xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Instagram Posts Connected</h3>
            <p className="text-gray-600 mb-4">
              Connect your Instagram account to start seeing analytics and insights.
            </p>
            <div className="flex items-center justify-center gap-4">
              <button 
                onClick={connectInstagram}
                className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition-colors"
              >
                Connect Instagram
              </button>
              <button 
                onClick={syncLatest}
                className="bg-white text-pink-600 border border-pink-500 px-6 py-2 rounded-lg hover:bg-pink-50 transition-colors"
              >
                Sync latest posts
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstagramAnalytics; 