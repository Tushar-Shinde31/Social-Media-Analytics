import React, { useState, useEffect } from 'react';
import { FaTwitter, FaFilter, FaArrowLeft, FaSearch, FaSort } from 'react-icons/fa';
import Navbar from '../../../shared/components/Navbar';
import TwitterKPIs from '../components/TwitterKPIs';
import TweetCard from '../components/TweetCard';

const TwitterAnalytics = () => {
  const [tweets, setTweets] = useState([]);
  const [filteredTweets, setFilteredTweets] = useState([]);
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
        const mockData = await import('../../../shared/utils/mock/twitter.json');
        setTweets(mockData.tweets || []);
        setFilteredTweets(mockData.tweets || []);
      } catch (error) {
        console.error('Failed to load Twitter data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMockData();
  }, []);

  // Filter and sort tweets
  useEffect(() => {
    let filtered = [...tweets];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(tweet =>
        tweet.text.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'recent':
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'likes':
        filtered.sort((a, b) => b.likes - a.likes);
        break;
      case 'retweets':
        filtered.sort((a, b) => b.retweets - a.retweets);
        break;
      default:
        break;
    }

    setFilteredTweets(filtered);
  }, [tweets, searchTerm, sortBy]);

  const getSortLabel = (sort) => {
    switch (sort) {
      case 'recent':
        return 'Most Recent';
      case 'likes':
        return 'Most Liked';
      case 'retweets':
        return 'Most Retweeted';
      default:
        return 'Sort By';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
        <div className="max-w-7xl mx-auto py-12 px-4">
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <span className="ml-3 text-gray-600">Loading Twitter analytics...</span>
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
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
                <FaTwitter className="text-white text-xl" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Twitter Analytics</h1>
                <p className="text-gray-600">Comprehensive insights into your Twitter performance</p>
              </div>
            </div>
          </div>

          {/* Filter Controls */}
          <div className="flex items-center gap-3">
            <FaFilter className="text-gray-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="recent">Most Recent</option>
              <option value="likes">Most Liked</option>
              <option value="retweets">Most Retweeted</option>
            </select>
            <div className="text-sm text-gray-500">
              {filteredTweets.length} tweets
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search tweets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-300 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Filter Badge */}
        {sortBy !== 'recent' && (
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-gray-700">
              <FaSort className="text-blue-500" />
              <span>Sorted by: <strong>{getSortLabel(sortBy)}</strong></span>
            </div>
          </div>
        )}

        {/* Analytics Grid */}
        <div className="space-y-8">
          {/* KPI Stats */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Key Performance Indicators</h2>
            <TwitterKPIs tweets={filteredTweets} />
          </div>

          {/* Tweets Grid */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Tweets</h2>
            {filteredTweets.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredTweets.map((tweet) => (
                  <TweetCard key={tweet.id} tweet={tweet} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <FaTwitter className="text-gray-400 text-6xl mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {searchTerm ? 'No tweets found' : 'No Twitter tweets yet'}
                </h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm 
                    ? `No tweets match "${searchTerm}". Try adjusting your search.`
                    : 'Connect your Twitter account to start seeing analytics and insights.'
                  }
                </p>
                {searchTerm && (
                  <button 
                    onClick={() => setSearchTerm('')}
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
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

export default TwitterAnalytics;
