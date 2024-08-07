// import react from "react";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conformPassword, setconfromPassword] = useState("");
  const navigation = useNavigate();
  async function handlesubmit() {
    if (password !== conformPassword) {
      window.alert("Passwords do not match");
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/api/v1/users", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password,conformPassword}),
      });

      const result = await response.json();
      console.log("Success:", result);
      if (result.status==="success") {
        navigation("/login");
      } else {
        window.alert(result.message);
      }
    } catch (error) {
      console.error("Error:", error);
      window.alert(error);
    }
  }
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "linear-gradient(135deg, #f8f9fa, #e9ecef)",
      }}
    >
      <div
        style={{
          width: "400px",
          boxSizing: "border-box",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: "column",
          padding: "40px",
          borderRadius: "8px",
          borderColor:"#5b2c6f",
        }}
      >
        <h1
          style={{ textAlign: "center", marginBottom: "20px", color: "#6c3483",  fontSize:"50px", fontFamily:"serif" }}
        >
          SIGNUP
        </h1>
        <label style={{ marginBottom: "5px", color: "darkblue" }}>
          ENTER YOUR NAME
        </label>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            padding: "10px",
            marginBottom: "15px",
            border: "1px solid #ddd",
            borderRadius: "4px",
          }}
        />
        <label style={{ marginBottom: "5px", color: "darkblue" }}>
          ENTER EMAIL
        </label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            padding: "10px",
            marginBottom: "15px",
            border: "1px solid #ddd",
            borderRadius: "4px",
          }}
        />
        <label style={{ marginBottom: "5px", color: "darkblue" }}>
          ENTER PASSWORD
        </label>
        <input
          type="text"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: "10px",
            marginBottom: "15px",
            border: "1px solid #ddd",
            borderRadius: "4px",
          }}
        />
        <label style={{ marginBottom: "5px", color: "darkblue" }}>
          CONFIRM PASSWORD
        </label>
        <input
          type="text"
          placeholder="Password"
          onChange={(e) => {
            setconfromPassword(e.target.value);
          }}
          style={{
            padding: "10px",
            marginBottom: "20px",
            border: "1px solid #ddd",
            borderRadius: "4px",
          }}
        />
        <br></br>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button
            onClick={()=>handlesubmit()}
            style={{
              flex: 1,
              padding: "10px",
              border: "none",
              borderRadius: "4px",
              backgroundColor: "#6c3483",
              color: "white",
              cursor: "pointer",
              marginRight: "10px",
            }}
          >
            Submit
          </button>
          <button
            onClick={() => navigation("/login")}
            style={{
              flex: 1,
              padding: "10px",
              border: "none",
              borderRadius: "4px",
              backgroundColor: "#6c3483",
              color: "white",
              cursor: "pointer",
            }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
