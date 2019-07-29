import React from "react";
import "./profilepiechart.css";
import { connect } from 'react-redux';

import { userActions } from '../actions/user.actions';
var Highcharts = require('highcharts');

// Load module after Highcharts is loaded
require('highcharts/modules/exporting')(Highcharts);

class ProfilePieChart extends React.Component{
    constructor(props){
        super(props);
        this.state  = {
            profilepie : false
        };
        this.highChartsRender = this.highChartsRender.bind(this);
    }
    componentDidMount(){
        this.props.dispatch(userActions.pieProfile(this.props.profile_id))
    }
    componentDidUpdate(prevProps){
        if(prevProps.profilepiedata !== this.props.profilepiedata){ this.highChartsRender()}
    }
    highChartsRender() {
        console.log(this.props.data)
        
        Highcharts.setOptions({
            colors: [ '#50B432','#64E572', '#DC143C', '#DDDF00', '#A9A9A9','#24CBE5', '#FF9655', '#FFF263', '#6AF9C4']
           });
        Highcharts.chart('container',{
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',
            },
            title: {
                text: 'My Performance'
            },
            credits: {
                enabled : false
            },
            plotOptions: {
              pie: {
                allowPointSelect: false,
                cursor: 'pointer',
                  dataLabels: {
                    enabled: false,
                    format: '{point.name}: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                      }
                  },
                  showInLegend: true
              }
            },
            series: [{
                name : 'Percentage',
                colorByPoint: true,
                data : this.props.profilepiedata

            }]
          });
    }
    
    render(){

        return(
            <div id = 'container'>
            </div> 
        )
    }
}

function mapStateToProps(state) {
    const{profilepiedata,gotprofilepiedata} = state.profilepie;
    const{profile_id,fetched_profile} = state.profile;
    return {
        profilepiedata,
        gotprofilepiedata,
        profile_id,
        fetched_profile
    };
  }
  const connectedProfilePieChartPage = connect(mapStateToProps)(ProfilePieChart);
  export { connectedProfilePieChartPage as ProfilePieChart }; 