import express from 'express';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Mock Twitter data
const mockTwitterData = {
  profile: {
    username: '@socialanalytics',
    displayName: 'Social Analytics',
    followers: 15420,
    following: 892,
    tweets: 1247,
    profileImage: 'https://via.placeholder.com/150/1DA1F2/FFFFFF?text=SA'
  },
  tweets: [
    {
      id: 1,
      text: "Just launched our new social media analytics dashboard! 🚀 Track your Instagram, Twitter, and YouTube performance all in one place. #SocialMedia #Analytics",
      likes: 234,
      retweets: 89,
      comments: 45,
      timestamp: "2024-01-15T10:30:00Z",
      engagement_rate: 8.5
    },
    {
      id: 2,
      text: "📊 New feature alert: Cross-platform analytics comparison! Compare your performance across different social media platforms with our latest dashboard update.",
      likes: 156,
      retweets: 67,
      comments: 23,
      timestamp: "2024-01-14T15:45:00Z",
      engagement_rate: 6.2
    },
    {
      id: 3,
      text: "🔥 Hot tip: Posting at optimal times can increase your engagement by up to 40%! Use our analytics to find your best posting schedule.",
      likes: 432,
      retweets: 156,
      comments: 78,
      timestamp: "2024-01-13T09:15:00Z",
      engagement_rate: 12.1
    },
    {
      id: 4,
      text: "🎯 Understanding your audience is key to social media success. Our analytics help you identify your most engaged followers and their preferences.",
      likes: 298,
      retweets: 98,
      comments: 34,
      timestamp: "2024-01-12T14:20:00Z",
      engagement_rate: 9.3
    },
    {
      id: 5,
      text: "📈 Weekly insights: Your top performing content type this week was video posts! Consider creating more video content to boost engagement.",
      likes: 187,
      retweets: 73,
      comments: 29,
      timestamp: "2024-01-11T11:00:00Z",
      engagement_rate: 7.8
    }
  ],
  analytics: {
    totalEngagement: 2340,
    avgEngagementRate: 8.8,
    topTweet: {
      text: "🔥 Hot tip: Posting at optimal times can increase your engagement by up to 40%! Use our analytics to find your best posting schedule.",
      engagement: 666
    },
    engagementTrend: [
      { date: '2024-01-10', engagement: 156 },
      { date: '2024-01-11', engagement: 289 },
      { date: '2024-01-12', engagement: 430 },
      { date: '2024-01-13', engagement: 666 },
      { date: '2024-01-14', engagement: 223 },
      { date: '2024-01-15', engagement: 576 }
    ]
  }
};

// Get Twitter profile and analytics
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    res.json({
      success: true,
      profile: mockTwitterData.profile,
      analytics: mockTwitterData.analytics
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch Twitter profile' });
  }
});

// Get Twitter posts/tweets
router.get('/posts', authenticateToken, async (req, res) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    res.json({
      success: true,
      posts: mockTwitterData.tweets
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch Twitter posts' });
  }
});

// Get Twitter engagement trends
router.get('/engagement-trends', authenticateToken, async (req, res) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    res.json({
      success: true,
      trends: mockTwitterData.analytics.engagementTrend
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch Twitter engagement trends' });
  }
});

export default router; 