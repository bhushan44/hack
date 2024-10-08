import React from "react";
import { useState } from "react";
import Otp from "../Components/Otp";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [email, setmail] = useState("");
  const [state, setState] = useState(false);

  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  //   const navigate = useNavigate();
  async function handlesubmit() {
    try {
      const res = await fetch("http://localhost:5000/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await res.json();
      console.log(data);
      if (data.status === "fail") {
        // setState(true);
        window.alert(data.message);
      } else {
        // setState(true);
        sessionStorage.setItem("token", data.token);
        // console.log(localStorage.getItem("token"));
        navigate('/')
      }

      //   if (data.status === "failure" && data.statusCode === 400) {
      //     return window.alert("please enter all fields");
      //   } else if (data.userExists === true && data.statusCode === 200) {
      //     console.log(data, "data");
      //     localStorage.setItem("user", data.data.user._id);
      //     // setuser(localStorage.getItem("user"));
      //     navigate("/home");
      //   } else {
      //     window.alert("user not exists");
      //   }
    } catch (e) {}
  }
  return (
    <>
      {state && <Otp setState={setState}></Otp>}
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
            height: "400px",
            boxSizing: "border-box",
            boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
            display: "flex",
            flexDirection: "column",
            // alignItems: "center",
            // justifyContent: "center",
            padding: "40px",
            gap: "10px",
            // background: "linear-gradient(45deg, #2193b0, #6dd5ed)",
            borderRadius: "8px",
          }}
        >
          <h1 style={{ textAlign: "center" ,color: "#6c3483",  fontSize:"50px", fontFamily:"serif"}}>LOGIN</h1>
          <div>
            {/* {" "} */}
            <label style={{ display: "block", color: "darkblue" }}>
             ENTER EMAIL
            </label>
            <input
              style={{
                padding: "10px",
                marginBottom: "10px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                width: "300px",
              }}
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setmail(e.target.value);
              }}
            ></input>
          </div>

          <div>
            <label style={{color:"darkblue", display: "block" }}>ENTER YOUR PASSWORD</label>
            <input
              type="text"
              placeholder="Password"
              value={password}
              style={{ display: "block", width: "100%" , padding: "10px",
                marginBottom: "10px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                width: "300px",}}
              onChange={(e) => {
                setpassword(e.target.value);
              }}
            ></input>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button
              onClick={handlesubmit}
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
              submit
            </button>
            <button
              onClick={()=>{navigate("/forgetpassword")}}
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
              ForgetPassword
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
