import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from '../images/yoga.jpeg';
import { FaSearch } from 'react-icons/fa';

export default function Header() {
  const [data, setData] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const navigation = useNavigate();
  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  function signup() {
    navigation('/signup');
  }

  function login() {
    navigation('/login');
  }

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
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [sessionStorage.getItem("token")]);

  return (
    <header className="bg-slate-600 w-full h-auto flex flex-col md:flex-row items-center justify-between p-4 shadow-md">
      <img src={logo} alt="Yoga Logo" className="h-12 mb-4 md:mb-0" />
      <div className="relative">
        <button 
          onClick={handleClick} 
          className="flex items-center p-2 border border-gray-300 rounded bg-white text-black focus:outline-none"
        >
          <FaSearch className="text-gray-500" />
        </button>
        {isExpanded && (
          <input
            type="text"
            placeholder="Search..."
            className="absolute top-full left-0 w-full mt-2 p-2 border border-gray-300 rounded text-black"
            autoFocus
          />
        )}
      </div>
      <div className="flex flex-col md:flex-row items-center gap-4">
        {!sessionStorage.getItem("token") ? (
          <>
            <button className="border-2 border-solid rounded-lg p-2 text-white bg-blue-500 hover:bg-blue-700" onClick={login}>Login</button>
            <button className="border-2 border-solid rounded-lg p-2 text-white bg-blue-500 hover:bg-blue-700" onClick={signup}>Signup</button>
          </>
        ) : (
          <>
            <button
              className="border-2 border-solid text-white rounded-lg p-2"
              onClick={() => {
                sessionStorage.removeItem("token");
                navigation("/");
              }}
            >
              Logout
            </button>
            <div className="flex flex-col items-center">
              {data.role === "admin" && (
                <Link to="/admin">
                  <img
                    src={data.photo}
                    alt="User"
                    className="h-12 w-12 rounded-full mb-2"
                  />
                </Link>
              )}
              {data.role === "user" && (
                <Link to="/dashboard">
                  <img
                    src={data.photo}
                    alt="User"
                    className="h-12 w-12 rounded-full mb-2"
                  />
                </Link>
              )}
              {data.role === "instructor" && (
                <Link to="/retreat">
                  <img
                    src={data.photo}
                    alt="User"
                    className="h-12 w-12 rounded-full mb-2"
                  />
                </Link>
              )}
              <p className="text-white">{data?.name}</p>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
