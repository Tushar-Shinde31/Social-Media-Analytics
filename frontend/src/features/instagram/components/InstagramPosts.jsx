import React, { useState, useEffect } from 'react';
import { FaInstagram, FaHeart, FaComment, FaClock, FaChartBar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { api } from '../../../shared/utils/api';

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
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
          <FaInstagram className="text-pink-500" />
          Recent Instagram Posts
        </h2>
        <Link 
          to="/instagram-analytics" 
          className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-lg font-semibold shadow hover:from-pink-600 hover:to-purple-600 transition-all flex items-center gap-2"
        >
          <FaChartBar />
          View Analytics
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.slice(0, 6).map((post) => (
          <div key={post.id} className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">{getMediaTypeIcon(post.mediaType)}</span>
              <span className="text-sm text-gray-500">{post.mediaType}</span>
            </div>
            
            {post.mediaUrl && (
              <div className="mb-3">
                <img 
                  src={post.mediaUrl} 
                  alt={post.caption || 'Instagram post'} 
                  className="w-full h-32 object-cover rounded-lg"
                />
              </div>
            )}
            
            <div className="space-y-2">
              <p className="text-sm text-gray-700 line-clamp-3">
                {truncateCaption(post.caption, 80)}
              </p>
              
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <FaHeart className="text-pink-500" />
                    {post.likeCount || 0}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaComment className="text-blue-500" />
                    {post.commentCount || 0}
                  </span>
                </div>
                <span className="flex items-center gap-1">
                  <FaClock />
                  {formatTimestamp(post.timestamp)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstagramPosts;
