# 🚀 Social Media Analytics Dashboard

A comprehensive full-stack social media analytics platform that provides insights across multiple platforms including Instagram, Twitter, YouTube, and LinkedIn.

## ✨ Features

### 🔐 Authentication & Security
- **JWT-based Authentication**: Secure login/signup system
- **Protected Routes**: All dashboard pages require authentication
- **Token Expiry Handling**: Automatic logout on token expiration
- **User Session Management**: Persistent login state with graceful expiry

### 📊 Multi-Platform Analytics

#### 🐦 Twitter Analytics
- **Profile Overview**: Followers, following, tweets count
- **Tweet Analytics**: Recent tweets with engagement metrics
- **Engagement Tracking**: Likes, retweets, comments analysis
- **Time Filtering**: Filter data by 7 days, 30 days, or all time
- **Mock OAuth Integration**: Ready for real Twitter API integration

#### 📺 YouTube Analytics
- **Channel Overview**: Subscribers, total views, video count
- **Video Performance**: Thumbnails, views, likes, comments
- **Engagement Metrics**: View counts, like ratios, comment analysis
- **Video Grid Layout**: Beautiful card-based video display
- **Duration & Publish Dates**: Complete video metadata

#### 📈 Social Overview Dashboard
- **Cross-Platform Insights**: Total followers across all platforms
- **Engagement Trends**: Line charts showing platform performance
- **Followers Distribution**: Pie chart breakdown by platform
- **Top Performing Content**: Best posts across all platforms
- **Real-time Charts**: Using Recharts for beautiful visualizations

#### 📸 Instagram Analytics (Existing)
- **Post Analytics**: Likes, comments, engagement rates
- **Media Type Analysis**: Photo vs video performance
- **Engagement Charts**: Visual trend analysis
- **Top Posts**: Best performing content identification

### 🎨 User Experience
- **Modern UI**: Clean, responsive design with Tailwind CSS
- **Loading States**: Smooth loading animations
- **Error Handling**: Graceful error states with retry options
- **Navigation**: Intuitive routing between platforms
- **Responsive Design**: Works on desktop, tablet, and mobile

## 🏗️ Architecture

### Frontend Structure
```
frontend/src/
├── features/
│   ├── instagram/
│   │   ├── components/
│   │   ├── pages/
│   │   └── api/
│   ├── twitter/
│   │   ├── components/
│   │   ├── pages/
│   │   └── api/
│   ├── youtube/
│   │   ├── components/
│   │   ├── pages/
│   │   └── api/
│   ├── auth/
│   │   ├── components/
│   │   ├── pages/
│   │   └── api/
│   └── overview/
│       ├── components/
│       ├── pages/
│       └── api/
├── components/
├── pages/
└── utils/
```

### Backend Structure
```
backend/src/
├── routes/
│   ├── auth.routes.js
│   ├── social.routes.js
│   ├── instagram.routes.js
│   ├── twitter.routes.js
│   └── youtube.routes.js
├── middleware/
├── controllers/
├── models/
└── config/
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL database
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd social-media-analytics
```

2. **Install frontend dependencies**
```bash
cd frontend
npm install
```

3. **Install backend dependencies**
```bash
cd ../backend
npm install
```

4. **Set up environment variables**
```bash
# Backend .env
DATABASE_URL="postgresql://username:password@localhost:5432/social_analytics"
JWT_SECRET="your-secret-key"
PORT=4000

# Frontend .env
VITE_API_URL="http://localhost:4000/api"
```

5. **Set up the database**
```bash
cd backend
npx prisma generate
npx prisma db push
```

6. **Start the development servers**

Terminal 1 (Backend):
```bash
cd backend
npm run dev
```

Terminal 2 (Frontend):
```bash
cd frontend
npm run dev
```

## 📱 Available Routes

### Authentication
- `/login` - User login page
- `/register` - User registration page

### Analytics Dashboards
- `/` - Main dashboard with platform connections
- `/overview` - Cross-platform social overview
- `/instagram-analytics` - Instagram-specific analytics
- `/twitter-analytics` - Twitter-specific analytics
- `/youtube-analytics` - YouTube-specific analytics

## 🛠️ Technology Stack

### Frontend
- **React 19** - Modern React with hooks
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Recharts** - Beautiful chart library
- **React Icons** - Icon library
- **Axios** - HTTP client

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **PostgreSQL** - Database
- **Prisma** - Database ORM
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Social Platforms
- `GET /api/social/status` - Get connected platforms

### Instagram
- `GET /api/instagram/posts` - Get Instagram posts

### Twitter
- `GET /api/twitter/profile` - Get Twitter profile
- `GET /api/twitter/posts` - Get Twitter posts
- `GET /api/twitter/engagement-trends` - Get engagement trends

### YouTube
- `GET /api/youtube/channel` - Get YouTube channel
- `GET /api/youtube/videos` - Get YouTube videos
- `GET /api/youtube/views-trends` - Get views trends

## 🎯 Key Features Implemented

### ✅ Completed Tasks

1. **🐦 Twitter Analytics Module**
   - ✅ Mock Twitter OAuth authentication
   - ✅ Fetch recent tweets with engagement metrics
   - ✅ Clean component design consistent with Instagram
   - ✅ Time filtering (7 days, 30 days, all time)

2. **📺 YouTube Analytics Module**
   - ✅ Mock YouTube data with videos, views, likes
   - ✅ Styled card/grid layout for videos
   - ✅ Channel overview with subscribers and views
   - ✅ Video thumbnails and metadata

3. **📊 Social Overview Dashboard**
   - ✅ Cross-platform analytics page
   - ✅ Total followers across all platforms
   - ✅ Line/Bar charts for engagement trends
   - ✅ Recharts integration with mock data
   - ✅ Platform breakdown visualization

4. **🔐 Improved Authentication & Route Protection**
   - ✅ Protected dashboard pages from unauthenticated users
   - ✅ JWT token expiry handling with auto logout
   - ✅ User email display in navbar
   - ✅ Logout button functionality

5. **🗂️ Folder Cleanup & Architecture Refactor**
   - ✅ Feature-based folder structure
   - ✅ Organized components, pages, and API layers
   - ✅ Clean, maintainable architecture
   - ✅ Separation of concerns

## 🎨 UI/UX Improvements

- **Modern Design**: Clean, professional interface
- **Responsive Layout**: Works on all device sizes
- **Loading States**: Smooth loading animations
- **Error Handling**: User-friendly error messages
- **Navigation**: Intuitive routing between features
- **Consistent Styling**: Unified design language across platforms

## 🔮 Future Enhancements

- **Real API Integration**: Replace mock data with actual social media APIs
- **Real-time Updates**: WebSocket integration for live data
- **Advanced Analytics**: Machine learning insights
- **Export Features**: PDF/CSV report generation
- **Team Collaboration**: Multi-user support
- **Mobile App**: React Native version

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first approach
- Recharts for beautiful chart components
- All contributors and supporters 