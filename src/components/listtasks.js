import React, { useState } from "react";
import "./listtasks.css";
import { connect } from "react-redux";
import Table from "react-bootstrap/Table";

import { userActions } from "../actions/user.actions";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Modal } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Dropdown from "react-bootstrap/Dropdown";
var moment = require("moment");

function Example(props) {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState(props.description);
  const [duetime, setTime] = useState(moment(props.duetime).format("HH:mm:ss"));
  const [duedate, setDate] = useState(
    moment(props.duetime).format("YYYY-MM-DD")
  );
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSave = () => {
    props.dispatch(
      userActions.editTask(
        title,
        description,
        duedate + " " + duetime,
        props.id,
        props.title_form,
        props.assignee_id,
        props.assigner_id,
        props.start_time,
        props.end_time,
        props.currentPage
      )
    );
    setShow(false);
  };
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group as={Row} controlId="exampleForm.ControlTextarea1">
              <Form.Label column sm="2">
                Title
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  name="title"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
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
                  onChange={e => setDescription(e.target.value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="exampleForm.ControlTextarea1">
              <Form.Label column sm="2">
                Duedate
              </Form.Label>
              <Form.Control
                type="date"
                name="duedate"
                value={duedate}
                onChange={e => setDate(e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Row} controlId="exampleForm.ControlTextarea1">
              <Form.Label column sm="2">
                Duetime
              </Form.Label>
              <Form.Control
                type="time"
                name="duetime"
                value={duetime}
                onChange={e => setTime(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

class listTasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      assignee_id: "",
      assigner_id: "",
      start_time: "",
      end_time: "",
      currentPage: 1,
      assignee_name: "..Select..",
      assigner_name: "..Select.."
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(userActions.userList());
    // this.props.dispatch(userActions.listTasks(this.state.title,this.state.assignee_id,this.state.assigner_id,this.state.start_time,this.state.end_time,this.state.currentPage));
  }
  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState(
      {
        [name]: value
      },
      () =>
        this.setState({
          currentPage: 1
        })
    ); //,() => this.props.dispatch(userActions.listTasks(this.state.title,this.state.assignee_id,this.state.assigner_id,this.state.start_time,this.state.end_time,this.state.currentPage))))
  }

  prevPage() {
    if (this.state.currentPage > 1) {
      const {
        title,
        assignee_id,
        assigner_id,
        start_time,
        end_time,
        currentPage
      } = this.state;
      this.props.dispatch(
        userActions.listTasks(
          title,
          assignee_id,
          assigner_id,
          start_time,
          end_time,
          currentPage - 1
        )
      );
      this.setState({ currentPage: currentPage - 1 });
    }
  }
  nextPage(last_page) {
    if (this.state.currentPage < last_page) {
      const {
        title,
        assignee_id,
        assigner_id,
        start_time,
        end_time,
        currentPage
      } = this.state;
      this.props.dispatch(
        userActions.listTasks(
          title,
          assignee_id,
          assigner_id,
          start_time,
          end_time,
          currentPage + 1
        )
      );
      this.setState({ currentPage: currentPage + 1 });
    }
  }

  handleSubmit(event) {
    alert("input details" + this.state.title);
    event.preventDefault();
    const {
      title,
      assignee_id,
      assigner_id,
      start_time,
      end_time,
      currentPage
    } = this.state;
    const { dispatch } = this.props;
    dispatch(
      userActions.listTasks(
        title,
        assignee_id,
        assigner_id,
        start_time,
        end_time,
        currentPage
      )
    );
  }
  handleDelete(id) {
    const {
      title,
      assignee_id,
      assigner_id,
      start_time,
      end_time,
      currentPage
    } = this.state;

    this.props.dispatch(
      userActions.taskDelete(
        id,
        title,
        assignee_id,
        assigner_id,
        start_time,
        end_time,
        currentPage
      )
    );
  }

  handleSelectAssignee(id, name) {
    console.log(name);
    this.setState(
      {
        assignee_id: id,
        assignee_name: name
      },
      () =>
        this.setState({
          currentPage: 1
        })
    );
  }
  handleSelectAssigner(id, name) {
    console.log(name);
    this.setState(
      {
        assigner_id: id,
        assigner_name: name
      },
      () =>
        this.setState({
          currentPage: 1
        })
    );
  }
  render() {
    console.log(this.state);
    console.log(this.props);
    const {
      title,
      assignee_id,
      assigner_id,
      assignee_name,
      assigner_name,
      start_time,
      end_time
    } = this.state;
    return (
      <div>
        <div>
          <Form onSubmit={this.handleSubmit}>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridText">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={title}
                  onChange={this.handleInputChange}
                  placeholder="Enter title or description"
                />
              </Form.Group>
              {this.props.user.user.roles === "admin" && (
                <Form.Group as={Col}>
                  <Form.Label>Assignee</Form.Label>
                  {this.props.listed && (
                    <Dropdown>
                      <Dropdown.Toggle>{assignee_name}</Dropdown.Toggle>
                      <Dropdown.Menu>
                        {this.props.usernames.map(index => (
                          <Dropdown.Item
                            key={index.id}
                            onSelect={() =>
                              this.handleSelectAssignee(index.id, index.name)
                            }
                            active={index.id === assignee_id}
                          >
                            {index.name}
                          </Dropdown.Item>
                        ))}
                        <Dropdown.Item
                          onSelect={() =>
                            this.handleSelectAssignee("", "..Select..")
                          }
                        >
                          ..Clear..
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  )}
                </Form.Group>
              )}
              <Form.Group as={Col}>
                <Form.Label>Assigner</Form.Label>
                {this.props.listed && (
                  <Dropdown>
                    <Dropdown.Toggle>{assigner_name}</Dropdown.Toggle>
                    <Dropdown.Menu>
                      {this.props.usernames.map(
                        index =>
                          index.roles === "admin" && (
                            <Dropdown.Item
                              key={index.id}
                              onSelect={() =>
                                this.handleSelectAssigner(index.id, index.name)
                              }
                              active={index.id === assigner_id}
                            >
                              {index.name}
                            </Dropdown.Item>
                          )
                      )}
                      <Dropdown.Item
                        onSelect={() =>
                          this.handleSelectAssigner("", "..Select..")
                        }
                      >
                        ..Clear..
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                )}
              </Form.Group>
              <Form.Group as={Col} controlId="formGridText">
                <Form.Label>Start</Form.Label>
                <Form.Control
                  type="date"
                  name="start_time"
                  value={start_time}
                  onChange={this.handleInputChange}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridText">
                <Form.Label>End</Form.Label>
                <Form.Control
                  type="date"
                  name="end_time"
                  value={end_time}
                  onChange={this.handleInputChange}
                />
              </Form.Group>
            </Form.Row>
            <Button variant="outline-primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
        <div>
          {this.props.tasklisted && (
            <Table striped bordered hover size="sm">
              <thead>
                {
                  <tr>
                    <th>TITLE</th>
                    <th>DESCRIPTION</th>
                    <th>STATUS</th>
                    <th>DUE</th>
                    {this.props.user.user.roles ===
                      "admin" && <th>ASSIGNEE</th>}
                    {this.props.user.user.roles ===
                      "admin" && <th>ASSIGNER</th>}
                  </tr>
                }
              </thead>
              <tbody>
                {this.props.tasks.data.map(index => (
                  <tr key={index.id}>
                    <td>{index.title}</td>
                    <td>{index.description}</td>
                    <td>{index.status}</td>
                    <td>{index.duetime}</td>
                    {this.props.user.user.roles === "admin" &&
                      this.props.listed &&
                      this.props.usernames.map(
                        i =>
                          i.id === index.assignee_id && (
                            <td key={i.id}> {i.name}</td>
                          )
                      )}
                    {this.props.user.user.roles === "admin" &&
                      this.props.listed &&
                      this.props.usernames.map(
                        i =>
                          i.id === index.assigner_id && (
                            <td key={i.id}> {i.name}</td>
                          )
                      )}
                    {index.assigner_id ==
                      this.props.user.user.id && (
                      <td>
                        <Button
                          variant="danger"
                          onClick={() => this.handleDelete(index.id)}
                        >
                          Delete
                        </Button>
                        <Example
                          title={index.title}
                          description={index.description}
                          duetime={index.duetime}
                          id={index.id}
                          dispatch={this.props.dispatch}
                          title_form={this.state.title}
                          assignee_id={this.state.assignee_id}
                          assigner_id={this.state.assigner_id}
                          start_time={this.state.start_time}
                          end_time={this.state.end_time}
                          currentPage={this.state.currentPage}
                        />
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
          {this.props.tasklisted && (
            <Button onClick={() => this.prevPage()}>Prev</Button>
          )}
          {this.props.tasklisted && (
            <Button onClick={() => this.nextPage(this.props.tasks.last_page)}>
              Next
            </Button>
          )}
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { tasklisting, tasks, tasklisted } = state.listtasks;
  const { listed, usernames } = state.list;
  const { user } = state.authentication;
  return {
    tasklisting,
    tasks,
    tasklisted,
    listed,
    usernames,
    user
  };
}
const connectedTaskListPage = connect(mapStateToProps)(listTasks);
export { connectedTaskListPage as listTasks };
