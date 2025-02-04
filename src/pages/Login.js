import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../slices/authSlice";
import "../design/Login.css"; // Styling for this page

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize navigation
  
    // Static credentials for testing
    const validCredentials = {
      username: "admin@cognifog.com",
      password: "password123",
    };
  
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      if (
        formData.username === validCredentials.username &&
        formData.password === validCredentials.password
      ) {
        dispatch(login({ username: formData.username }));
        setError("");
        navigate("/home"); // Redirect to Home Page
      } else {
        setError("Invalid username or password");
      }
    };
  
    return (
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2 className="login-title">Login</h2>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
  
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
  
          {error && <p className="error-message">{error}</p>}
  
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    );
  };
  
  export default Login;