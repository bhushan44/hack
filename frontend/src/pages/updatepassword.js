import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const UpdatePassword = () => {
    const navigate=useNavigate()
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/v1/resetpassword/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        window.alert('Password has been successfully updated.');
        navigate("/")
      } else {
        setMessage('Failed to update password. Please try again.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div style={{ textAlign: 'center', margin: '20px' }}>
      <h2 style={{ marginBottom: '20px' }}>Reset Your Password</h2>
      <form onSubmit={handleSubmit} style={{ display: 'inline-block', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>New Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd', width: '100%' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="confirmPassword" style={{ display: 'block', marginBottom: '5px' }}>Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd', width: '100%' }}
          />
        </div>
        <button
          type="submit"
          style={{ padding: '10px 15px', border: 'none', borderRadius: '4px', backgroundColor: '#007bff', color: '#fff', cursor: 'pointer' }}
        >
          Update Password
        </button>
      </form>
      {message && <p style={{ marginTop: '20px', color: '#333' }}>{message}</p>}
    </div>
  );
};

export default UpdatePassword;
