import React from 'react';
import { connect } from 'react-redux';

import { userActions } from '../actions/user.actions';
import {filterUser} from './filterUser'
import {CreateUser} from './createUser'
import {Profile} from './profile'

import "./userHome.css";
import Button from 'react-bootstrap/Button';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import { Switch} from 'react-router-dom'
import { Login } from './login';
import  Dashboard  from './dashboard';
import { listTasks } from './listtasks';
import { createTask } from './createtask';
import { Navbar,Nav} from 'react-bootstrap';
import { alertActions } from '../actions/alert.actions';

class userHome extends React.Component {

  // logoutbutton() {
  //   this.props.dispatch(userActions.logout())
  // }
    render(){
        // const { user } = this.props;
        console.log(this.props)
        // const user_token = JSON.parse(localStorage.getItem('user')).token;
        if(document.cookie === ""){
            return (
              <Router>
            <div>
              <a>Need to login first,click </a>
              <NavLink to ="/login">here</NavLink>

              <Switch>
               <Route exact path="/login/" component={Login} />
               </Switch>
            </div>
          </Router>
            )
        }
        else {
        return (
            <Router>
            <div>
              <Navbar bg = "light" expand = "lg" className = "tabs">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
            <Nav variant="pills"  className="navbar navbar-expand-lg navbar-light bg-light" expand="lg" 
               defaultActiveKey="/users/dashboard"
            >
              {/* <Nav.Item>
                <Link to ="/tasks/dashboard">Dashboard</Link>
              </Nav.Item> */}

              <Nav.Item >
                <NavLink activeStyle={
                  { fontWeight: "bold", color: "red"
                  }}
                 to="/users/dashboard" className = "mx-1">Dashboard</NavLink>
              </Nav.Item>
              <Nav.Item>
                <NavLink activeStyle={
                  { fontWeight: "bold", color: "red"
                  }}
                 to="/users/tasks/list" className = "mx-1">Tasks</NavLink>
              </Nav.Item>
              <Nav.Item>
                <NavLink activeStyle={
                  { fontWeight: "bold", color: "red"
                  }}
                 to="/users/filter" className = "mx-1">Filteruser</NavLink>
              </Nav.Item>
              <Nav.Item>
                <NavLink activeStyle={
                  { fontWeight: "bold", color: "red"
                  }}
                  to="/users/create" className = "mx-1">Createuser</NavLink>
              </Nav.Item>
              <Nav.Item>
                <NavLink activeStyle={
                  { fontWeight: "bold", color: "red"
                  }}
                to="/users/tasks/create" className = "mx-1">Createtask</NavLink>
              </Nav.Item>

              {/* <Nav.Item>
                <Link to="/users/:id">Get user profile</Link>
              </Nav.Item> */}
            </Nav>
            {/* <Nav className ="ml-auto">
                <Button variant="outline-dark"onClick= {() => this.logoutbutton()}>Logout</Button>
            </Nav> */}
            </Navbar.Collapse>
            </Navbar>
              <Switch>
               <Route exact path="/users/filter" component={filterUser} /> 
               <Route path="/users/create" component={CreateUser} />
               <Route exact path = "/users/tasks/create" component = {createTask}/>
               <Route exact path = "/users/tasks/list" component = {listTasks}/>
               <Route path = "/users/dashboard" component = {Dashboard}/>
               <Route path = "/users/:id" component = {Profile}/>
              {/* { <Route path="/users/:id/delete" component={deleteUser} /> } */}
               </Switch>
            </div>
            
          </Router>

        )
        }
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user,loggedIn } = authentication;
    return {
        user,
        users,
        loggedIn
    };
}

const connectedUserHomePage = connect(mapStateToProps)(userHome);
export { connectedUserHomePage as userHome };
