// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom";
import "./Header.css"; // Importing the CSS file

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li>
          <Link to="/" exact activeClassName="active-link">
            DashBoard
          </Link>
        </li>
        <li>
          <Link to="/creation" activeClassName="active-link">
            Agent Creation
          </Link>
        </li>
        <li>
          <Link to="/ticket-entry" activeClassName="active-link">
            Ticket Creation
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
