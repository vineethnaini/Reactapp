import React from "react";
import LoginForm from "./LoginForm";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import { userActions } from "../actions/user.actions";

class loginUsingRedux extends React.Component {
  submit = values => {
    // console.log(values.email)

    this.props.dispatch(userActions.login(values.email, values.password));
  };

  handleForgot() {
    window.location.replace("http://localhost:3000/forgotpassword");
  }
  render() {
    return (
      <div>
        <LoginForm onSubmit={this.submit} />
        <Button variant="outline-secondary" onClick={() => this.handleForgot()}>
          forgotPassword
        </Button>
      </div>
    );
  }
}

const connectedLoginPage = connect()(loginUsingRedux);
export { connectedLoginPage as loginUsingRedux };
