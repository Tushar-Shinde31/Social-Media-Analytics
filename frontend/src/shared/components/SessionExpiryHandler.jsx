import React, { useState, useEffect } from 'react';
import Notification from './Notification';

const SessionExpiryHandler = () => {
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const handleSessionExpired = (event) => {
      setNotification({
        message: event.detail.message,
        type: 'warning',
        duration: 8000 // Show for 8 seconds
      });
    };

    window.addEventListener('sessionExpired', handleSessionExpired);

    return () => {
      window.removeEventListener('sessionExpired', handleSessionExpired);
    };
  }, []);

  if (!notification) return null;

  return (
    <Notification
      message={notification.message}
      type={notification.type}
      duration={notification.duration}
      onClose={() => setNotification(null)}
    />
  );
};

export default SessionExpiryHandler;
