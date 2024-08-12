import React from 'react';
import './ImageSlider.css';

const ImageSlider = ({ images }) => {
  return (
    <div className="slider-container">
      <div className="slider">
        {images.map((src, index) => (
          <div className="slide" key={index}>
            <img src={src} alt={`Slide ${index}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
