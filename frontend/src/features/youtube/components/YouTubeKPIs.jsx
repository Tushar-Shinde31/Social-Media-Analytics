import React from 'react';
import { FaPlay, FaEye, FaChartLine } from 'react-icons/fa';
import { formatNumber } from '../../../utils/format';

const YouTubeKPIs = ({ videos }) => {
  if (!videos || videos.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  const totalVideos = videos.length;
  const totalViews = videos.reduce((sum, video) => sum + video.views, 0);
  const avgViews = totalVideos > 0 ? Math.round(totalViews / totalVideos) : 0;

  const kpiData = [
    {
      title: 'Total Videos',
      value: totalVideos,
      icon: <FaPlay className="text-red-500" />,
      color: 'from-red-400 to-red-600',
      bgColor: 'bg-red-50'
    },
    {
      title: 'Total Views',
      value: formatNumber(totalViews),
      icon: <FaEye className="text-blue-500" />,
      color: 'from-blue-400 to-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Avg Views/Video',
      value: formatNumber(avgViews),
      icon: <FaChartLine className="text-green-500" />,
      color: 'from-green-400 to-green-600',
      bgColor: 'bg-green-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {kpiData.map((kpi, index) => (
        <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-xl ${kpi.bgColor} flex items-center justify-center`}>
              {kpi.icon}
            </div>
            <div className={`w-16 h-2 rounded-full bg-gradient-to-r ${kpi.color}`}></div>
          </div>
          
          <div className="mb-2">
            <h3 className="text-lg font-semibold text-gray-700">{kpi.title}</h3>
          </div>
          
          <div className="text-3xl font-bold text-gray-800">
            {kpi.value}
          </div>
          
          <div className="mt-4">
            <div className={`w-full h-1 rounded-full bg-gradient-to-r ${kpi.color}`}></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default YouTubeKPIs;
