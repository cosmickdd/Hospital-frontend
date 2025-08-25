import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const ProfileDrawer = ({ open, onClose }) => {
  const { isAuthenticated, logout, token } = useAuth();
  // For demo, use localStorage or context for user info. Replace with API call if needed.
  const user = JSON.parse(localStorage.getItem('user_profile') || '{}');

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-40" onClick={onClose}></div>
      {/* Drawer */}
      <div className="relative w-80 bg-white dark:bg-gray-900 shadow-xl h-full p-6 flex flex-col">
        <button className="absolute top-4 right-4 text-gray-500 hover:text-red-500" onClick={onClose}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="flex flex-col items-center mt-8">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-3xl font-bold text-green-700 mb-4">
            {user.username ? user.username[0].toUpperCase() : '?'}
          </div>
          <h2 className="text-xl font-semibold mb-1">{user.username || 'User'}</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{user.email || 'No email'}</p>
        </div>
        <div className="mt-8 flex-1 flex flex-col justify-end">
          <button
            onClick={() => { logout(); onClose(); }}
            className="w-full py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileDrawer;
