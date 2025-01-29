// frontend/src/App.js

import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Lazy load components
const VisitorPlayer = lazy(() => import('./components/VisitorPlayer'));
const VisitorSettings = lazy(() => import('./components/VisitorSettings'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const GuideCreation = lazy(() => import('./pages/GuideCreation'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const GuidePage = lazy(() => import('./pages/GuidePage'));
const AdminLayout = lazy(() => import('./components/AdminLayout'));
const AdminStatistics = lazy(() => import('./pages/AdminStatistics'));
const AdminUsers = lazy(() => import('./pages/AdminUsers'));
const AdminLogout = lazy(() => import('./pages/AdminLogout'));
const StorageManagement = lazy(() => import('./pages/StorageManagement'));
const PasswordResetRequest = lazy(() => import('./pages/PasswordResetRequest'));
const PasswordReset = lazy(() => import('./pages/PasswordReset'));
const ProtectedRoute = lazy(() => import('./components/ProtectedRoute'));

function App() {
  return (
    <Router>
      <ToastContainer 
        position="top-right" 
        autoClose={5000} 
        hideProgressBar 
        newestOnTop 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
      />
      <Suspense fallback={
        <div className="flex justify-center items-center h-screen">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
        </div>
      }>
        <Routes>
          {/* Visitor Routes */}
          <Route
            path="/"
            element={
              <div className="max-w-3xl mx-auto p-4">
                <VisitorSettings />
                <VisitorPlayer 
                  audioSrc="https://example.com/audio.mp3"
                  transcript="This is the transcript..."
                  images={["https://example.com/image1.jpg"]}
                  videos={[]}
                />
              </div>
            }
          />
          <Route path="/guide/:id" element={<GuidePage />} />
          
          {/* Password Reset Routes */}
          <Route path="/password-reset" element={<PasswordResetRequest />} />
          <Route path="/password-reset/:token" element={<PasswordReset />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            {/* Nested Admin Routes */}
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="guide-creation" element={<GuideCreation />} />
            <Route path="statistics" element={<AdminStatistics />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="storage" element={<StorageManagement />} />
            <Route path="logout" element={<AdminLogout />} />
            {/* Add more admin routes here */}
          </Route>

          {/* Fallback Route */}
          <Route path="*" element={<p>Page Not Found</p>} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
