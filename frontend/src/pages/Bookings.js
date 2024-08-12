import React from "react";
import { useEffect, useState } from "react";
import Header from "../Components/Header";
import "./Homepage.css";
import { useNavigate } from "react-router-dom";
import CreatingBooking from "../Components/creatingBooking";

export default function Bookings() {
  const navigate=useNavigate()
  function details(id){
    navigate(`/overview/${id}`)

  }
  const [data, setData] = useState([]);
  useEffect(() => {
    async function getTours() {
      let result = await fetch("http://localhost:5000/api/v1/getbookings",{
        method:"GET",
        headers:{

        "Authorization":`Bearer ${sessionStorage.getItem("token")}`,
        "content-type":"application/json"}
      });
      result = await result.json();
      console.log(result.data)
      setData(result.data);
      console.log(data);
    }
    getTours();
  }, []);
  return (
    <div className="bg-slate-200">
      <Header></Header>
      <main className="relative flex flex-row flex-wrap justify-center text-slate-500   p-10">
      </main>
    </div>
  );
}
