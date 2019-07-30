import React from "react";
import "./forgotPassword.css";

import { connect } from "react-redux";
import { userActions } from "../actions/user.actions";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

class newPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      redirect: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit2 = this.handleSubmit2.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value
    });
  }
  handleSubmit2(event) {
    alert("Check details" + this.state.password);
    event.preventDefault();
    const { password } = this.state;
    const { dispatch } = this.props;
    if (password) {
      dispatch(
        userActions.resetPassword(
          password,
          this.props.location.search.split("=")[1]
        )
      );
    }
  }
  render() {
    return (
      <Form onSubmit={this.handleSubmit2}>
        <Form.Group as={Row} controlId="formGroupPassword">
          <Form.Label column sm="2">
            Password
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleInputChange}
              placeholder="Enter Password"
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
    );
  }
}

const connectednewPasswordPage = connect()(newPassword);
export { connectednewPasswordPage as newPassword };
