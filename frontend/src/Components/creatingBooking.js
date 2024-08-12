import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreatingBooking() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [retreatId, setRetreatId] = useState('');
  const [userMail, setUserMail] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/v1/checkout", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem("token")}`
        },
        body: JSON.stringify({
          userid: userId,
          retreatid: retreatId,
          usermail: userMail
        })
      });

      const data = await response.json();
      console.log(data)
      if (data.url) {
        setUrl(data.url);
        window.location.href = data.url; // Redirect to Stripe Checkout
      } else {
        console.error('Failed to create checkout session');
      }
    } catch (error) {
      console.error('Error during payment process:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='userid'>UserID</label>
          <input
            id='userid'
            type='text'
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor='retreatid'>RetreatID</label>
          <input
            id='retreatid'
            type='text'
            value={retreatId}
            onChange={(e) => setRetreatId(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor='usermail'>Usermail</label>
          <input
            id='usermail'
            type='email'
            value={userMail}
            onChange={(e) => setUserMail(e.target.value)}
            required
          />
        </div>
        <div>
          <button type='submit'>Submit Booking</button>
        </div>
      </form>
      {url && <p>Redirecting to payment page...</p>}
    </div>
  );
}
