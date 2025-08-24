import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';

const AuthRouterSetup = () => {
  const navigate = useNavigate();
  const { setLogoutHandler } = useAuthContext();

  useEffect(() => {
    // Set up the logout handler with router access
    setLogoutHandler(() => {
      navigate('/login');
    });
  }, [navigate, setLogoutHandler]);

  // This component doesn't render anything
  return null;
};

export default AuthRouterSetup;
