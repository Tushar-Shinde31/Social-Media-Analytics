import React from 'react';
import { FaPlay, FaThumbsUp, FaCalendarAlt } from 'react-icons/fa';
import { formatNumber, formatDate } from '../../../shared/utils/format';

const YouTubeVideoCard = ({ video }) => {
  const { title, thumbnailUrl, views, likes, publishedAt } = video;

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden group">
      {/* Thumbnail */}
      <div className="relative overflow-hidden">
        <img
          src={thumbnailUrl}
          alt={title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x225/ff0000/ffffff?text=Video+Thumbnail';
          }}
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
        
        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-lg group-hover:bg-red-700 transition-colors duration-300">
            <FaPlay className="text-white text-xl ml-1" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="font-semibold text-gray-800 text-lg mb-3 line-clamp-2 leading-tight">
          {title}
        </h3>

        {/* Stats Row */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            {/* Views */}
            <div className="flex items-center gap-2 text-gray-600">
              <FaPlay className="text-red-500 text-sm" />
              <span className="text-sm font-medium">{formatNumber(views)}</span>
            </div>
            
            {/* Likes */}
            <div className="flex items-center gap-2 text-gray-600">
              <FaThumbsUp className="text-blue-500 text-sm" />
              <span className="text-sm font-medium">{formatNumber(likes)}</span>
            </div>
          </div>
        </div>

        {/* Upload Date */}
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <FaCalendarAlt className="text-gray-400" />
          <span>{formatDate(publishedAt)}</span>
        </div>
      </div>

      {/* Hover effect border */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-red-200 transition-colors duration-300 pointer-events-none"></div>
    </div>
  );
};

export default YouTubeVideoCard;
