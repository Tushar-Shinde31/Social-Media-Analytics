import React from 'react';
import { FaHeart, FaRetweet, FaComment, FaCalendarAlt } from 'react-icons/fa';
import { formatNumber, formatDate } from '../../../utils/format';

const TweetCard = ({ tweet }) => {
  const { text, likes, retweets, replies, createdAt } = tweet;

  // Truncate text if it's too long
  const truncatedText = text.length > 150 ? text.substring(0, 150) + '...' : text;

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden group">
      {/* Tweet Content */}
      <div className="p-6">
        {/* Tweet Text */}
        <div className="mb-4">
          <p className="text-gray-800 text-base leading-relaxed">
            {truncatedText}
          </p>
        </div>

        {/* Stats Row */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            {/* Likes */}
            <div className="flex items-center gap-2 text-gray-600">
              <FaHeart className="text-red-500 text-sm" />
              <span className="text-sm font-medium">{formatNumber(likes)}</span>
            </div>
            
            {/* Retweets */}
            <div className="flex items-center gap-2 text-gray-600">
              <FaRetweet className="text-green-500 text-sm" />
              <span className="text-sm font-medium">{formatNumber(retweets)}</span>
            </div>

            {/* Replies */}
            <div className="flex items-center gap-2 text-gray-600">
              <FaComment className="text-blue-500 text-sm" />
              <span className="text-sm font-medium">{formatNumber(replies)}</span>
            </div>
          </div>
        </div>

        {/* Posted Date */}
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <FaCalendarAlt className="text-gray-400" />
          <span>{formatDate(createdAt)}</span>
        </div>
      </div>

      {/* Hover effect border */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-200 transition-colors duration-300 pointer-events-none"></div>
    </div>
  );
};

export default TweetCard;
