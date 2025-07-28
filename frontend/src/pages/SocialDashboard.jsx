import React from 'react';
import { FaInstagram, FaTwitter, FaYoutube, FaLinkedin } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

// Helper to decode JWT and get email
function getUserEmail() {
  try {
    const token = localStorage.getItem('token');
    if (!token) return '';
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.email || '';
  } catch {
    return '';
  }
}

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
  const navigate = useNavigate();
  const email = getUserEmail();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 bg-white/80 shadow-md backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-extrabold text-blue-600 tracking-tight">Sociolyze</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-gray-700 font-medium text-sm hidden sm:block">{email}</span>
          <button
            onClick={handleLogout}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg font-semibold shadow hover:from-blue-600 hover:to-purple-600 transition-all"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="max-w-5xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Connect Your Social Accounts</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {platforms.map((platform) => (
            <div
              key={platform.name}
              className="flex flex-col items-center bg-white/90 rounded-2xl shadow-xl p-8 border border-gray-100 transition-transform hover:scale-105 hover:shadow-2xl"
            >
              <div>{platform.icon}</div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">{platform.name}</h2>
              <button
                className={`mt-4 w-full bg-gradient-to-r ${platform.color} text-white py-2 rounded-lg font-semibold shadow hover:opacity-90 transition-all`}
              >
                Connect
              </button>
            </div>
          ))}
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
