import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Homepage from "./pages/Homepage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Otp from "../src/Components/Otp";
import TourOverView from "./pages/TourOverView";
import Bookings from "./pages/Bookings";
import Dashboard from "./pages/Dashboard";
import ForgetPassword from "./pages/update";
import UpdatePassword from "./pages/updatepassword";
import Review from "./pages/Review";
import AdminDashboard from "./pages/AdminDashboard";
import RetreatDashboard from "./pages/RetreatDashboard";
import AccommodationForm from "./Components/AccomdationForm";
import FoodForm from "./Components/FoodForm";
import RetreatForm from "./Components/RetreatForm";
// import Reviews from "./Components/Reviews";

function App() {
  const [name, setName] = useState(" ");
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/signup" element={<Signup></Signup>} />
            <Route path="/forgetpassword" element ={<ForgetPassword></ForgetPassword>}/>
            <Route path="/resetpassword/:token" element={<UpdatePassword></UpdatePassword>} />
            <Route path="/dashboard" element={<Dashboard></Dashboard>}/>
            <Route path="/login" element={<Login></Login>} />
            <Route path="/" element={<Homepage></Homepage>} />
            <Route path="/otp" element={<Otp></Otp>} />
            <Route path="/overview/:id" element={<TourOverView></TourOverView>} />
            <Route path="/bookings" element={<Bookings></Bookings>}/>
            <Route path="/review" element={<Review/>}></Route>
            <Route path="/admin" element={<AdminDashboard></AdminDashboard>}/>
            <Route path="/retreat" element={<RetreatDashboard></RetreatDashboard>}/>
            <Route path="/accomdation" element={<AccommodationForm/>}/>
            <Route path="/food" element={<FoodForm/>}/>
            <Route path="/retreatform" element={<RetreatForm/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;

