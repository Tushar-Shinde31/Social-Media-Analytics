import express from 'express';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Mock YouTube data
const mockYouTubeData = {
  channel: {
    name: 'Social Analytics Channel',
    subscribers: 45620,
    totalViews: 2340000,
    videos: 89,
    profileImage: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=YT'
  },
  videos: [
    {
      id: 1,
      title: "Complete Social Media Analytics Guide 2024",
      thumbnail: "https://via.placeholder.com/320x180/FF0000/FFFFFF?text=Analytics+Guide",
      views: 125000,
      likes: 8900,
      comments: 456,
      publishDate: "2024-01-15T10:30:00Z",
      duration: "12:34",
      engagement_rate: 7.2
    },
    {
      id: 2,
      title: "How to Track Instagram Performance Like a Pro",
      thumbnail: "https://via.placeholder.com/320x180/FF0000/FFFFFF?text=Instagram+Pro",
      views: 89000,
      likes: 6700,
      comments: 234,
      publishDate: "2024-01-14T15:45:00Z",
      duration: "8:45",
      engagement_rate: 8.1
    },
    {
      id: 3,
      title: "Twitter Analytics: Boost Your Engagement",
      thumbnail: "https://via.placeholder.com/320x180/FF0000/FFFFFF?text=Twitter+Analytics",
      views: 156000,
      likes: 12300,
      comments: 678,
      publishDate: "2024-01-13T09:15:00Z",
      duration: "15:22",
      engagement_rate: 9.5
    },
    {
      id: 4,
      title: "YouTube Analytics Dashboard Tutorial",
      thumbnail: "https://via.placeholder.com/320x180/FF0000/FFFFFF?text=YT+Dashboard",
      views: 78000,
      likes: 5400,
      comments: 189,
      publishDate: "2024-01-12T14:20:00Z",
      duration: "10:15",
      engagement_rate: 6.8
    },
    {
      id: 5,
      title: "Cross-Platform Social Media Strategy",
      thumbnail: "https://via.placeholder.com/320x180/FF0000/FFFFFF?text=Cross+Platform",
      views: 112000,
      likes: 8900,
      comments: 345,
      publishDate: "2024-01-11T11:00:00Z",
      duration: "18:30",
      engagement_rate: 8.9
    },
    {
      id: 6,
      title: "Best Times to Post on Social Media",
      thumbnail: "https://via.placeholder.com/320x180/FF0000/FFFFFF?text=Best+Times",
      views: 134000,
      likes: 10200,
      comments: 567,
      publishDate: "2024-01-10T16:30:00Z",
      duration: "11:45",
      engagement_rate: 9.8
    }
  ],
  analytics: {
    totalViews: 694000,
    avgViews: 115667,
    totalLikes: 52200,
    avgEngagementRate: 8.4,
    topVideo: {
      title: "Twitter Analytics: Boost Your Engagement",
      views: 156000
    },
    viewsTrend: [
      { date: '2024-01-10', views: 134000 },
      { date: '2024-01-11', views: 112000 },
      { date: '2024-01-12', views: 78000 },
      { date: '2024-01-13', views: 156000 },
      { date: '2024-01-14', views: 89000 },
      { date: '2024-01-15', views: 125000 }
    ]
  }
};

// Get YouTube channel and analytics
router.get('/channel', authenticateToken, async (req, res) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    res.json({
      success: true,
      channel: mockYouTubeData.channel,
      analytics: mockYouTubeData.analytics
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch YouTube channel' });
  }
});

// Get YouTube videos
router.get('/videos', authenticateToken, async (req, res) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    res.json({
      success: true,
      videos: mockYouTubeData.videos
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch YouTube videos' });
  }
});

// Get YouTube views trends
router.get('/views-trends', authenticateToken, async (req, res) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    res.json({
      success: true,
      trends: mockYouTubeData.analytics.viewsTrend
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch YouTube views trends' });
  }
});

export default router; 