import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../img/logo.jpg";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // Check if token exists

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include", // Optional: clear backend cookie
      });

      localStorage.removeItem("token"); // Important: clear token
      alert("Logged out successfully!");
      navigate("/login"); // Redirect to login page
    } catch (error) {
      console.error("Logout error:", error);
      alert("An error occurred during logout");
    }
  };

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="TravelTales Logo" />
          </Link>
        </div>
        <div className="links">
          <Link to="/" className="link">Home</Link>
          <Link to="/search" className="link">Search</Link>

          {!token ? (
            <>
              <Link to="/login" className="link">Login</Link>
              <Link to="/register" className="link">Register</Link>
            </>
          ) : (
            <>
              <Link to="/profile" className="link">User Profile</Link>
              <button
                onClick={handleLogout}
                className="link"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0',
                  color: '#007bff',
                }}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
