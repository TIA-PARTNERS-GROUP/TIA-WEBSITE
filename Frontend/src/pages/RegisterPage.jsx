import React, { useState, useEffect } from "react";
import config from '../config.js';
import { useNavigate } from "react-router-dom";
import { useLoading } from "../utils/LoadingContext.jsx";
import { getCategoriesList } from "../api/categories.js";


const RegisterPage = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [company, setCompany] = useState("");
  const [category, setCategory] = useState("");
  const [phone, setPhone] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false)
  const [description, setDescription] = useState("");
  const { startLoading, stopLoading } = useLoading();
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        startLoading();
        const categoriesData = await getCategoriesList();
        setCategories(categoriesData.data.categories);
      } catch (err) {
        setError("Failed to load categories");
        console.error("Error fetching categories:", err);
      } finally {
        stopLoading();
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  function formatString(str) {
    if (!str) {return null};
    return str
        .split('-') 
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) 
        .join(' '); 
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedCategory = categories.find(cat => 
      cat.id.toString() === category || cat.name === category
    );
    const categoryId = selectedCategory ? selectedCategory.id : category;

    const res = await fetch(config.apiBaseUrl+"/auth/signup",
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                firstName: firstname,
                lastName: lastname,
                company: company,
                category: categoryId,
                phone: phone,
                description: description,
            })
        }
    )

    if (res.status !== 201) {
        throw Error(`Error: ${res.status}`);
    }

    navigate('/login')
  }
  


  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "40px" }}>

      {/* Title */}
      <h2 style={{ fontWeight: "bold", marginBottom: "5px" }}>Create an account</h2>
      <p style={{ fontSize: "14px", color: "#555" }}>Enter your email to sign up for this app</p>

      {/* Form */}
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", width: "280px", marginTop: "20px" }}>
        <input type="text" placeholder="First name" style={inputStyle} onChange={(e) => setFirstname(e.target.value)} require/>
        <input type="text" placeholder="Last name" style={inputStyle} onChange={(e) => setLastname(e.target.value)} required/>
        <input type="email" placeholder="Email" style={inputStyle} onChange={(e) => setEmail(e.target.value)} required/>
        <input type="password" placeholder="Password" style={inputStyle} onChange={(e) => setPassword(e.target.value)} required/>
        <input type="text" placeholder="Company name" style={inputStyle} onChange={(e) => setCompany(e.target.value)} required/>
        <select 
          style={inputStyle} 
          onChange={(e) => setCategory(e.target.value)} 
          value={category}
          required
          disabled={loading}
        >
          <option value="">{loading ? "Loading categories..." : "Select business category"}</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {formatString(cat.name)}
            </option>
          ))}
        </select>
        <input type="tel" placeholder="Phone number" style={inputStyle} onChange={(e) => setPhone(e.target.value)} required/>
        <textarea
          placeholder="Business description"
          style={{ ...inputStyle, height: "80px", resize: "vertical" }}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
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