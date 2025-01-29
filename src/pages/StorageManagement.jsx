// frontend/src/pages/StorageManagement.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const StorageManagement = () => {
  const [storageAccounts, setStorageAccounts] = useState([]);

  useEffect(() => {
    const fetchStorageAccounts = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/storage/accounts`, { withCredentials: true });
        setStorageAccounts(res.data.storageAccounts);
      } catch (error) {
        console.error('Error fetching storage accounts:', error);
        toast.error('Failed to fetch storage accounts.');
      }
    };
    fetchStorageAccounts();
  }, []);

  const handleConnectGoogle = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/api/storage/connect/google`;
  };

  const handleConnectOneDrive = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/api/storage/connect/onedrive`;
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/storage/accounts/${id}`, { withCredentials: true });
      setStorageAccounts(prev => prev.filter(acc => acc.id !== id));
      toast.success('Storage account disconnected successfully.');
    } catch (error) {
      console.error('Error disconnecting storage account:', error);
      toast.error('Failed to disconnect storage account.');
    }
  };

  return (
    <div>
      <h2 className="text-2xl mb-4">Manage Cloud Storage Accounts</h2>
      <div className="mb-6 flex space-x-4">
        <button onClick={handleConnectGoogle} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200">
          Connect Google Drive
        </button>
        <button onClick={handleConnectOneDrive} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200">
          Connect OneDrive
        </button>
      </div>
      <h3 className="text-xl mb-2">Connected Accounts</h3>
      {storageAccounts.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Storage Type</th>
                <th className="py-2 px-4 border-b">Account Name</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {storageAccounts.map(account => (
                <tr key={account.id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b">{account.id}</td>
                  <td className="py-2 px-4 border-b">{account.storage_type.toUpperCase()}</td>
                  <td className="py-2 px-4 border-b">{account.account_name}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => handleDelete(account.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-200"
                    >
                      Disconnect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No storage accounts connected.</p>
      )}
    </div>
  );
};

export default StorageManagement;
