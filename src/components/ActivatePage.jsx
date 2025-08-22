import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ActivatePage = () => {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('pending');
  const [message, setMessage] = useState('Activating your account...');

  useEffect(() => {
    const activate = async () => {
      try {
        const response = await fetch(
          `https://hospital-backend-ejes.onrender.com/api/accounts/activate/${uid}/${token}/`,
          { method: 'GET' }
        );
        if (response.ok) {
          setStatus('success');
          setMessage('Your account has been activated! You can now log in.');
          setTimeout(() => navigate('/login?verified=1'), 2500);
        } else {
          const data = await response.json();
          setStatus('error');
          setMessage(data.error || 'Activation link is invalid or expired.');
        }
      } catch (err) {
        setStatus('error');
        setMessage('An error occurred. Please try again later.');
      }
    };
    activate();
    // eslint-disable-next-line
  }, [uid, token, navigate]);

  return (
    <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h2 style={{ color: status === 'success' ? '#059669' : '#E85C20' }}>{message}</h2>
      {status === 'pending' && <div style={{ marginTop: 24 }}>Activating...</div>}
      {status === 'success' && <div style={{ marginTop: 24 }}>Redirecting to login...</div>}
      {status === 'error' && <div style={{ marginTop: 24 }}>If you have issues, please contact support.</div>}
    </div>
  );
};

export default ActivatePage;
