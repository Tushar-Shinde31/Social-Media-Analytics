import React from 'react';
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

const Navbar = () => {
  const navigate = useNavigate();
  const email = getUserEmail();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
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
  );
};

export default Navbar; 