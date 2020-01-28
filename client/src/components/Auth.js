import React, { Component } from "react";
import { connect } from "react-redux";

import { authUser, logout } from "../store/actions";

export class Auth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    const { username, password } = this.state;
    const { authType } = this.props;
    e.preventDefault();

    // If there's not authType specified, this will default to 'login'
    this.props.authUser(authType || "login", { username, password });
  };

  render() {
    const { username, password } = this.state;
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            value={username}
            name="username"
            onChange={this.handleChange}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={password}
            name="password"
            onChange={this.handleChange}
          />
          <button type="submit">Submit</button>
        </form>
      </>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = { authUser, logout };

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
