import React, { useState, useEffect } from 'react';
import { FaInstagram, FaHeart, FaComment, FaClock, FaChartBar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { api } from '../utils/api';

const InstagramPosts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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
        
        setPosts(response.data.posts || []);
      } catch (error) {
        console.error('Failed to fetch Instagram posts:', error);
        setError('Failed to load Instagram posts');
      } finally {
        setIsLoading(false);
      }
    };

    fetchInstagramPosts();
  }, []);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const truncateCaption = (caption, maxLength = 100) => {
    if (!caption) return '';
    return caption.length > maxLength 
      ? caption.substring(0, maxLength) + '...' 
      : caption;
  };

  const getMediaTypeIcon = (mediaType) => {
    switch (mediaType) {
      case 'VIDEO':
        return '🎥';
      case 'CAROUSEL_ALBUM':
        return '📷';
      default:
        return '📸';
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
          <span className="ml-3 text-gray-600">Loading Instagram posts...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <div className="text-center py-12">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Posts</h3>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <div className="text-center py-12">
          <FaInstagram className="text-pink-500 text-6xl mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No Instagram Posts</h3>
          <p className="text-gray-600">No Instagram posts connected yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <FaInstagram className="text-pink-500 text-2xl" />
          <h2 className="text-2xl font-bold text-gray-800">Instagram Posts</h2>
          <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm font-medium">
            {posts.length} posts
          </span>
        </div>
        <Link
          to="/instagram-analytics"
          className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <FaChartBar />
          <span>View Analytics</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-gray-50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
            {/* Media Section */}
            <div className="relative aspect-square bg-gray-200">
              {post.mediaUrl ? (
                <img 
                  src={post.mediaUrl} 
                  alt={post.caption || 'Instagram post'}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div className="hidden absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end justify-start p-3">
                <span className="text-white text-2xl">{getMediaTypeIcon(post.mediaType)}</span>
              </div>
              
              {/* Fallback for failed images */}
              <div className="hidden absolute inset-0 bg-gradient-to-br from-pink-400 to-yellow-400 flex items-center justify-center">
                <span className="text-white text-4xl">{getMediaTypeIcon(post.mediaType)}</span>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-4">
              {/* Caption */}
              {post.caption && (
                <p className="text-gray-700 text-sm mb-3 overflow-hidden text-ellipsis whitespace-nowrap">
                  {truncateCaption(post.caption, 80)}
                </p>
              )}

              {/* Stats */}
              <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                <div className="flex items-center gap-1">
                  <FaHeart className="text-red-500" />
                  <span>{post.likeCount.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaComment className="text-blue-500" />
                  <span>{post.commentCount.toLocaleString()}</span>
                </div>
              </div>

              {/* Timestamp */}
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <FaClock />
                <span>{formatTimestamp(post.timestamp)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstagramPosts; 