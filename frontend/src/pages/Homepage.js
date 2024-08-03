import React from "react";
import first from "../images/first.jpeg";
import { CiLocationOn } from "react-icons/ci";
import { SlCalender } from "react-icons/sl";
import { IoFlagOutline } from "react-icons/io5";
import { MdOutlineGroup } from "react-icons/md";
import { useEffect, useState } from "react";
import Header from "../Components/Header";
import Retreatcen from "../Components/Retreatcen";
import Retreatscroll from "../Components/Retreatscroll";
import "./Homepage.css";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";

export default function Homepage() {
  const navigate=useNavigate()
  function details(id){
    navigate(`/overview/${id}`)

  }
  const [data, setData] = useState([]);
 
  return (
    <div className="bg-slate-200">
      <Header></Header>
      <Retreatscroll/>
      <Retreatcen />
      <Footer/>
    </div>
  );
}
