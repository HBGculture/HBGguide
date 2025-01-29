// frontend/src/components/AdminLayout.js

import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const AdminLayout = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navLinks = [
    { name: 'Dashboard', path: '/admin/dashboard' },
    { name: 'Create Guide', path: '/admin/guide-creation' },
    { name: 'Statistics', path: '/admin/statistics' },
    { name: 'User Management', path: '/admin/users' },
    { name: 'Storage Management', path: '/admin/storage' },
    { name: 'Logout', path: '/admin/logout' },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-gray-800 text-white flex-shrink-0">
        <div className="p-4 text-2xl font-bold border-b border-gray-700">
          Admin Panel
        </div>
        <nav className="p-4">
          <ul>
            {navLinks.map(link => (
              <li key={link.name} className="mb-2">
                <Link
                  to={link.path}
                  aria-label={link.name}
                  className={`block px-2 py-1 rounded ${
                    currentPath.startsWith(link.path) ? 'bg-gray-700' : 'hover:bg-gray-700'
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
