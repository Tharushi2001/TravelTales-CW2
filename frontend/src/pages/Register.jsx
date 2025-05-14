import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); 
  const [error, setError] = useState("");
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic Validation
    if (!username || !email || !password) {
      setError("All fields are required.");
      return;
    }

    setIsLoading(true); 
    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", {
        username,
        email,
        password,
      });

      if (response.data.message === "User registered successfully") {
        alert("Registration successful! You can now log in.");
        navigate("/login"); // Redirect to the login page after successful registration
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      setError("An error occurred during registration. Please try again.");
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="auth">
      <h1>Register</h1>
      {error && <p className="error">{error}</p>} {/* Display error messages */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={isLoading}> {/* Disable button while loading */}
          {isLoading ? "Registering..." : "Register"}
        </button>
      </form>

    </div>
  );
};

export default Register;
