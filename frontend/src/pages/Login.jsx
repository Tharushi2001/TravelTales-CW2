import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {    // Handles form submission for login
    e.preventDefault();

    if (!username || !password) {
      alert("Please enter both username and password.");
      return;
    }

    try {
      const response = await axios.post(  // Make POST request to login endpoint
        "http://localhost:5000/api/auth/login",
        { username, password },
        { withCredentials: true }
      );

      if (response.data && response.data.token) {
        localStorage.setItem("token", response.data.token);
        alert("Login successful!");
        localStorage.setItem("userId", response.data.userId);

        const redirectTo = location.state?.from || "/";
        navigate(redirectTo);
      } else {
        alert("Login failed: No token received.");
      }
    } catch (error) {
      console.error("Login failed:", error.response ? error.response.data : error.message);
      alert(error.response?.data?.message || "An error occurred during login.");
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
                    <p>
    Didn't register yet? <Link to="/register">Register here</Link>
  </p>
      </form>

    </div>
  );
};

export default Login;
