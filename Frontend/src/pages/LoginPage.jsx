import React, {useState} from "react";
import config from '../config.js';
import { useNavigate } from "react-router-dom";


const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(config.apiBaseUrl+"/auth/login",
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    email: email,
                    password: password
                }
            )
        }
    )

    if (!res.ok) {
        throw Error(`Error: ${res.status}`)
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