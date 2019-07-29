import React from "react";
import "./forgotPassword.css";
import { connect } from 'react-redux';
import { userActions } from '../actions/user.actions';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

class forgotPassword extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
            redirect: false
          };
          this.handleInputChange = this.handleInputChange.bind(this);
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
    handleSubmit(event) {
      alert('Check details' +this.state.email);
      event.preventDefault();
      const {email} = this.state;
        const { dispatch } = this.props;
        if (email) {
            dispatch(userActions.forgotPassword(email));
        }
    }
    render() {
      console.log(this.props)
      if(this.props.forgotsent){
        alert('Check Email');
      }
      return (
        <Form onSubmit={this.handleSubmit}>
          <Form.Group as={Row} controlId="formGroupEmail">
          <Form.Label column sm="2">Email address</Form.Label>
          <Col sm="10">
          <Form.Control type="email" name = "email" value={this.state.email} onChange={this.handleInputChange} placeholder="Enter email" />
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

function mapStateToProps(state) {
  const { forget,forgotsent } = state.forgot;
  return {
      forget,
      forgotsent
  };
}

const connectedforgotPasswordPage = connect(mapStateToProps)(forgotPassword);
export { connectedforgotPasswordPage as forgotPassword }; 