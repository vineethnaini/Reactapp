import React from "react";
import "./createtask.css";
import { connect } from "react-redux";

import { userActions } from "../actions/user.actions";
class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  render() {
    return (
      <div>
        <ul>
          {this.props.notifications.map(index => (
            <li key={index.message}>{index.message}</li>
          ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { notifications } = state.notification;
  return {
    notifications
  };
}

const connectedNotificationsPage = connect(mapStateToProps)(Notifications);
export { connectedNotificationsPage as Notifications };
