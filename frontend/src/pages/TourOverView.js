import Header from "../Components/Header";
import Retreatcen from "../Components/Retreatcen";
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
function TourOverView(){
  const {id}=useParams();
  const [retData,setData]=useState({})
  const RetreatInd=async()=>{
    try{
      const reCen=await fetch(`http://localhost:5000/api/${id}`,{
        method:"GET",
        headers:{"content-type":"application/json"}
      })
      const redat= await reCen.json();
      setData(redat);
    }catch(e){
      console.log(e)
    }
  }
  useEffect(()=>{
    RetreatInd()
  },[])
  return<>
  <Header/>
  <Retreatcen data={retData}/>
  </>
}
export default TourOverView;