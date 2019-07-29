import React from "react";
import "./profile.css";
import { connect } from 'react-redux';
import { ProfileTasks } from './profileTasks';
import { PieChart } from './piechart';
import { ProfilePieChart } from './profilepiechart';
import { userConstants } from '../constants/user.constants';
import { stat } from "fs";

class Profile extends React.Component{
    constructor(props){
        super(props);
        this.state  = {
        temp : false
        };
    }
    render(){
        // console.log(this.state.temp)
        if(this.props.fetched_profile){
        return(
            <div className = "container-fluid">
            <div className = "row">
                <div className="col-sm-6">
                    <div className = "row-sm-6">
                    {
                        this.props.users.data.map((index)=>(
                            index.id === this.props.profile_id && <p>
                                name : {index.name}<br/>
                                email : {index.email}<br/>
                                created_by : {index.created_by}<br/>
                                role : {index.roles}
                                </p>
                        )
                        )
                    }
                    </div>
                    <div className = "row-sm-6"><ProfileTasks/></div>
                </div>
                <div className="col-sm-6"><ProfilePieChart/></div>
            </div>
        </div>
        )
        }
        else {
            return (<h2>LOADING</h2>)
        }
    }
}


function mapStateToProps(state) {
    const {fetched_profile,profile_id} = state.profile;
    const { users} = state.filter;
    return {
        fetched_profile,
        profile_id,
        users
    };
  }
  const connectedProfilePage = connect(mapStateToProps)(Profile);
  export { connectedProfilePage as Profile }; 