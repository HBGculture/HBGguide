// frontend/src/pages/AdminStatistics.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdminStatistics = () => {
  const [statistics, setStatistics] = useState(null);
  const [guide, setGuide] = useState(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const guideId = queryParams.get('guideId');

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/statistics/${guideId}`, { withCredentials: true });
        setStatistics(res.data);
      } catch (error) {
        console.error('Error fetching statistics:', error);
        toast.error('Failed to fetch statistics.');
      }
    };

    const fetchGuide = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/guides/${guideId}`, { withCredentials: true });
        setGuide(res.data.guide);
      } catch (error) {
        console.error('Error fetching guide details:', error);
        toast.error('Failed to fetch guide details.');
      }
    };

    if (guideId) {
      fetchGuide();
      fetchStatistics();
    }
  }, [guideId]);

  if (!guideId) return <p>No Guide ID provided.</p>;
  if (!guide || !statistics) return <div className="flex justify-center items-center h-full"><div className="loader"></div></div>;

  return (
    <div>
      <h2 className="text-2xl mb-4">Statistics for {guide.name}</h2>
      <div className="bg-white p-6 rounded shadow">
        <p><strong>Scan Count:</strong> {statistics.scanCount}</p>
        {/* Add more statistics as needed */}
      </div>
    </div>
  );
};

export default AdminStatistics;
