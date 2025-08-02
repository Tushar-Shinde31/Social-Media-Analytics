import React, { useState, useEffect } from 'react';
import { FaInstagram, FaTwitter, FaYoutube, FaLinkedin } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import SocialCard from '../components/SocialCard';
import InstagramPosts from '../components/InstagramPosts';
import { api } from '../utils/api';

const platforms = [
  {
    name: 'Instagram',
    icon: <FaInstagram className="text-pink-500 text-4xl mb-2" />,
    color: 'from-pink-400 to-yellow-400',
  },
  {
    name: 'Twitter',
    icon: <FaTwitter className="text-blue-400 text-4xl mb-2" />,
    color: 'from-blue-400 to-blue-600',
  },
  {
    name: 'YouTube',
    icon: <FaYoutube className="text-red-500 text-4xl mb-2" />,
    color: 'from-red-400 to-red-600',
  },
  {
    name: 'LinkedIn',
    icon: <FaLinkedin className="text-blue-700 text-4xl mb-2" />,
    color: 'from-blue-700 to-blue-400',
  },
];

const SocialDashboard = () => {
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const [connectedPlatforms, setConnectedPlatforms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 3000);
  };

  // Fetch connected platforms on component mount
  useEffect(() => {
    const fetchConnectedPlatforms = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await api.get('/social/status', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        const connectedPlatformsList = response.data.connected.map(item => 
          item.platform.toLowerCase()
        );
        setConnectedPlatforms(connectedPlatformsList);
      } catch (error) {
        console.error('Failed to fetch connected platforms:', error);
        showNotification('Failed to load connection status', 'error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchConnectedPlatforms();
  }, []);

  const handleConnectSuccess = (platform, data) => {
    showNotification(`${platform} connected successfully!`, 'success');
    // Update the connected platforms list
    setConnectedPlatforms(prev => [...prev, platform.toLowerCase()]);
  };

  const handleConnectError = (platform, error) => {
    showNotification(`Failed to connect ${platform}: ${error}`, 'error');
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      {/* Navbar */}
      <Navbar />

      {/* Notification */}
      {notification.show && (
        <div className={`fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 ${
          notification.type === 'success' 
            ? 'bg-green-500 text-white' 
            : 'bg-red-500 text-white'
        }`}>
          {notification.message}
        </div>
      )}

      {/* Dashboard Content */}
      <div className="max-w-5xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Connect Your Social Accounts</h1>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {platforms.map((platform) => (
              <SocialCard
                key={platform.name}
                platform={platform.name}
                icon={platform.icon}
                color={platform.color}
                connected={connectedPlatforms.includes(platform.name.toLowerCase())}
                onConnectSuccess={handleConnectSuccess}
                onConnectError={handleConnectError}
              />
            ))}
          </div>
        )}

        {/* Instagram Posts Section */}
        <div className="mt-12">
          <InstagramPosts />
        </div>

      {/* About/How it Works Section */}
      <div className="max-w-4xl mx-auto mt-10 mb-8 px-4">
        <div className="bg-white/90 rounded-2xl shadow-lg p-8 border border-gray-100 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 mb-6 md:mb-0">
            <h2 className="text-2xl font-bold text-blue-600 mb-2 flex items-center gap-2">
              <span>🚀</span> Automated Social Media Analytics Tool
            </h2>
            <p className="text-gray-700 mb-4">
              Connect your favorite social platforms and get instant, automated insights into your online presence. Visualize your growth, engagement, and content performance—all in one place!
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-gray-700">
                <span className="text-blue-500">🔗</span> Connect Instagram, Twitter (X), YouTube, and LinkedIn
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <span className="text-purple-500">📊</span> Fetch posts, likes, comments, followers & more
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <span className="text-pink-500">📈</span> Visualize analytics with beautiful graphs and tables
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <span className="text-green-500">🔒</span> Secure, private, and easy to use (JWT Auth)
              </li>
            </ul>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-pink-400 to-yellow-400 rounded-xl p-4 flex flex-col items-center shadow">
                <FaInstagram className="text-white text-3xl mb-1" />
                <span className="text-white font-semibold">Instagram</span>
              </div>
              <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl p-4 flex flex-col items-center shadow">
                <FaTwitter className="text-white text-3xl mb-1" />
                <span className="text-white font-semibold">Twitter</span>
              </div>
              <div className="bg-gradient-to-br from-red-400 to-red-600 rounded-xl p-4 flex flex-col items-center shadow">
                <FaYoutube className="text-white text-3xl mb-1" />
                <span className="text-white font-semibold">YouTube</span>
              </div>
              <div className="bg-gradient-to-br from-blue-700 to-blue-400 rounded-xl p-4 flex flex-col items-center shadow">
                <FaLinkedin className="text-white text-3xl mb-1" />
                <span className="text-white font-semibold">LinkedIn</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default SocialDashboard;