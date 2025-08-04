import React from 'react';
import { FaHeart, FaComment, FaCrown } from 'react-icons/fa';

const TopPostCard = ({ posts }) => {
  if (!posts || posts.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="text-center py-8">
          <FaCrown className="text-yellow-500 text-4xl mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">No Posts Available</h3>
          <p className="text-gray-600">Connect your Instagram account to see your top performing post.</p>
        </div>
      </div>
    );
  }

  // Find the post with the highest like count
  const topPost = posts.reduce((max, post) => 
    post.likeCount > max.likeCount ? post : max
  , posts[0]);

  const truncateCaption = (caption, maxLength = 120) => {
    if (!caption) return '';
    return caption.length > maxLength 
      ? caption.substring(0, maxLength) + '...' 
      : caption;
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
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

  return (
    <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-white/20 backdrop-blur-sm p-4 border-b border-white/20">
        <div className="flex items-center gap-3">
          <FaCrown className="text-yellow-300 text-2xl" />
          <div>
            <h3 className="text-lg font-bold text-white">Top Performing Post</h3>
            <p className="text-yellow-100 text-sm">Highest engagement</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Image Section */}
          <div className="relative aspect-square bg-white/10 rounded-lg overflow-hidden">
            {topPost.mediaUrl ? (
              <img 
                src={topPost.mediaUrl} 
                alt={topPost.caption || 'Top post'}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
            ) : null}
            <div className="hidden absolute inset-0 bg-gradient-to-br from-pink-400 to-yellow-400 flex items-center justify-center">
              <span className="text-white text-6xl">{getMediaTypeIcon(topPost.mediaType)}</span>
            </div>
            
            {/* Media type badge */}
            <div className="absolute top-3 right-3 bg-black/50 text-white px-2 py-1 rounded-full text-xs">
              {getMediaTypeIcon(topPost.mediaType)} {topPost.mediaType}
            </div>
          </div>

          {/* Details Section */}
          <div className="flex flex-col justify-between">
            {/* Caption */}
            <div className="mb-4">
              <h4 className="text-white font-semibold mb-2">Caption</h4>
              <p className="text-yellow-100 text-sm leading-relaxed">
                {topPost.caption ? truncateCaption(topPost.caption) : 'No caption'}
              </p>
            </div>

            {/* Stats */}
            <div className="space-y-3">
              <div className="flex items-center justify-between bg-white/10 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <FaHeart className="text-red-400" />
                  <span className="text-white font-semibold">Likes</span>
                </div>
                <span className="text-white font-bold text-lg">
                  {topPost.likeCount.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between bg-white/10 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <FaComment className="text-blue-400" />
                  <span className="text-white font-semibold">Comments</span>
                </div>
                <span className="text-white font-bold text-lg">
                  {topPost.commentCount.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between bg-white/10 rounded-lg p-3">
                <span className="text-white font-semibold">Posted</span>
                <span className="text-yellow-100 text-sm">
                  {formatTimestamp(topPost.timestamp)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopPostCard; 