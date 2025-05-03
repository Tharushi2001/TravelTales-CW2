import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../img/logo.jpg";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); 
  const userId = localStorage.getItem("userId"); 

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include", 
      });

      localStorage.removeItem("token"); 
      localStorage.removeItem("userId"); 
      alert("Logged out successfully!");
      navigate("/login"); 
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
            <img src={Logo} alt="Logo" />
          </Link>
        </div>
        <div className="links">
          <Link to="/" className="link">Home</Link>
          <Link to="/search" className="link">Search</Link>
          {token && (
            <Link to="/followed-feed" className="link">Followed Feed</Link>
          )}
          {!token ? (
            <>
              <Link to="/login" className="link">Login</Link>
              <Link to="/register" className="link">Register</Link>
            </>
          ) : (
            <>
              {userId && (
                <Link to={`/user-profile/${userId}`} className="link">User Profile</Link>
              )}
              <button
                onClick={handleLogout}
                className="logout-btn"
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
