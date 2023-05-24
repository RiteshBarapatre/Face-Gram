import React, { useContext } from "react";
import "../styles/navbar.css";
import { Avatar, Box, Button, Container } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import Login from "./Login";

const Navbar = () => {
  const styles = ({ isActive }) => ({
    borderBottom: isActive ? "1px solid #E11299" : "",
  });



  return (
      <div className="navbar">
        <div className="navbar__logo">FACE-GRAM</div>
        <ul>
          <NavLink className="navbar__li" to="/" style={styles}>
            Home
          </NavLink>
          <NavLink className="navbar__li" to="/about" style={styles}>
            About
          </NavLink>
          <NavLink className="navbar__li" to="/contact" style={styles}>
            Contact
          </NavLink>
          <Login/>
        </ul>
      </div>
  );
};

export default Navbar;
