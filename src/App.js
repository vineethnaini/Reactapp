// import React from 'react';
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
import React from "react";
import 'bootstrap';
// import $ from "jquery"
import { loginUsingRedux } from "./components/loginUsingRedux";
import { registerUsingRedux } from "./components/registerUsingRedux";
import { Notifications } from "./components/notifications";
import { Home } from "./components/home";
import { userHome } from "./components/userHome";
// import {resetPassword} from './containers/resetPassword'
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { Switch } from "react-router-dom";
import { Navbar, Nav , OverlayTrigger , Popover } from "react-bootstrap";
// import Popover  from "react-bootstrap";
import { forgotPassword } from "./components/forgotPassword";
import { newPassword } from "./components/newpassword";
import Button from "react-bootstrap/Button";
import { userConstants } from "./constants/user.constants";
import { userActions } from "./actions/user.actions";
import { stat } from "fs";
// import Echo from "laravel-echo";
// import Pusher from 'pusher-js/react-native'; 
const Pusher = require('pusher-js');
const $ = require('jquery'); 

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logout: false
    };
  }
  componentDidMount() {
  //   window.Echo = new Echo({
  //     broadcaster: 'pusher',
  //     key: '3834f98a5f4e0cf5e369',
  //     cluster: 'ap2',
  //     forceTLS: true
  // })
  // Echo.channel('my-channel')
  //   .listen('WelcomeEvent', (e) => {
  //       console.log(e);
  //   })
  // $('[data-toggle="popover"]').popover(
  //   {
  //     html: true,
  //     trigger: 'focus',
  //     content: (this.props.notifications[0])
  //   }
  // );
    var pusher = new Pusher('3834f98a5f4e0cf5e369', {
      appId: '838378',
      key: '3834f98a5f4e0cf5e369',
      secret: 'a2d9c2b500ad2e9a03a9',
      cluster: 'ap2',
      // encrypted: true
  });
  Pusher.logToConsole = true;
  // Subscribe to the channel we specified in our Laravel Event
  var channel = pusher.subscribe('my-channel');
  
  // Bind a function to a Event (the full Laravel class)
  // channel.bind('App\\Events\\StatusLiked', function(data) {
  //     // this is called when the event notification is received...
  // });
  channel.bind('my-event', function(data) {         //lol bind the callback u noob
    alert('An event was triggered with message: ' + data.message + ' by '+data.user.name);
    function success(data) {
      return { type: userConstants.NOTIFICATION_SUCCESS, data };
    }
    const addNotification = data => this.props.dispatch(success(data));
    addNotification(data);
  }.bind(this))
  }
  logoutbutton() {
    this.props.dispatch(userActions.logout());
    this.setState({
      logout: true
    });
  }
  objectToString = notifications =>{
    console.log(notifications)
    if(notifications.length === 0){
      console.log("beAEBv")
    return "No new Notifications"
    }
    else {
      let notifications_string = ""
      notifications.map(index => (
        notifications_string += (index.message) + "<br>"
      ))
      return notifications_string
    }
  }
  render() {
    $('[data-toggle="popover"]').popover(
      {
        html: true,
        trigger: 'focus',
        content: () => this.objectToString(this.props.notifications)
      }
    );
    const { alert } = this.props;
    var x = document.cookie;
    // console.log(x.split(";")[2].split("=")[1])
    console.log(x);

    if (x === "") {
      return (
        <div>
          {alert && alert.message && (
            <div className={`alert ${alert.type}`}>{alert.message}</div>
          )}
          <Router>
            <div>
              <Navbar className="topnav" expand="lg">
                <Navbar.Brand className="active" href="/">
                  Home
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="mr-auto" variant="pills">
                    <Link to="/login" className="glyphicon glyphicon-user mx-1">
                      Login
                    </Link>
                    <Link to="/register" className="mx-1">
                      Register
                    </Link>
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/users/" component={userHome} />
                <Route exact path="/login/" component={loginUsingRedux} />
                {/* <Route path="/logout/" component={Logout} /> */}
                <Route path="/forgotpassword/" component={forgotPassword} />
                <Route path="/newpassword/" component={newPassword} />
                <Route path="/register/" component={registerUsingRedux} />
              </Switch>
            </div>
          </Router>
        </div>
      );
    } else {
      return (
        <div>
          {/* {alert && alert.message &&
      <div className={`alert ${alert.type}`}>{alert.message}</div>
    } */}
          <Router>
              <Navbar className="topnav" fixed="top" expand="lg">
                <Navbar.Brand className="active" href="/">
                  Task Management
                </Navbar.Brand>
                <Nav className="mr-auto" variant="pills">
                  <Link to="/users/" className="mx-1">
                    Services
                  </Link>
                </Nav>
              <Nav>
              <Button type="button" className="btn btn-lg btn-secondary bs-docs-popover" data-toggle="popover" title="Popover title" >Notifications</Button>
              </Nav>
                <Nav >
                  <Button onClick={() => this.logoutbutton()}>Logout</Button>
                </Nav>
              </Navbar>
              <Switch>
                <Route path="/users/" component={userHome} />
                {/* <Route path="/login/" component={Login} /> */}
              </Switch>
          </Router>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  const { alert } = state;
  const { loggedIn } = state.authentication;
  const {notifications} = state.notification;
  return {
    alert,
    loggedIn,
    notifications
  };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
