import React from "react";
import "./getUser.css";
import { connect } from "react-redux";
import ReactJson from "react-json-view";

import { userActions } from "../actions/user.actions";

class getUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      submitted: false,
      deleted: false
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
    alert("getUser details" + this.state.id);
    event.preventDefault();
    this.setState({ submitted: true });
    const id = this.state.id;
    const { dispatch } = this.props;
    if (id) {
      // console.log("vfbenm,");
      dispatch(userActions.getUser(id));
    }
  }
  render() {
    const { submitted } = this.state;
    // console.log(this.props);
    if (submitted) {
      const { user } = this.props;
      console.log(user);
      return (
        <div>
          <ReactJson src={user} />
        </div>
      );
    } else {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            ID:
            <input
              type="number"
              name="id"
              value={this.state.id}
              onChange={this.handleInputChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }
}

function mapStateToProps(state) {
  const { geting, user } = state.get;
  return {
    geting,
    user
  };
}

const connectedCreatePage = connect(mapStateToProps)(getUser);
export { connectedCreatePage as getUser };
