// eslint-disable-next-line no-unused-vars
import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css"; // Importing the CSS file

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li>
          <NavLink to="/" exact activeClassName="active-link">
            DashBoard
          </NavLink>
        </li>
        <li>
          <NavLink to="/creation" activeClassName="active-link">
            Agent Creation
          </NavLink>
        </li>
        <li>
          <NavLink to="/ticket-entry" activeClassName="active-link">
            Ticket Creation
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
