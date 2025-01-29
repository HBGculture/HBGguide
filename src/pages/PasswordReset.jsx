// frontend/src/pages/PasswordReset.js

import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const PasswordReset = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }
    setIsSubmitting(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/password-reset/${token}`, { password }, { withCredentials: true });
      toast.success('Password has been reset successfully. You can now log in with your new password.');
      navigate('/admin/login');
    } catch (error) {
      console.error('Password reset error:', error);
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error('Failed to reset password.');
      }
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handlePasswordReset} className="p-6 bg-white shadow-md rounded w-full max-w-sm">
        <h2 className="text-2xl mb-4 text-center">Set New Password</h2>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
            New Password:
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 w-full rounded"
            required
            aria-label="New Password"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-1">
            Confirm New Password:
          </label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border p-2 w-full rounded"
            required
            aria-label="Confirm New Password"
          />
        </div>
        <button 
          type="submit" 
          className={`w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition duration-200 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Resetting...' : 'Reset Password'}
        </button>
      </form>
    </div>
  );
};

export default PasswordReset;
