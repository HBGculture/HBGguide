// frontend/src/components/VisitorSettings.js

'use client';

import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const VisitorSettings = () => {
  const [language, setLanguage] = useState(localStorage.getItem('visitorLang') || 'en');
  const [theme, setTheme] = useState(localStorage.getItem('visitorTheme') || 'light');
  const [fontSize, setFontSize] = useState(localStorage.getItem('visitorFontSize') || 'text-base');

  useEffect(() => {
    localStorage.setItem('visitorLang', language);
    localStorage.setItem('visitorTheme', theme);
    localStorage.setItem('visitorFontSize', fontSize);
    document.documentElement.className = theme;
    toast.info('Settings updated.');
  }, [language, theme, fontSize]);

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
      <h3 className="text-2xl font-semibold mb-4">Visitor Settings</h3>
      <div className="mb-4">
        <label htmlFor="language" className="block text-gray-700 font-medium mb-1">
          Language:
        </label>
        <select
          id="language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2"
          aria-label="Language Selection"
        >
          <option value="en">English</option>
          <option value="sv">Swedish</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="theme" className="block text-gray-700 font-medium mb-1">
          Theme:
        </label>
        <select
          id="theme"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2"
          aria-label="Theme Selection"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
      <div>
        <label htmlFor="fontSize" className="block text-gray-700 font-medium mb-1">
          Font Size:
        </label>
        <select
          id="fontSize"
          value={fontSize}
          onChange={(e) => setFontSize(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2"
          aria-label="Font Size Selection"
        >
          <option value="text-sm">Small</option>
          <option value="text-base">Base</option>
          <option value="text-lg">Large</option>
        </select>
      </div>
    </div>
  );
};

export default VisitorSettings;
