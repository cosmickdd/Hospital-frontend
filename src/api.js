// src/api.js

const API_BASE = process.env.REACT_APP_API_BASE || 'https://hospital-backend-ejes.onrender.com/api';

export async function checkSession(token) {
  const res = await fetch(`${API_BASE}/accounts/session/`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  if (res.status === 200) return true;
  return false;
}


export async function loginUser({ username, password }) {
  const res = await fetch(`${API_BASE}/accounts/login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.detail || 'Login failed');
  }
  return res.json(); // Should return { access: ..., refresh: ... }
}

export async function registerUser({ username, email, password }) {
  const res = await fetch(`${API_BASE}/accounts/register/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, email, password, is_doctor: false }),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.detail || 'Registration failed');
  }
  return res.json();
}
