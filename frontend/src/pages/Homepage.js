import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import RetreatDiv from "../Components/RetreatDiv";
import Footer from "../Components/Footer";
import BGimg from "../images/BGimg.png";
import { useNavigate } from "react-router-dom";
import './Homepage.css';

export default function Homepage() {
  const navigate = useNavigate();
  const [retreatData, setRetreatData] = useState([]);

  const fetchRetreatData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/v1/getretreats', {
        method: "GET",
        headers: { "content-type": "application/json" }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setRetreatData(data);
    } catch (error) {
      console.error('Failed to fetch retreat data:', error);
    }
  };

  useEffect(() => {
    fetchRetreatData();
  }, []);

  const handleDetails = (id) => {
    navigate(`/overview/${id}`);
  };

  return (
    <div className="bg-slate-200 bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url(${BGimg})` }}>
    <Header />
    <h1 className="text-4xl font-bold text-white p-4 text-center">RETREAT CENTER</h1>
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {retreatData.map((data, index) => (
          <RetreatDiv da={data} key={index} details={handleDetails} />
        ))}
      </div>
    </div>
    <Footer />
  </div>
  );
}
