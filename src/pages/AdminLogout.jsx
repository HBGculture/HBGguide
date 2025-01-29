// frontend/src/pages/AdminLogout.js

import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdminLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        await axios.get(`${process.env.REACT_APP_API_URL}/api/auth/logout`, { withCredentials: true });
        toast.success('Logged out successfully.');
        navigate('/admin/login');
      } catch (error) {
        console.error('Error logging out:', error);
        toast.error('Failed to log out.');
      }
    };
    logout();
  }, [navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      <p>Logging out...</p>
    </div>
  );
};

export default AdminLogout;
