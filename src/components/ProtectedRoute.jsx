// frontend/src/components/ProtectedRoute.js

import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const ProtectedRoute = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null); // null: loading, false: not auth, true: auth

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/check-auth`, { withCredentials: true });    
        if (res.data.authenticated) {
          setIsAuth(true);
        } else {
          setIsAuth(false);
          toast.error('Please log in to access this page.');
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        setIsAuth(false);
        toast.error('Authentication check failed. Please log in.');
      }
    };
    checkAuth();
  }, []);

  if (isAuth === null) return (
    <div className="flex justify-center items-center h-screen">
      <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
    </div>
  );
  if (isAuth === false) return <Navigate to="/admin/login" replace />;
  return children;
};

export default ProtectedRoute;
