import React, { useState } from 'react';

export default function App() {
  const [rating, setRating] = useState(0);

  const handleRating = (rate) => {
    setRating(rate);
  };
  const booking= async(res,req)=>{
    try{
      console.log("")
    }catch(e){
      console.log("catch")
    }
  }

  return (
    <div className="review-container">
      <h1 className="title">Rate Your Experience 💖</h1>
      <p className="description">
        We highly value your feedback! Kindly take a moment to rate your experience and provide us with your valuable feedback 😊.
      </p>
      <div className="stars-container">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={star <= rating ? 'fa fa-star checked' : 'fa fa-star'}
            onClick={() => handleRating(star)}
            style={{
              cursor: 'pointer',
              marginRight: '5px',
              color: star <= rating ? 'orange' : 'gray'
            }}
          ></span>
        ))}
      </div>
      <div className="textarea-container">
        <textarea
          className="feedback-textarea"
          placeholder="📝 Write your description here..."
        ></textarea>
      </div>
      <button className="send-button">Send</button>
    </div>
  );
}