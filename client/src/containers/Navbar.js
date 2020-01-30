import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { logout } from "../store/actions";

const Navbar = ({ auth, logout }) => {
  const hideShow = auth => {
    const className = !auth.isAuthenticated ? "show" : "hide";
    return className;
  };

  return (
    <nav>
      <ul>
        <li className="home">
          <Link to="/">Home</Link>
        </li>
        <li className={hideShow(auth)}>
          <Link to="/register">Register</Link>
        </li>
        <li className={hideShow(auth)}>
          <Link to="/login">Login</Link>
        </li>
        <li></li>
      </ul>
      <div>
        <span>Logged in as: {auth && auth.user.username}</span>
        <button
          className={auth.isAuthenticated ? "show" : "hide"}
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default connect(store => ({ auth: store.auth }), { logout })(Navbar);
