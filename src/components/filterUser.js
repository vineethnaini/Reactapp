import React from "react";
import "./filterUser.css";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import Col from "react-bootstrap/Col";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { userActions } from "../actions/user.actions";
import { userConstants } from "../constants/user.constants";

class filterUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      createdBy: "",
      role: "",
      currentPage: 1
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.props.dispatch(
      userActions.filterUser(
        this.state.name,
        this.state.email,
        this.state.role,
        this.state.createdBy,
        this.state.currentPage
      )
    );
  }
  componentDidUpdate() {
    console.log(this.state.role);
  }
  handleInputChange = event => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState(
      {
        [name]: value
      },
      () =>
        this.setState(
          {
            currentPage: 1
          },
          () =>
            this.props.dispatch(
              userActions.filterUser(
                this.state.name,
                this.state.email,
                this.state.role,
                this.state.createdBy,
                this.state.currentPage
              )
            )
        )
    );
    //   setTimeout(() => {
    //     this.props.dispatch(userActions.filterUser(this.state.name,this.state.email,this.state.role.createdBy,this.state.currentPage))
    // },100)
  };
  handleInputChange2 = event => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value
    });
  };
  handleDeleteUser(id) {
    this.props.dispatch(
      userActions.userDelete(
        id,
        this.state.name,
        this.state.role,
        this.state.email,
        this.state.createdBy
      )
    );
  }

  handleUserProfile(id) {
    function success(id) {
      return { type: userConstants.PROFILE_SUCCESS, id };
    }
    const addId = id => this.props.dispatch(success(id));
    console.log(id);
    addId(id);
    // window.location.replace("http://localhost:3000/users/"+id);
    // this.props.dispatch(userActions.userDelete(id,this.state.name,this.state.role,this.state.email,this.state.createdBy));
  }
  prevPage() {
    if (this.state.currentPage > 1) {
      const { name, email, role, createdBy, currentPage } = this.state;
      this.props.dispatch(
        userActions.filterUser(name, email, role, createdBy, currentPage - 1)
      );
      this.setState({ currentPage: currentPage - 1 });
    }
  }
  nextPage(last_page) {
    if (this.state.currentPage < last_page) {
      const { name, email, role, createdBy, currentPage } = this.state;
      this.props.dispatch(
        userActions.filterUser(name, email, role, createdBy, currentPage + 1)
      );
      this.setState({ currentPage: currentPage + 1 });
    }
  }
  handleRoleChange(id) {
    this.props.dispatch(
      userActions.roleChange(
        id,
        this.state.name,
        this.state.role,
        this.state.email,
        this.state.createdBy
      )
    );
  }
  handleSubmit(event) {
    alert(
      "input details" +
        this.state.name +
        this.state.email +
        this.state.role +
        this.state.createdBy
    );
    event.preventDefault();
    const { name, email, role, createdBy, currentPage } = this.state;
    const { dispatch } = this.props;
    dispatch(userActions.filterUser(name, email, role, createdBy, currentPage));
  }

  render() {
    console.log(this.state);
    return (
      // <ReactJson src = {users}/>
      <div>
        <div>
          <Form onSubmit={this.handleSubmit}>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridText">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleInputChange}
                  placeholder="Enter name"
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleInputChange}
                  placeholder="Enter email"
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Role</Form.Label>
                <Form.Control
                  as="select"
                  name="role"
                  onChange={this.handleInputChange2}
                >
                  <option value="">All</option>
                  <option value="admin">Admin</option>
                  <option value="normal">Normal</option>
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col} controlId="formGridText">
                <Form.Label>CreatedBy</Form.Label>
                <Form.Control
                  type="text"
                  name="createdBy"
                  value={this.state.createdBy}
                  onChange={this.handleInputChange2}
                  placeholder="Enter created by"
                />
              </Form.Group>
            </Form.Row>
            <Button variant="outline-primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
        <div>
          {this.props.filtered && (
            <Table striped bordered hover size="sm">
              <thead>
                {
                  <tr>
                    <th>NAME</th>
                    <th>ROLE</th>
                    {this.props.user.user.roles ===
                      "admin" && <th>ACTION</th>}
                  </tr>
                }
              </thead>
              <tbody>
                {this.props.users.data.map(index => (
                  <tr key={index.id}>
                    <td>{index.name}</td>
                    <td>{index.roles}</td>
                    {this.props.user.user.roles === "admin" &&
                      index.roles === "normal" && (
                        <td>
                          <Button
                            variant="danger"
                            onClick={() => this.handleDeleteUser(index.id)}
                          >
                            Delete
                          </Button>
                          <Button
                            variant="outline-primary"
                            onClick={() => this.handleRoleChange(index.id)}
                          >
                            MakeAdmin
                          </Button>
                          <Button variant="outline-primary">
                            <Link
                              to={"/users/" + index.id}
                              onClick={() => this.handleUserProfile(index.id)}
                            >
                              Profile
                            </Link>
                          </Button>
                        </td>
                      )}
                    {this.props.user.user.roles === "admin" &&
                      index.roles === "admin" && (
                        <td>
                          <Button variant="outline-primary">
                            <Link
                              to={"/users/" + index.id}
                              onClick={() => this.handleUserProfile(index.id)}
                            >
                              Profile
                            </Link>
                          </Button>
                        </td>
                      )}
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
          {this.props.filtered && (
            <Button onClick={() => this.prevPage()}>Prev</Button>
          )}
          {this.props.filtered && (
            <Button onClick={() => this.nextPage(this.props.users.last_page)}>
              Next
            </Button>
          )}
        </div>
      </div>
    );
    // else {
    // return (
    //   <Form onSubmit={this.handleSubmit}>
    //     <Form.Row>
    //       <Form.Group as={Col} controlId="formGridText">
    //         <Form.Label>Name</Form.Label>
    //         <Form.Control type="text" name ="name" value={this.state.name} onChange={this.handleInputChange} placeholder="Enter name" />
    //       </Form.Group>
    //       <Form.Group as={Col} controlId="formGridEmail">
    //         <Form.Label>Email</Form.Label>
    //         <Form.Control type="email" name = "email" value={this.state.email} onChange={this.handleInputChange} placeholder="Enter email" />
    //       </Form.Group>
    //       <Form.Group as={Col} controlId="formGridText">
    //         <Form.Label>Role</Form.Label>
    //         <Form.Control type="text" name = "role" value={this.state.role} onChange={this.handleInputChange} placeholder="Enter role" />
    //       </Form.Group>
    //       <Form.Group as={Col} controlId="formGridText">
    //         <Form.Label>CreatedBy</Form.Label>
    //         <Form.Control type="text" name = "createdBy" value={this.state.createdBy} onChange={this.handleInputChange} placeholder="Enter created by" />
    //       </Form.Group>
    //     </Form.Row>
    //       <Button variant="outline-primary" type="submit">
    //         Submit
    //       </Button>
    //     </Form>
    // );
    // }
  }
}

function mapStateToProps(state) {
  const { filtering, users, filtered } = state.filter;
  const { user } = state.authentication;
  return {
    filtering,
    users,
    filtered,
    user
  };
}
const connectedFilterPage = connect(mapStateToProps)(filterUser);
export { connectedFilterPage as filterUser };
