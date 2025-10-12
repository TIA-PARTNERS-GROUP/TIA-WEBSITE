import React, {useState} from "react";
import config from '../../config.js';
import axios from "../../api/axios.js";
import { useNavigate } from "react-router-dom";


const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    sessionStorage.removeItem("token");
    e.preventDefault();

    try {
      const res = await axios.post(
        `/auth/login`,
        {
          email,
          password
        },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      );
      sessionStorage.setItem("token", res.data.token);

    } catch (err) {
      if (err.response) {
        // Server responded with a status outside 2xx
        console.error('Error response:', err.response.data);
        console.error('Status code:', err.response.status);
      } else if (err.request) {
        // No response received from the server
        console.error('No response:', err.request);
      } else {
        // Something went wrong setting up the request
        console.error('Error setting up request:', err.message);
      }
    }
    
    

    navigate("/dashboard")
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "40px" }}>


      {/* Title */}
      <h2 style={{ fontWeight: "bold", marginBottom: "5px" }}>Log in or create account</h2>
      <p style={{ fontSize: "14px", color: "#555" }}>Enter your email to sign up for this app</p>

      {/* Form */}
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", width: "280px", marginTop: "20px" }}>
        <input type="text" placeholder="Email" style={inputStyle} onChange = {(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" style={inputStyle} onChange = {(e) => setPassword(e.target.value)} />
        <button type="submit" style={buttonStyle}>Sign in</button>

        <a href="#" style={{ fontSize: "12px", color: "#007BFF", marginTop: "10px" }}>Forgot Password?</a>
        <p style={{ fontSize: "11px", color: "#777", marginTop: "20px" }}>
          By clicking continue, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
        </p>
      </form>
    </div>
  );
};

// Styles
const inputStyle = {
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  fontSize: "14px"
};

const buttonStyle = {
  padding: "10px",
  backgroundColor: "#000",
  color: "#fff",
  fontSize: "14px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer"
};

export default LoginPage;