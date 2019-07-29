import React from "react";
import axios from "axios";
import { Button } from 'reactstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Switch} from 'react-router-dom'
import "./roleChange.css";
import { connect } from 'react-redux';
import ReactJson from 'react-json-view'

import { userActions } from '../actions/user.actions';

class roleChange extends React.Component {
    constructor(props){
      super(props);
      this.state = {
          id : 0,
          submitted: false
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
      alert('getUser details' +this.state.id );
      event.preventDefault();
      this.setState({ submitted: true });
      const id = this.state.id;
        const { dispatch } = this.props;
        if(id){
          // console.log("vfbenm,");
            dispatch(userActions.roleChange(id));
        }
      
    }
    render() {
  
      const {submitted} = this.state;
      // console.log(this.props);
      if(submitted)
      {
        const {user} = this.props;
        console.log(user);
        return(
          <div>
          <ReactJson src = {user}/>
          {/* <Button component = {Link} to = "/users/:id/role_change" color="primary">RoleChange</Button>{' '}
          <Button component = {Link} to = "/users/:id/delete" color="danger">Delete</Button>{' '}
          <Switch>
                 <Route path="/users/:id/role_change"  component={changeRole} /> 
                 <Route path="/users/:id/delete" component={deleteUser} /> 
          </Switch> */}
        </div>
        )
      }
      else {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
              ID:
            <input type="number" name = "id" value={this.state.id} onChange={this.handleInputChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      );
    }
    }
  }
  
  function mapStateToProps(state) {
  const { changingRole,user } = state.roleChange;
  return {
      changingRole,
      user
  };
  }
  
  const connectedRolePage = connect(mapStateToProps)(roleChange);
  export { connectedRolePage as roleChange }; 