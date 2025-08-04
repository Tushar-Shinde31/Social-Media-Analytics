import React from 'react';
import { FaInstagram, FaHeart, FaComment, FaChartLine } from 'react-icons/fa';

const KPIStats = ({ posts }) => {
  if (!posts || posts.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="text-center py-8">
              <div className="w-12 h-12 bg-gray-200 rounded-full mx-auto mb-3 flex items-center justify-center">
                <FaInstagram className="text-gray-400 text-xl" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">No Data</h3>
              <p className="text-gray-600 text-sm">Connect Instagram to see stats</p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Calculate KPIs
  const totalPosts = posts.length;
  const totalLikes = posts.reduce((sum, post) => sum + post.likeCount, 0);
  const totalComments = posts.reduce((sum, post) => sum + post.commentCount, 0);
  const avgLikes = Math.round(totalLikes / totalPosts);
  const avgComments = Math.round(totalComments / totalPosts);

  const stats = [
    {
      title: 'Total Posts',
      value: totalPosts.toLocaleString(),
      icon: <FaInstagram className="text-pink-500" />,
      color: 'from-pink-400 to-pink-600',
      bgColor: 'bg-pink-50',
      textColor: 'text-pink-600'
    },
    {
      title: 'Avg. Likes',
      value: avgLikes.toLocaleString(),
      icon: <FaHeart className="text-red-500" />,
      color: 'from-red-400 to-red-600',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600'
    },
    {
      title: 'Avg. Comments',
      value: avgComments.toLocaleString(),
      icon: <FaComment className="text-blue-500" />,
      color: 'from-blue-400 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-full ${stat.bgColor} flex items-center justify-center`}>
              {stat.icon}
            </div>
            <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
              <FaChartLine className="text-white text-sm" />
            </div>
          </div>

          {/* Content */}
          <div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">{stat.title}</h3>
            <p className={`text-3xl font-bold ${stat.textColor} mb-2`}>
              {stat.value}
            </p>
            
            {/* Progress indicator */}
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full bg-gradient-to-r ${stat.color}`}
                style={{ 
                  width: `${Math.min((parseInt(stat.value.replace(/,/g, '')) / (index === 0 ? 100 : 1000)) * 100, 100)}%` 
                }}
              ></div>
            </div>
          </div>

          {/* Additional info */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">This period</span>
              <span className={`font-semibold ${stat.textColor}`}>
                {index === 0 ? `${totalPosts} posts` : 
                 index === 1 ? `${totalLikes.toLocaleString()} total` : 
                 `${totalComments.toLocaleString()} total`}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default KPIStats; 