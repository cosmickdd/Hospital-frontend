

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    <form onSubmit={handleSubmit} className="register-form">
      {/* ...existing form fields... */}
      {/*
      {process.env.REACT_APP_RECAPTCHA_SITE_KEY ? (
        <ReCAPTCHA
          sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
          onChange={handleCaptchaChange}
        />
      ) : (
        <div style={{ color: 'red', marginBottom: '1em' }}>
          reCAPTCHA site key is not set. Please set REACT_APP_RECAPTCHA_SITE_KEY in your .env file.
        </div>
      )}
      */}
      <button type="submit" disabled={loading}>
        {loading ? 'Registering...' : 'Register'}
      </button>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
    </form>
  );
};
export default RegisterForm;    