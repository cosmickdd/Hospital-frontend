import React from 'react';
import { Link } from 'react-router-dom';

const PasswordResetSuccess = () => (
  <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-teal-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
    <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 text-center">
      <h2 className="text-2xl font-bold text-teal-700 dark:text-teal-300 mb-4">Password Reset Successful</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-8">Your password has been reset. You can now log in with your new password.</p>
      <Link to="/login" className="inline-block bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300">Go to Login</Link>
    </div>
  </div>
);

export default PasswordResetSuccess;
