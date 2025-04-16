import React from "react";
import { Link } from "react-router-dom";
import Logo from "../img/logo.jpg";

const Navbar = () => {
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
          <Link to="/login" className="link">Login</Link>
          <Link to="/register" className="link">Register</Link>
          <Link to="/profile" className="link">User Profile</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
