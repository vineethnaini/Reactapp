import React from "react";
import { Field, reduxForm } from "redux-form";
import Button from "react-bootstrap/Button";

let LoginForm = props => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div className = "form-group">
        <label htmlFor="email">Email</label>
        <Field name="email" className="form-control" id="email" placeholder="Enter email" component="input" type="email" />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <Field name="password" className="form-control" id="password" placeholder="Enter password" component="input" type="password" />
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
};

LoginForm = reduxForm({
  form: "login"
})(LoginForm);

export default LoginForm;
