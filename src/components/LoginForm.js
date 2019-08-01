import React from "react";
import "./login.css"
import { Field, reduxForm } from "redux-form";
import Button from "react-bootstrap/Button";

const validate = values => {
  const errors = {};
  if (!values.password) {
    errors.password = "Required";
  } else if (
    !/^(?=.*[0-9])(?=.*[- ?!@#$%^&*\/\\])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9- ?!@#$%^&*\/\\]{8,255}$/i.test(
      values.password
    )
  ) {
    errors.password =
      "Atleast 8 length & one each of Uppercase,Lowercase,numeral and special character";
  }
  if (!values.email) {
    errors.email = "Required";
  } else if (
    !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/i.test(values.email)
  ) {
    errors.email = "Invalid email address";
  }
  return errors;
};
const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched && (error && <span>{error}</span>)}
    </div>
  </div>
);
let LoginForm = props => {
  const { handleSubmit } = props;
  return (
    <form id ="login" onSubmit={handleSubmit}>
      <Field
        name="email"
        placeholder="Enter email"
        component={renderField}
        type="email"
        label="Email"
      />
      <Field
        name="password"
        placeholder="Enter password"
        component={renderField}
        type="password"
        label="Password"
      />
      <div className="text-center">
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
};

LoginForm = reduxForm({
  form: "login",
  validate
})(LoginForm);

export default LoginForm;
