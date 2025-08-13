import React from "react";


const RegisterPage = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "40px" }}>

      {/* Title */}
      <h2 style={{ fontWeight: "bold", marginBottom: "5px" }}>Create an account</h2>
      <p style={{ fontSize: "14px", color: "#555" }}>Enter your email to sign up for this app</p>

      {/* Form */}
      <form style={{ display: "flex", flexDirection: "column", width: "280px", marginTop: "20px" }}>
        <input type="text" placeholder="User name" style={inputStyle} />
        <input type="email" placeholder="Email" style={inputStyle} />
        <input type="password" placeholder="Password" style={inputStyle} />
        <button type="submit" style={buttonStyle}>Sign up with email</button>

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

export default RegisterPage;