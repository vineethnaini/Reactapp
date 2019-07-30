import React from "react";
import "./dashboard.css";
import { DashboardTasks } from "./dashboardtasks";
import { PieChart } from "./piechart";

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: []
    };
  }
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6">
            <DashboardTasks />
          </div>
          <div className="col-sm-6">
            <PieChart />
          </div>
        </div>
        <div className="row">
          {/* <div class="col-sm-12"><BarGraph/></div> */}
        </div>
      </div>
    );
  }
}
