import React from "react";
import "./dashboardtasks.css";
import { connect } from "react-redux";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

import { userActions } from "../actions/user.actions";

class DashboardTasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: []
    };
  }
  componentDidMount() {
    this.props.dispatch(userActions.dashboardTasks());
  }
  handleStarting(id) {
    this.props.dispatch(userActions.taskStatusUpdate(id, "in_progress"));
  }
  handleCompleted(id) {
    this.props.dispatch(userActions.taskStatusUpdate(id, "completed"));
  }
  render() {
    return (
      <div>
        {this.props.gottask && (
          <Table striped bordered hover size="sm">
            <thead>
              {
                <tr>
                  <th>TITLE</th>
                  <th>DESCRIPTION</th>
                  <th>STATUS</th>
                  <th>DUE</th>
                  <th>UPDATE</th>
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
                  {index.status === "assigned" && (
                    <td>
                      <Button
                        variant="primary"
                        onClick={() => this.handleStarting(index.id)}
                      >
                        Start
                      </Button>
                    </td>
                  )}
                  {index.status === "in_progress" && (
                    <td>
                      <Button
                        variant="primary"
                        onClick={() => this.handleCompleted(index.id)}
                      >
                        Complete
                      </Button>
                    </td>
                  )}
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
  const { tasks, gottask } = state.dashboardtask;
  return {
    tasks,
    gottask
  };
}
const connectedDashboardTasksPage = connect(mapStateToProps)(DashboardTasks);
export { connectedDashboardTasksPage as DashboardTasks };
