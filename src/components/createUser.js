import React from "react";
import "./createUser.css";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux'

import { userActions } from '../actions/user.actions';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

class CreateUser extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        name: "",
        email: "",
        password: ""
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
    alert('Creation details' +this.state.name + this.state.email + this.state.password );
    event.preventDefault();
    const { name, email, password } = this.state;
      const { dispatch } = this.props;
      if (name && email && password) {
          dispatch(userActions.create(name, email, password));
      }
    
  }
  render() {
    const {name,email,password} = this.state;
      return (
        <Form onSubmit={this.handleSubmit}>
          <Form.Group as={Row} controlId="exampleForm.ControlTextarea1">
          <Form.Label column sm="2">Name</Form.Label>
          <Col sm="10">
          <Form.Control type="text" name = "name" value={name} onChange={this.handleInputChange} placeholder="Enter name" />
          </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formGroupEmail">
          <Form.Label column sm="2">Email address</Form.Label>
          <Col sm="10">
          <Form.Control type="email" name = "email" value={email} onChange={this.handleInputChange} placeholder="Enter email" />
          </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formGroupPassword">
              <Form.Label column sm="2">Password</Form.Label>
              <Col sm="10">
              <Form.Control type="password" name = "password" value={password} onChange={this.handleInputChange} placeholder="Password" />
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
const { creating } = state.creation;
return {
    creating
};
}

const connectedCreatePage = connect(mapStateToProps)(CreateUser);
export { connectedCreatePage as CreateUser }; 