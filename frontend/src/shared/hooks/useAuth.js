import { useState, useEffect, useCallback } from 'react';

// Custom event for session expiry notifications
const createSessionExpiryEvent = () => {
  const event = new CustomEvent('sessionExpired', {
    detail: { message: 'Session expired, please log in again.' }
  });
  window.dispatchEvent(event);
};

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [logoutCallback, setLogoutCallback] = useState(null);

  // Helper to decode JWT and get user info
  const decodeToken = useCallback((token) => {
    try {
      if (!token) return null;
      const payload = JSON.parse(atob(token.split('.')[1]));
      
      // Check if token is expired
      const currentTime = Date.now() / 1000;
      if (payload.exp && payload.exp < currentTime) {
        return null; // Token expired
      }
      
      return {
        email: payload.email,
        exp: payload.exp,
        iat: payload.iat
      };
    } catch (error) {
      console.error('Failed to decode token:', error);
      return null;
    }
  }, []);

  // Check if token is expired
  const isTokenExpired = useCallback((token) => {
    const decoded = decodeToken(token);
    return !decoded;
  }, [decodeToken]);

  // Initialize authentication state
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const token = localStorage.getItem('token');
        
        if (token && !isTokenExpired(token)) {
          const userData = decodeToken(token);
          if (userData) {
            setUser(userData);
            setIsAuthenticated(true);
          } else {
            // Token is invalid, clear it
            localStorage.removeItem('token');
            setUser(null);
            setIsAuthenticated(false);
          }
        } else if (token && isTokenExpired(token)) {
          // Token expired, clear it and show message
          localStorage.removeItem('token');
          setUser(null);
          setIsAuthenticated(false);
          // Dispatch session expiry event
          createSessionExpiryEvent();
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, [decodeToken, isTokenExpired]);

  // Login function
  const login = useCallback((token) => {
    try {
      const userData = decodeToken(token);
      if (userData) {
        localStorage.setItem('token', token);
        setUser(userData);
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  }, [decodeToken]);

  // Logout function
  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
    if (logoutCallback) {
      logoutCallback();
    }
  }, [logoutCallback]);

  // Set logout callback (to be called from components with router access)
  const setLogoutHandler = useCallback((callback) => {
    setLogoutCallback(() => callback);
  }, []);

  // Check authentication status (for route protection)
  const checkAuth = useCallback(() => {
    const token = localStorage.getItem('token');
    if (!token || isTokenExpired(token)) {
      logout();
      return false;
    }
    return true;
  }, [logout, isTokenExpired]);

  // Auto-check token validity every minute
  useEffect(() => {
    if (isAuthenticated) {
      const interval = setInterval(() => {
        if (!checkAuth()) {
          // Token expired, logout user and show notification
          createSessionExpiryEvent();
          logout();
        }
      }, 60000); // Check every minute

      return () => clearInterval(interval);
    }
  }, [isAuthenticated, checkAuth, logout]);

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    setLogoutHandler,
    checkAuth,
    isTokenExpired
  };
};
