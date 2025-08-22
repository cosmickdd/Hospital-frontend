

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../api';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    is_doctor: false,
  });
  // const [captchaToken, setCaptchaToken] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // const handleCaptchaChange = (token) => {
  //   setCaptchaToken(token);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }
  // if (!captchaToken) {
  //   setError('Please complete the CAPTCHA.');
  //   setLoading(false);
  //   return;
  // }
    try {
      const response = await fetch('/api/accounts/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          is_doctor: formData.is_doctor,
          // captcha_token: captchaToken,
        }),
      });
      if (response.ok) {
        setSuccess('Registration successful! Please check your email to activate your account.');
        setFormData({
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
          is_doctor: false,
        });
  // setCaptchaToken('');
      } else {
        const data = await response.json();
        setError(data.detail || 'Registration failed.');
      }
    } catch (err) {
      setError('An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-teal-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700">
        <h2 className="text-3xl font-extrabold text-center text-teal-700 dark:text-teal-300 mb-2 tracking-tight">Create Account</h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-8">Register to access all features</p>
        {error && <div className="mb-4 text-red-600 text-center font-semibold">{error}</div>}
        {success && <div className="mb-4 text-green-600 text-center font-semibold">{success}</div>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block mb-2 font-semibold text-gray-700 dark:text-gray-200">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 dark:bg-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-2 font-semibold text-gray-700 dark:text-gray-200">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 dark:bg-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 font-semibold text-gray-700 dark:text-gray-200">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 dark:bg-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block mb-2 font-semibold text-gray-700 dark:text-gray-200">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 dark:bg-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="is_doctor"
                checked={formData.is_doctor}
                onChange={handleChange}
                className="form-checkbox h-5 w-5 text-teal-600 dark:text-teal-400"
              />
              <span className="ml-2 text-gray-700 dark:text-gray-200">Register as Doctor</span>
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition-all duration-300"
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <div className="mt-8 text-center">
          <span className="text-gray-500 dark:text-gray-400">Already have an account?</span>{' '}
          <Link to="/login" className="text-teal-600 dark:text-teal-300 font-semibold hover:underline">Login</Link>
        </div>
      </div>
    </div>
  );
};
export default RegisterForm;    