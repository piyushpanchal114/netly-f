import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./navbar.css";

const NavBar = () => {
  return (
    <nav className="navbar-wrap">
      <span className="navbar-brand">
        <Link to="/" className="navbar-brand-link">
          Netly
        </Link>
      </span>
      <span className="navbar-items">
        <NavLink to="/movies/new" className="navbar-link">
          New Movie
        </NavLink>
        <NavLink to="/login" className="navbar-link">
          Login
        </NavLink>
        <NavLink to="/register" className="navbar-link">
          Register
        </NavLink>
      </span>
    </nav>
  );
};

export default NavBar;
