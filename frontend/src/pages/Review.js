import React, { useState } from 'react';

export default function Review() {
  const [rating, setRating] = useState(0);

  const handleRating = (rate) => {
    setRating(rate);
  };

  return (
    <>
      <div className="text-3xl">
        <h1>Reviews</h1>
        <div className="flex-container">
          {[1, 2, 3, 4, 5].map(function(star) {
            return (
              <span
                key={star}
                className={star <= rating ? 'fa fa-star checked' : 'fa fa-star'}
                onClick={function() { handleRating(star); }}
                style={{
                  cursor: 'pointer',
                  marginRight: '5px',
                  color: star <= rating ? 'orange' : 'gray'
                }}
              ></span>
            );
          })}
        </div>
      </div>
    </>
  );
}
