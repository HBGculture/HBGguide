// frontend/src/pages/AdminDashboard.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QRCodeGenerator from '../components/QRCodeGenerator';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
  const [guides, setGuides] = useState([]);
  const [healthInfo, setHealthInfo] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all guides
    const fetchGuides = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/guides`, { withCredentials: true });
        setGuides(res.data.guides);
      } catch (error) {
        console.error('Error fetching guides:', error);
        toast.error('Failed to fetch guides.');
      }
    };
    fetchGuides();
  }, []);

  const fetchHealthInfo = async (guideId) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/guide-health/${guideId}`, { withCredentials: true });
      setHealthInfo(prev => ({ ...prev, [guideId]: res.data }));
    } catch (error) {
      console.error(`Error fetching health info for guide ${guideId}:`, error);
      toast.error(`Failed to fetch health info for guide ID ${guideId}.`);
    }
  };

  useEffect(() => {
    // Fetch health info for each guide
    guides.forEach(guide => {
      fetchHealthInfo(guide.id);
    });
  }, [guides]);

  const handleEditGuide = (guideId) => {
    navigate(`/admin/guide-creation?guideId=${guideId}`);
  };

  const handleDeleteGuide = async (guideId) => {
    if (!window.confirm('Are you sure you want to delete this guide?')) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/guides/${guideId}`, { withCredentials: true });
      setGuides(prev => prev.filter(guide => guide.id !== guideId));
      toast.success('Guide deleted successfully.');
    } catch (error) {
      console.error('Error deleting guide:', error);
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error('Failed to delete guide.');
      }
    }
  };

  const handleViewStatistics = (guideId) => {
    navigate(`/admin/statistics?guideId=${guideId}`);
  };

  return (
    <div>
      <h2 className="text-2xl mb-6">Admin Dashboard</h2>

      {/* Guides List */}
      <div className="mb-8">
        <h3 className="text-xl mb-4">All Guides</h3>
        {guides.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-200">
                <tr>
                  <th className="py-2 px-4 border-b">ID</th>
                  <th className="py-2 px-4 border-b">Name</th>
                  <th className="py-2 px-4 border-b">Language</th>
                  <th className="py-2 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {guides.map(guide => (
                  <tr key={guide.id} className="hover:bg-gray-100">
                    <td className="py-2 px-4 border-b">{guide.id}</td>
                    <td className="py-2 px-4 border-b">{guide.name}</td>
                    <td className="py-2 px-4 border-b">{guide.language.toUpperCase()}</td>
                    <td className="py-2 px-4 border-b space-x-2">
                      <button
                        onClick={() => handleEditGuide(guide.id)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition duration-200"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteGuide(guide.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-200"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => handleViewStatistics(guide.id)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition duration-200"
                      >
                        Statistics
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No guides available.</p>
        )}
      </div>

      {/* Guide Health Information */}
      {guides.map(guide => (
        <div key={guide.id} className="mb-8 p-4 border rounded bg-white shadow">
          <h3 className="text-lg mb-2">Guide ID: {guide.id} - {guide.name}</h3>
          {healthInfo[guide.id] ? (
            <>
              <p><strong>Overall Health:</strong> {healthInfo[guide.id].overall}</p>
              {healthInfo[guide.id].warnings && healthInfo[guide.id].warnings.map((warning, index) => (
                <p key={index} className="text-red-500">Warning: {warning}</p>
              ))}
            </>
          ) : (
            <p>Loading health information...</p>
          )}
        </div>
      ))}

      {/* QR Code and Statistics */}
      {guides.map(guide => (
        <div key={guide.id} className="mb-8 p-4 border rounded bg-white shadow">
          <h3 className="text-lg mb-2">Guide ID: {guide.id} - {guide.name}</h3>
          
          {/* QR Code */}
          <div className="mb-4">
            <h4 className="text-md mb-2">Preview QR Code for the Guide</h4>
            <QRCodeGenerator data={`http://localhost:3000/guide/${guide.id}`} />
          </div>

          {/* Shareable Statistics Link */}
          <div>
            <h4 className="text-md mb-2">Shareable Statistics Link</h4>
            <a
              href={`${process.env.REACT_APP_API_URL}/api/statistics/${guide.id}`}
              className="text-blue-500 underline break-all"
              target="_blank"
              rel="noopener noreferrer"
            >
              {`${process.env.REACT_APP_API_URL}/api/statistics/${guide.id}`}
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;
