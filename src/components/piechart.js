import React from "react";
import "./piechart.css";
import { connect } from 'react-redux';

import { userActions } from '../actions/user.actions';
var Highcharts = require('highcharts');

// Load module after Highcharts is loaded
require('highcharts/modules/exporting')(Highcharts);

class PieChart extends React.Component{
    constructor(props){
        super(props);
        this.state  = {
            pie : false
        };
       // this.highChartsRender = this.highChartsRender.bind(this);
    }
    componentDidMount(){
        this.props.dispatch(userActions.pieTasks())
    }
    componentDidUpdate(prevProps){
        if(prevProps.data !== this.props.data){ this.highChartsRender()}
    }
    highChartsRender() {
        Highcharts.setOptions({
            colors: [ '#50B432','#64E572', '#DC143C', '#DDDF00', '#A9A9A9','#24CBE5', '#FF9655', '#FFF263', '#6AF9C4']
           });
        console.log(this.state.pie)
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
                data : this.props.data

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
    const{data,gotdata} = state.pie;
    return {
        data,
        gotdata
    };
  }
  const connectedPieChartPage = connect(mapStateToProps)(PieChart);
  export { connectedPieChartPage as PieChart }; 