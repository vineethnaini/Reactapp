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
import {loginUsingRedux} from "./components/loginUsingRedux"
import {registerUsingRedux} from "./components/registerUsingRedux"
import { Home } from "./components/home";
import { userHome } from "./components/userHome";
// import {resetPassword} from './containers/resetPassword'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import { Switch } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { forgotPassword } from "./components/forgotPassword";
import { newPassword } from "./components/newpassword";
import Button from "react-bootstrap/Button";
import { userActions } from "./actions/user.actions";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logout: false
    };
  }
  logoutbutton() {
    this.props.dispatch(userActions.logout());
    this.setState({
      logout: true
    });
  }
  render() {
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
            <div>
              <Navbar className="topnav" fixed="top" expand="lg">
                <Navbar.Brand className="active" href="/">
                  Task Management
                </Navbar.Brand>
                <Nav className="mr-auto" variant="pills">
                  <Link to="/users/" className="mx-1">
                    Services
                  </Link>
                </Nav>
                <Nav className="ml-auto">
                  <Button onClick={() => this.logoutbutton()}>Logout</Button>
                </Nav>
              </Navbar>

              <Switch>
                <Route path="/users/" component={userHome} />
                {/* <Route path="/login/" component={Login} /> */}
              </Switch>
            </div>
          </Router>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  const { alert } = state;
  const { loggedIn } = state.authentication;
  return {
    alert,
    loggedIn
  };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
