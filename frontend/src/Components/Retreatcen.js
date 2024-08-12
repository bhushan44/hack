import React from "react";
import { CiLocationOn } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import ImageSlider from "./ImageSlider";
import './Retreatcen.css'; // Ensure this CSS file is imported

function Retreatcen({ data }) {
  const navigate = useNavigate(); 
  if (!data || !data.features || !data.styles || !data.skillLevel || !data.benefits || !data.program) {
    return <p>Loading...</p>;
  }
  return (
    <div className="retreat-container">
      <div className="retreat-image-slider">
        <ImageSlider images={data.images} />
      </div>
      <div className="retreat-details">
        <h2 className="retreat-heading">{data.name || 'No Name'}</h2>
        <div className="retreat-location">
          <CiLocationOn className="retreat-location-icon"/>
          <h4 className="text-lg text-gray-600">{data.location || 'No Location'}</h4>
        </div>
        <div className="retreat-description">
          <span>Description</span>
          <p className="text-base text-gray-600">{data.description || 'No Description'}</p>
        </div>
        <div className="retreat-features">
          <span>Features</span>
          <ul className="retreat-list">
            {data.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
        <div className="retreat-styles">
          <span>Styles</span>
          <ul className="retreat-list">
            {data.styles.map((style, index) => (
              <li key={index}>{style}</li>
            ))}
          </ul>
        </div>
        <div className="retreat-skill-level">
          <span>Skill Level</span>
          <ul className="retreat-list">
            {data.skillLevel.map((level, index) => (
              <li key={index}>{level}</li>
            ))}
          </ul>
        </div>
        <div className="retreat-benefits">
          <span>Benefits</span>
          <ul className="retreat-list">
            {data.benefits && data.benefits.length > 0 ? (
              data.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))
            ) : (
              <li>No benefits available</li>
            )}
          </ul>
        </div>
        <div className="retreat-program">
          <span>Program</span>
          <ul className="retreat-list">
            {data.program.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex-1 p-2 text-center">
        <h2 className="text-2xl text-gray-800 mb-2">FROM</h2>
        <div className="retreat-price">
          <span>$</span><span>{data.price}</span>
        </div>
        <div className="retreat-reviews">
          <h3>4.5</h3>
          <span className="ml-2">
            9<span> reviews</span>
          </span>
        </div>
        <div className="retreat-buttons">
          <button className="book-button" onClick={() =>(!sessionStorage.getItem("token"))?navigate("/login"):navigate("/bookings")}>Book</button>
        </div>
      </div>
    </div>
  );
}

export default Retreatcen;
