import React, { useState, useEffect } from 'react';
import { FaYoutube, FaFilter, FaArrowLeft, FaSearch, FaSort } from 'react-icons/fa';
import Navbar from '../../../components/Navbar';
import YouTubeKPIs from '../components/YouTubeKPIs';
import YouTubeVideoCard from '../components/YouTubeVideoCard';

const YouTubeAnalytics = () => {
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('recent');

  useEffect(() => {
    // Simulate loading mock data
    const loadMockData = async () => {
      try {
        setIsLoading(true);
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Import mock data
        const mockData = await import('../../../mock/youtube.json');
        setVideos(mockData.videos || []);
        setFilteredVideos(mockData.videos || []);
      } catch (error) {
        console.error('Failed to load YouTube data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMockData();
  }, []);

  // Filter and sort videos
  useEffect(() => {
    let filtered = [...videos];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(video =>
        video.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'recent':
        filtered.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
        break;
      case 'views':
        filtered.sort((a, b) => b.views - a.views);
        break;
      case 'likes':
        filtered.sort((a, b) => b.likes - a.likes);
        break;
      default:
        break;
    }

    setFilteredVideos(filtered);
  }, [videos, searchTerm, sortBy]);

  const getSortLabel = (sort) => {
    switch (sort) {
      case 'recent':
        return 'Most Recent';
      case 'views':
        return 'Most Viewed';
      case 'likes':
        return 'Most Liked';
      default:
        return 'Sort By';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
        {/* <Navbar /> */}
        <div className="max-w-7xl mx-auto py-12 px-4">
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
            <span className="ml-3 text-gray-600">Loading YouTube analytics...</span>
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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
          <div className="flex items-center gap-4 mb-4 sm:mb-0">
            <button 
              onClick={() => window.history.back()}
              className="p-2 rounded-lg bg-white/80 hover:bg-white transition-colors"
            >
              <FaArrowLeft className="text-gray-600" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-red-400 to-red-600 flex items-center justify-center">
                <FaYoutube className="text-white text-xl" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">YouTube Analytics</h1>
                <p className="text-gray-600">Comprehensive insights into your YouTube performance</p>
              </div>
            </div>
          </div>

          {/* Filter Controls */}
          <div className="flex items-center gap-3">
            <FaFilter className="text-gray-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="recent">Most Recent</option>
              <option value="views">Most Viewed</option>
              <option value="likes">Most Liked</option>
            </select>
            <div className="text-sm text-gray-500">
              {filteredVideos.length} videos
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search videos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-300 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Filter Badge */}
        {sortBy !== 'recent' && (
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-gray-700">
              <FaSort className="text-red-500" />
              <span>Sorted by: <strong>{getSortLabel(sortBy)}</strong></span>
            </div>
          </div>
        )}

        {/* Analytics Grid */}
        <div className="space-y-8">
          {/* KPI Stats */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Key Performance Indicators</h2>
            <YouTubeKPIs videos={filteredVideos} />
          </div>

          {/* Videos Grid */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Videos</h2>
            {filteredVideos.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredVideos.map((video) => (
                  <YouTubeVideoCard key={video.id} video={video} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <FaYoutube className="text-gray-400 text-6xl mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {searchTerm ? 'No videos found' : 'No YouTube videos yet'}
                </h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm 
                    ? `No videos match "${searchTerm}". Try adjusting your search.`
                    : 'Connect your YouTube account to start seeing analytics and insights.'
                  }
                </p>
                {searchTerm && (
                  <button 
                    onClick={() => setSearchTerm('')}
                    className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Clear Search
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default YouTubeAnalytics;
