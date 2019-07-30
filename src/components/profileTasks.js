import React from "react";
import "./profileTasks.css";
import { connect } from "react-redux";
import Table from "react-bootstrap/Table";

import { userActions } from "../actions/user.actions";

class ProfileTasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: []
    };
  }
  componentDidMount() {
    this.props.dispatch(userActions.profileTasks(this.props.profile_id));
  }
  render() {
    return (
      <div>
        {this.props.gotprofiletask && (
          <Table striped bordered hover size="sm">
            <thead>
              {
                <tr>
                  <th>TITLE</th>
                  <th>DESCRIPTION</th>
                  <th>STATUS</th>
                  <th>DUE</th>
                </tr>
              }
            </thead>
            <tbody>
              {this.props.tasks.map(index => (
                <tr key={index.id}>
                  <td>{index.title}</td>
                  <td>{index.description}</td>
                  <td>{index.status}</td>
                  <td>{index.duetime}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { tasks, gotprofiletask } = state.profiletasks;
  const { profile_id, fetched_profile } = state.profile;
  return {
    tasks,
    gotprofiletask,
    profile_id,
    fetched_profile
  };
}
const connectedProfileTasksPage = connect(mapStateToProps)(ProfileTasks);
export { connectedProfileTasksPage as ProfileTasks };
