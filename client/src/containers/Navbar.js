import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { logout } from "../store/actions";

const Navbar = ({ auth, logout }) => {
  return (
    <nav>
      <p>Logged in as: {auth && auth.user.username}</p>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/test">Test</Link>
        </li>
        <li>
          <button onClick={logout}>Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default connect(store => ({ auth: store.auth }), { logout })(Navbar);
