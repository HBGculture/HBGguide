// frontend/src/pages/GuideCreation.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const GuideCreation = () => {
  const [step, setStep] = useState(1);
  const [guideInfo, setGuideInfo] = useState({
    name: '',
    description: '',
    language: 'en',
    storageAccountId: ''
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadStatus, setUploadStatus] = useState('');
  const [guideId, setGuideId] = useState(null); // State to store guide ID
  const [storageAccounts, setStorageAccounts] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  // Fetch storage accounts
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

  // Check if guideId is passed via query params for editing
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const existingGuideId = params.get('guideId');
    if (existingGuideId) {
      // Fetch existing guide info to prefill the form
      const fetchGuide = async () => {
        try {
          const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/guides/${existingGuideId}`, { withCredentials: true });
          setGuideInfo({
            name: res.data.guide.name,
            description: res.data.guide.description,
            language: res.data.guide.language,
            storageAccountId: res.data.guide.storageAccountId // Ensure backend provides this
          });
          setGuideId(existingGuideId);
          setStep(2); // Skip to storage connection
        } catch (error) {
          console.error('Error fetching guide info:', error);
          toast.error('Failed to fetch guide information.');
        }
      };
      fetchGuide();
    }
  }, [location.search]);

  const handleNext = () => {
    if (step === 1) {
      if (!guideInfo.storageAccountId) {
        toast.warn('Please select a storage account.');
        return;
      }
    }
    setStep(step + 1);
  };

  const handleBack = () => setStep(step - 1);

  const handleGuideCreation = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (guideId) {
        // Update existing guide
        response = await axios.put(`${import.meta.env.VITE_API_URL}/api/guides/${guideId}`, guideInfo, { withCredentials: true });
        toast.success('Guide updated successfully. Now upload files.');
      } else {
        // Create new guide
        response = await axios.post(`${import.meta.env.VITE_API_URL}/api/guides`, guideInfo, { withCredentials: true });
        toast.success('Guide created successfully. Now upload files.');
        setGuideId(response.data.guideId); // Capture guide ID
      }
      setStep(2);
    } catch (error) {
      console.error('Error creating/updating guide:', error);
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error('Error creating/updating guide.');
      }
    }
  };

  const handleFileChange = (e) => {
    setSelectedFiles([...e.target.files]);
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!guideId) return toast.error('Guide ID is missing.');
    if (selectedFiles.length === 0) return toast.warn('Please select file(s).');

    for (let file of selectedFiles) {
      const formData = new FormData();
      formData.append('file', file);
      try {
        setUploadStatus(`Uploading ${file.name}...`);
        await axios.post(`${import.meta.env.VITE_API_URL}/api/files/upload?guideId=${guideId}`, formData, { withCredentials: true,
          headers: { 
            'Content-Type': 'multipart/form-data'
          }
        });
        setUploadStatus(`Successfully uploaded ${file.name}.`);
        toast.success(`${file.name} uploaded successfully.`);
      } catch (error) {
        console.error(`Error uploading ${file.name}:`, error);
        setUploadStatus(`Upload failed for ${file.name}.`);
        if (error.response && error.response.data && error.response.data.error) {
          toast.error(error.response.data.error);
        } else {
          toast.error(`Failed to upload ${file.name}.`);
        }
      }
    }
    setUploadStatus('All files processed.');
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl mb-6">{guideId ? 'Edit Guide' : 'Guide Creation Wizard'}</h2>
      {step === 1 && (
        <form onSubmit={handleGuideCreation} className="mb-8">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
              Guide Name:
            </label>
            <input
              type="text"
              id="name"
              placeholder="Guide Name"
              value={guideInfo.name}
              onChange={(e) => setGuideInfo({ ...guideInfo, name: e.target.value })}
              className="border p-2 mb-2 block w-full rounded"
              required
              aria-label="Guide Name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 font-medium mb-1">
              Guide Description:
            </label>
            <textarea
              id="description"
              placeholder="Guide Description"
              value={guideInfo.description}
              onChange={(e) => setGuideInfo({ ...guideInfo, description: e.target.value })}
              className="border p-2 mb-2 block w-full rounded"
              required
              aria-label="Guide Description"
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="language" className="block text-gray-700 font-medium mb-1">
              Language:
            </label>
            <select
              id="language"
              value={guideInfo.language}
              onChange={(e) => setGuideInfo({ ...guideInfo, language: e.target.value })}
              className="border p-2 mb-2 w-full rounded"
              aria-label="Language Selection"
            >
              <option value="en">English</option>
              <option value="sv">Swedish</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="storageAccount" className="block text-gray-700 font-medium mb-1">
              Select Storage Account:
            </label>
            <select
              id="storageAccount"
              value={guideInfo.storageAccountId}
              onChange={(e) => setGuideInfo({ ...guideInfo, storageAccountId: e.target.value })}
              className="border p-2 mb-2 w-full rounded"
              required
              aria-label="Storage Account Selection"
            >
              <option value="">-- Select Storage Account --</option>
              {storageAccounts.map(account => (
                <option key={account.id} value={account.id}>
                  {account.storage_type.toUpperCase()} - {account.account_name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-between">
            <button type="button" onClick={handleBack} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-200">
              Back
            </button>
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200">
              {guideId ? 'Update Guide' : 'Next: Upload Files'}
            </button>
          </div>
        </form>
      )}
      {step === 2 && (
        <div className="mb-8">
          <h3 className="text-lg mb-2">Upload Files</h3>
          <form onSubmit={handleFileUpload} className="mb-4">
            <input type="file" multiple onChange={handleFileChange} className="mb-2 w-full" required aria-label="Upload Files" />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200">
              Upload Files
            </button>
          </form>
          {uploadStatus && <p className="mb-2">{uploadStatus}</p>}
          <button onClick={handleBack} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-200">
            Back
          </button>
        </div>
      )}
    </div>
  );
};

export default GuideCreation;
