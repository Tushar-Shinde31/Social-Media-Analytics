import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuthContext();

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white/80 shadow-md backdrop-blur-md">
      <div className="flex items-center gap-2">
        <Link to="/" className="text-2xl font-extrabold text-blue-600 tracking-tight hover:text-blue-700 transition-colors">
          Sociolyze
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-4">
          <Link 
            to="/overview"
            className="text-gray-700 hover:text-purple-600 font-medium text-sm transition-colors"
          >
            Overview
          </Link>
          <Link 
            to="/instagram-analytics"
            className="text-gray-700 hover:text-pink-600 font-medium text-sm transition-colors"
          >
            Instagram
          </Link>
          <Link 
            to="/youtube"
            className="text-gray-700 hover:text-red-600 font-medium text-sm transition-colors"
          >
            YouTube
          </Link>
          <Link 
            to="/twitter"
            className="text-gray-700 hover:text-blue-600 font-medium text-sm transition-colors"
          >
            Twitter
          </Link>
        </div>
        <span className="text-gray-700 font-medium text-sm hidden sm:block">{user?.email}</span>
        <button
          onClick={logout}
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg font-semibold shadow hover:from-blue-600 hover:to-purple-600 transition-all"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
