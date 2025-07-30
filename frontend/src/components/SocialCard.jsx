import React, { useState, useEffect } from 'react';
import { api } from '../utils/api';

const SocialCard = ({ platform, icon, color, connected, onConnectSuccess, onConnectError }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(connected);

  // Update local state when connected prop changes
  useEffect(() => {
    setIsConnected(connected);
  }, [connected]);

  const handleConnect = async () => {
    setIsConnecting(true);
    
    try {
      // Get token from localStorage for authentication
      const token = localStorage.getItem('token');
      
      const response = await api.post('/social/connect', {
        platform: platform.toLowerCase(),
        accessToken: 'placeholder_access_token', // Placeholder token
        refreshToken: 'placeholder_refresh_token' // Placeholder token
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setIsConnected(true);
      onConnectSuccess?.(platform, response.data);
      
    } catch (error) {
      console.error('Connection error:', error);
      onConnectError?.(platform, error.response?.data?.message || 'Failed to connect');
    } finally {
      setIsConnecting(false);
    }
  };



  return (
    <div className="flex flex-col items-center bg-white/90 rounded-2xl shadow-xl p-8 border border-gray-100 transition-transform hover:scale-105 hover:shadow-2xl">
      <div>{icon}</div>
      <h2 className="text-xl font-bold text-gray-800 mb-2">{platform}</h2>
      
      {isConnected ? (
        <div className="mt-4 w-full">
          <div className="bg-green-500 text-white py-2 rounded-lg font-semibold text-center flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Connected
          </div>
        </div>
      ) : (
        <button
          onClick={handleConnect}
          disabled={isConnecting}
          className={`mt-4 w-full bg-gradient-to-r ${color} text-white py-2 rounded-lg font-semibold shadow hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {isConnecting ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Connecting...
            </div>
          ) : (
            'Connect'
          )}
        </button>
      )}
    </div>
  );
};

export default SocialCard; 