// frontend/src/pages/AdminUsers.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AdminUsers = () => {
  const [admins, setAdmins] = useState([]);
  const [newAdmin, setNewAdmin] = useState({ email: '', password: '', role: 'Viewer' });

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/admins`, { withCredentials: true });
        setAdmins(res.data.admins);
      } catch (error) {
        console.error('Error fetching admins:', error);
        toast.error('Failed to fetch admins.');
      }
    };
    fetchAdmins();
  }, []);

  const handleAddAdmin = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/signup`, newAdmin, { withCredentials: true });
      toast.success('Admin added successfully.');
      setNewAdmin({ email: '', password: '', role: 'Viewer' });
      // Refresh admin list
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/admins`, { withCredentials: true });
      setAdmins(res.data.admins);
    } catch (error) {
      console.error('Error adding admin:', error);
      toast.error('Failed to add admin.');
    }
  };

  return (
    <div>
      <h2 className="text-2xl mb-4">User Management</h2>
      
      {/* Add New Admin */}
      <div className="mb-6">
        <h3 className="text-xl mb-2">Add New Admin</h3>
        <form onSubmit={handleAddAdmin} className="bg-white p-4 rounded shadow">
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
              Email:
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={newAdmin.email}
              onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
              className="border p-2 w-full rounded"
              required
              aria-label="Admin Email"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
              Password:
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={newAdmin.password}
              onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
              className="border p-2 w-full rounded"
              required
              aria-label="Admin Password"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="role" className="block text-gray-700 font-medium mb-1">
              Role:
            </label>
            <select
              id="role"
              value={newAdmin.role}
              onChange={(e) => setNewAdmin({ ...newAdmin, role: e.target.value })}
              className="border p-2 w-full rounded"
              aria-label="Admin Role"
            >
              <option value="Viewer">Viewer</option>
              <option value="Editor">Editor</option>
              <option value="Manager">Manager</option>
            </select>
          </div>
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200 w-full">
            Add Admin
          </button>
        </form>
      </div>

      {/* List of Admins */}
      <div>
        <h3 className="text-xl mb-2">Existing Admins</h3>
        {admins.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-200">
                <tr>
                  <th className="py-2 px-4 border-b">ID</th>
                  <th className="py-2 px-4 border-b">Email</th>
                  <th className="py-2 px-4 border-b">Role</th>
                  {/* Add more columns if needed */}
                </tr>
              </thead>
              <tbody>
                {admins.map(admin => (
                  <tr key={admin.id} className="hover:bg-gray-100">
                    <td className="py-2 px-4 border-b">{admin.id}</td>
                    <td className="py-2 px-4 border-b">{admin.email}</td>
                    <td className="py-2 px-4 border-b">{admin.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No admins found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
