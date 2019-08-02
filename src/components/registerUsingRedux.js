import React from "react";
import RegisterForm from "./RegisterForm";
import { connect } from "react-redux";
import { userActions } from "../actions/user.actions";

class registerUsingRedux extends React.Component {
  submit = values => {
    // console.log(values.email)

    this.props.dispatch(userActions.register(values.name,values.email, values.password));
  };
  render() {
    return (
      <div>
        <RegisterForm onSubmit={this.submit} />
      </div>
    );
  }
}

const connectedRegisterPage = connect()(registerUsingRedux);
export { connectedRegisterPage as registerUsingRedux };
