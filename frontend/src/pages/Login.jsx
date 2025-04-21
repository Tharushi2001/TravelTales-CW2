import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // updated import
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState(""); // Use username instead of email
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // useNavigate replaces useHistory

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        username, // Send username instead of email
        password,
      });

      if (response.data.message === "Login successful") {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/"); // use navigate instead of history.push
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
          type="text" // Keep it as username input
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
