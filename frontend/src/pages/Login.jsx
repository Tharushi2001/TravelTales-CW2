import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // useLocation to get the previous path
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation(); // This will give us the current location

  // Handle the login form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        username,
        password,
      });

      if (response.data.message === "Login successful") {
        // Store user data in localStorage
        localStorage.setItem("user", JSON.stringify(response.data.user));

        // Redirect to the page they were trying to visit
        const redirectTo = location.state?.from || "/"; // Use the previous location or default to home
        navigate(redirectTo); 
      } else {
        alert("Invalid credentials!");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("An error occurred during login.");
    }
  };

  return (
    <div className="auth">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text" 
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
