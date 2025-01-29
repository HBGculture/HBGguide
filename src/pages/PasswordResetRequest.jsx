// frontend/src/pages/PasswordResetRequest.js

import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const PasswordResetRequest = () => {
  const [email, setEmail] = useState('');

  const handlePasswordResetRequest = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/password-reset`, { email }, { withCredentials: true });
      toast.success('Password reset email sent. Please check your inbox.');
    } catch (error) {
      console.error('Password reset request error:', error);
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error('Failed to send password reset email.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handlePasswordResetRequest} className="p-6 bg-white shadow-md rounded w-full max-w-sm">
        <h2 className="text-2xl mb-4 text-center">Reset Password</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
            Email:
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your admin email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 w-full rounded"
            required
            aria-label="Admin Email"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200">
          Send Reset Link
        </button>
      </form>
    </div>
  );
};

export default PasswordResetRequest;
