import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from '../images/yoga.jpeg'; // Import logo image

export default function Header() {
  const [data, setData] = useState("");
  const navigation = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/v1/user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const userData = await response.json();
        setData(userData.data);
        
        console.log(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [sessionStorage.getItem("token")]);

  return (
    <header className="bg-slate-600 w-full h-20 flex items-center justify-between  p-4 shadow-md">
      <img src={logo} alt="Yoga Logo" className="h-12" />
      <input 
        type="text" 
        placeholder="Search..." 
        className="flex-1 mx-4 p-2 border border-gray-300 rounded text-black"
      />
      <div className="flex items-center gap-4">
        {!sessionStorage.getItem("token") ? (
          <>
            <button className="border-2 border-solid rounded-lg p-2 text-white bg-blue-500 hover:bg-blue-700">Login</button>
            <button className="border-2 border-solid rounded-lg p-2 text-white bg-blue-500 hover:bg-blue-700">Signup</button>
          </>
        ) : (
          <>
            <button
              className="border-2 border-solid rounded-lg p-2"
              onClick={() => {
                sessionStorage.removeItem("token");
                navigation("/");
              }}
            >
              Logout
            </button>
            <Link to="/dashboard">
              <img
                src={data?.photo}
                alt="User"
                className="h-12 w-12 rounded-full"
              />
            </Link>
            <p>{data?.name}</p>
          </>
        )}
      </div>
    </header>
  );
}
