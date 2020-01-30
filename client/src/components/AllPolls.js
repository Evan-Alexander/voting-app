import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { getPolls, getUserPolls, getCurrentPoll } from "../store/actions";

export class AllPolls extends Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    const { getPolls } = this.props;
    getPolls();
  }

  handleSelect = id => {
    const { history } = this.props;
    history.push(`/poll/${id}`);
  };

  render() {
    const { auth, getPolls, getUserPolls } = this.props;

    const polls = this.props.polls.map(poll => (
      <li onClick={() => this.handleSelect(poll._id)} key={poll._id}>
        <span>{poll.question}</span>
      </li>
    ));
    return (
      <Fragment>
        {auth.isAuthenticated && (
          <div>
            <div>
              <button onClick={getPolls}>All polls</button>
            </div>
            {/* <div>
              <button onClick={getUserPolls}>My polls</button>
            </div> */}
          </div>
        )}
        <ul>{polls}</ul>
      </Fragment>
    );
  }
}

export default connect(
  store => ({
    auth: store.auth,
    polls: store.polls
  }),
  { getPolls, getUserPolls, getCurrentPoll }
)(AllPolls);
