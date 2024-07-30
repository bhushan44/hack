import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgetPassword = () => {
    const navigate=useNavigate()
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/v1/forgetpassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage('Password reset link has been sent to your email.');
        
      } else {
        setMessage('Failed to send password reset link. Please try again.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div style={{ textAlign: 'center', margin: '20px' }}>
      <h2 style={{ marginBottom: '20px' }}>Forgot Your Password?</h2>
      <form onSubmit={handleSubmit} style={{ display: 'inline-block', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd', width: '100%' }}
          />
        </div>
        <button
          type="submit"
          style={{ padding: '10px 15px', border: 'none', borderRadius: '4px', backgroundColor: '#007bff', color: '#fff', cursor: 'pointer' }}
        >
          Send Reset Link
        </button>
      </form>
      {message && <p style={{ marginTop: '20px', color: '#333' }}>{message}</p>}
    </div>
  );
};

export default ForgetPassword;
