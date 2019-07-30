import React from "react";
import { connect } from "react-redux";

import "./home.css";
import { Link } from "react-router-dom";

class Home extends React.Component {
  render() {
    // // const { user } = this.props;

    // // const user_token = JSON.parse(localStorage.getItem('user')).token;
    // if(localStorage.getItem('user') == null){
    return (
      <div>
        <a>Need to login first,click </a>
        <Link to="/login">here</Link>
      </div>
    );
    // }
    // else {
    // return (
    //     <Router>
    //     <div>
    //       <nav>
    //         <ul>
    //           <li>
    //             <Link to="/users/">userHome</Link>
    //           </li>
    //         </ul>
    //       </nav>
    //       <Switch>
    //        <Route exact path="/users/" component={userHome} />
    //        {/* <Route path="/users/create/" component={CreateUser} />
    //        <Route path="/users/:id/"  component={getUser} />  */}
    //       {/* { <Route path="/users/:id" component={deleteUser} /> } */}
    //       </Switch>
    //     </div>
    //   </Router>
    // )
    // }
  }
}

function mapStateToProps(state) {
  const { users, authentication } = state;
  const { user } = authentication;
  return {
    user,
    users
  };
}

const connectedHomePage = connect(mapStateToProps)(Home);
export { connectedHomePage as Home };
