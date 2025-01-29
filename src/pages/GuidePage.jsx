// frontend/src/pages/GuidePage.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import VisitorPlayer from '../components/VisitorPlayer';
import { toast } from 'react-toastify';

const GuidePage = () => {
  const { id } = useParams();
  const [guide, setGuide] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGuide = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/guides/${id}`, { withCredentials: true });
        setGuide(res.data.guide);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching guide:', err);
        setError('Failed to load guide.');
        toast.error('Failed to load guide.');
        setLoading(false);
      }
    };
    fetchGuide();
  }, [id]);

  if (loading) return <div className="flex justify-center items-center h-full"><div className="loader"></div></div>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!guide) return <p>Guide not found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{guide.name}</h1>
      <p className="mb-4">{guide.description}</p>
      <VisitorPlayer 
        audioSrc={guide.audioSrc} // Ensure your guide object has an audioSrc field
        transcript={guide.transcript} // Ensure your guide object has a transcript field
        images={guide.images} // Ensure your guide object has an images array
        videos={guide.videos} // Ensure your guide object has a videos array
      />
    </div>
  );
};

export default GuidePage;
