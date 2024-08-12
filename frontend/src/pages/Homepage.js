import React from "react";
import { useEffect, useState } from "react";
import Header from "../Components/Header";
import RetreatDiv from "../Components/RetreatDiv";
import Retreatscroll from "../Components/Retreatscroll";
import "./Homepage.css";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";

export default function Homepage() {
  const navigate=useNavigate()
  const [retreatdata,setRetreatData]=useState([]);
  function details(id){
    navigate(`/overview/${id}`)

  }
  const [data, setData] = useState([]);
  // setData([])
  const retData=async()=>{
    try{
      const refetch= await fetch('http://localhost:5000/api/v1/getretreats',{
        method:"GET",
        headers:{"content-type":"application/json"}
      })
      const redata=await refetch.json();
      setRetreatData(redata)
    }catch(e){
      console.error(e)
    }
  }
  useEffect(() => {
    retData();
  }, []);
  return (
    <div className="bg-slate-200">

      <Header></Header>
      <Retreatscroll/>
      { retreatdata.map((data,index)=>{
        return <RetreatDiv da={data} key={index} details={details}/>
      })
      }
      <Footer/>
      {/* {setRetreatData([])} */}
    </div>
  );
}