import React from "react";
import { connect } from "react-redux";

import { userActions } from "../actions/user.actions";
import { filterUser } from "./filterUser";
import { CreateUser } from "./createUser";
import { Profile } from "./profile";

import "./userHome.css";
import Button from "react-bootstrap/Button";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import { Switch } from "react-router-dom";
import { Login } from "./login";
import Dashboard from "./dashboard";
import { Notifications } from "./notifications";
import { listTasks } from "./listtasks";
import { createTask } from "./createtask";
import { Navbar, Nav } from "react-bootstrap";
import { alertActions } from "../actions/alert.actions";
// const Pusher = require('pusher-js');

class userHome extends React.Component {
  // logoutbutton() {
  //   this.props.dispatch(userActions.logout())
  // }

  componentDidMount() {
    console.log(document.cookie)
    if (document.cookie !== "") {
      this.props.dispatch(userActions.getUser());
    }
  //   var pusher = new Pusher('3834f98a5f4e0cf5e369', {
  //     appId: '838378',
  //     key: '3834f98a5f4e0cf5e369',
  //     secret: 'a2d9c2b500ad2e9a03a9',
  //     cluster: 'ap2',
  //     // encrypted: true
  // });
  // Pusher.logToConsole = true;
  // var channel = pusher.subscribe('my-channel');
  // channel.bind('my-event', function(data) {
  //   alert('An event was triggered with message: ' + data.message);
  // });
  }
  render() {
    // const { user } = this.props;
    console.log(this.props);
    // const user_token = JSON.parse(localStorage.getItem('user')).token;
    if (document.cookie === "") {
      return (
        <Router>
          <div>
            <a>Need to login first,click </a>
            <NavLink to="/login">here</NavLink>

            <Switch>
              <Route exact path="/login/" component={Login} />
            </Switch>
          </div>
        </Router>
      );
    } else {
      return (
        <Router>
          <div id="container-scroll">
            <Navbar
              id="navbar3"
              bg="light"
              expand="lg"
              className="nav nav-tabs tabs"
            >
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav
                  variant="pills"
                  className="navbar navbar-expand-lg navbar-light bg-light"
                  expand="lg"
                  defaultActiveKey="/users/dashboard"
                >
                  <Nav.Item>
                    <NavLink
                      activeStyle={{ fontWeight: "bold", color: "red" }}
                      to="/users/dashboard"
                      className="mx-1"
                    >
                      Dashboard
                    </NavLink>
                  </Nav.Item>
                  <Nav.Item>
                    <NavLink
                      activeStyle={{ fontWeight: "bold", color: "red" }}
                      to="/users/tasks/list"
                      className="mx-1"
                    >
                      Tasks
                    </NavLink>
                  </Nav.Item>
                  <Nav.Item>
                    <NavLink
                      activeStyle={{ fontWeight: "bold", color: "red" }}
                      to="/users/filter"
                      className="mx-1"
                    >
                      Filteruser
                    </NavLink>
                  </Nav.Item>
                  <Nav.Item>
                    <NavLink
                      activeStyle={{ fontWeight: "bold", color: "red" }}
                      to="/users/create"
                      className="mx-1"
                    >
                      Createuser
                    </NavLink>
                  </Nav.Item>
                  <Nav.Item>
                    <NavLink
                      activeStyle={{ fontWeight: "bold", color: "red" }}
                      to="/users/tasks/create"
                      className="mx-1"
                    >
                      Createtask
                    </NavLink>
                  </Nav.Item>
                  <Nav.Item>
                    <NavLink
                      activeStyle={{ fontWeight: "bold", color: "red" }}
                      to="/users/notifications"
                      className="mx-1"
                    >
                      notifications
                    </NavLink>
                  </Nav.Item>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
            <Switch>
              <Route exact path="/users/filter" component={filterUser} />
              <Route exact path="/users/notifications" component={Notifications} />
              <Route path="/users/create" component={CreateUser} />
              <Route exact path="/users/tasks/create" component={createTask} />
              <Route exact path="/users/tasks/list" component={listTasks} />
              <Route path="/users/dashboard" component={Dashboard} />
              <Route path="/users/:id" component={Profile} />
            </Switch>
          </div>
        </Router>
      );
    }
  }
}

function mapStateToProps(state) {
  const { users, authentication } = state;
  const { user, loggedIn } = authentication;
  const {notifications} = state.notification
  return {
    user,
    users,
    loggedIn,
    notifications
  };
}

const connectedUserHomePage = connect(mapStateToProps)(userHome);
export { connectedUserHomePage as userHome };
