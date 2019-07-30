import React from "react";
import "./login.css";
import { connect } from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { userActions } from "../actions/user.actions";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.props.dispatch(userActions.logout());
    this.state = {
      email: "",
      password: "",
      temp: false
    };
    // this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value
    });
  }
  handleForgot() {
    window.location.replace("http://localhost:3000/forgotpassword");
  }
  handleSubmit(event) {
    alert("Login details" + this.state.email + this.state.password);
    event.preventDefault();
    const { email, password } = this.state;
    const { dispatch } = this.props;
    if (email && password) {
      dispatch(userActions.login(email, password));
    }
  }
  render() {
    const { email, password } = this.state;
    if (this.props.loggedIn) {
      console.log("kwbkfjwbaf");
    } else {
      return (
        <div>
          {localStorage.getItem("reset") == null && (
            <Form onSubmit={this.handleSubmit}>
              <Form.Group as={Row} controlId="formGroupEmail">
                <Form.Label column sm="2">
                  Email address
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="email"
                    name="email"
                    value={email}
                    onChange={e => this.handleInputChange(e)}
                    placeholder="Enter email"
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formGroupPassword">
                <Form.Label column sm="2">
                  Password
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="password"
                    name="password"
                    value={password}
                    onChange={e => this.handleInputChange(e)}
                    placeholder="Password"
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Col sm={{ span: 10, offset: 2 }}>
                  <Button variant="outline-primary" type="submit">
                    Submit
                  </Button>
                </Col>
              </Form.Group>
            </Form>
          )}
          <Form.Group as={Row}>
            <Col sm={{ span: 10, offset: 2 }}>
              <Button
                variant="outline-secondary"
                onClick={() => this.handleForgot()}
              >
                forgotPassword
              </Button>
            </Col>
          </Form.Group>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  const { loggingIn, loggedIn } = state.authentication;
  return {
    loggingIn,
    loggedIn
  };
}

const connectedLoginPage = connect(mapStateToProps)(Login);
export { connectedLoginPage as Login };
