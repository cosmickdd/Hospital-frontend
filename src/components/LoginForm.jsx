import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { loginUser } from '../api';


const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = await loginUser({ username, password });
      login(data.access); // Save access token
      // Redirect to intended section or home
      if (location.state && location.state.from) {
        setTimeout(() => {
          const el = document.getElementById(location.state.from);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 300);
        navigate('/', { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-teal-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700">
        <h2 className="text-3xl font-extrabold text-center text-teal-700 dark:text-teal-300 mb-2 tracking-tight">Welcome Back</h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-8">Sign in to your account to continue</p>
        {error && <div className="mb-4 text-red-600 text-center font-semibold">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-200">Username</label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 dark:bg-gray-900 dark:text-white"
              required
              autoFocus
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-200">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 dark:bg-gray-900 dark:text-white"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
          <div className="flex flex-col sm:flex-row justify-between mt-2">
            <Link to="/forgot-password" className="text-sm text-teal-600 hover:underline dark:text-teal-300 mb-2 sm:mb-0">Forgot Password?</Link>
            <span className="text-sm text-gray-500 dark:text-gray-400">Don't have an account?{' '}
              <Link to="/register" className="text-teal-600 dark:text-teal-300 font-semibold hover:underline">Register</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
