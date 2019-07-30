import React from "react";
import "./createtask.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";

import { userActions } from "../actions/user.actions";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Dropdown from "react-bootstrap/Dropdown";
class createTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      duedate: "",
      duetime: "",
      duedate: "",
      assignee: "",
      assignee_name: "..Select.."
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.props.dispatch(userActions.userList());
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
    alert(
      "Creation details" +
        this.state.name +
        this.state.email +
        this.state.password
    );
    event.preventDefault();
    const { title, duetime, duedate, description, assignee } = this.state;
    const { dispatch } = this.props;
    if (title && duetime && description && assignee && duedate) {
      dispatch(
        userActions.createTask(
          title,
          description,
          duedate + " " + duetime,
          assignee
        )
      );
    }
  }
  handleSelect(id, name) {
    console.log(name);
    this.setState({
      assignee: id,
      assignee_name: name
    });
  }
  render() {
    console.log(this.props);
    const {
      title,
      duedate,
      duetime,
      description,
      assignee,
      assignee_name
    } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group as={Row} controlId="exampleForm.ControlTextarea1">
          <Form.Label column sm="2">
            Title
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              name="title"
              value={title}
              onChange={this.handleInputChange}
              placeholder="Enter title"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="exampleForm.ControlTextarea1">
          <Form.Label column sm="2">
            Description
          </Form.Label>
          <Col sm="10">
            <Form.Control
              as="textarea"
              type="text"
              name="description"
              value={description}
              onChange={this.handleInputChange}
              placeholder="Enter description"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="exampleForm.ControlTextarea1">
          <Form.Label column sm="2">
            Duetime
          </Form.Label>
          <Col sm="3">
            <Form.Control
              type="date"
              name="duedate"
              value={duedate}
              onChange={this.handleInputChange}
            />
          </Col>
          <Col sm="3">
            <Form.Control
              type="time"
              name="duetime"
              value={duetime}
              onChange={this.handleInputChange}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm="2">
            Assignee
          </Form.Label>
          {this.props.listed && (
            <Col sm="10">
              {
                <Dropdown>
                  <Dropdown.Toggle>{assignee_name}</Dropdown.Toggle>
                  <Dropdown.Menu>
                    {this.props.usernames.map(index => (
                      <Dropdown.Item
                        key={index.id}
                        onSelect={() => this.handleSelect(index.id, index.name)}
                        active={index.id === assignee}
                      >
                        {index.name}
                      </Dropdown.Item>
                    ))}
                    <Dropdown.Item
                      onSelect={() => this.handleSelect("", "..Select..")}
                    >
                      ..Clear..
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              }
            </Col>
          )}
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
  const { creatingtask } = state.createtask;
  const { listed, usernames } = state.list;
  return {
    creatingtask,
    listed,
    usernames
  };
}

const connectedCreateTaskPage = connect(mapStateToProps)(createTask);
export { connectedCreateTaskPage as createTask };
