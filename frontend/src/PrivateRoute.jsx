import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function PrivateRoute({ children }) {
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    const validateToken = () => {
      const token = localStorage.getItem("token");
      
      if (!token) {
        setIsValid(false);
        return;
      }

      try {
        // Decode JWT token
        const payload = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Date.now() / 1000;
        
        // Check if token is expired
        if (payload.exp && payload.exp < currentTime) {
          localStorage.removeItem("token");
          setIsValid(false);
          return;
        }
        
        setIsValid(true);
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token");
        setIsValid(false);
      }
    };

    validateToken();
  }, []);

  // Show loading while validating token
  if (isValid === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="text-gray-600">Validating session...</span>
        </div>
      </div>
    );
  }

  if (!isValid) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
