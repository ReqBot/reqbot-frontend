import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "@progress/kendo-theme-default/dist/all.css";
import "./dashboard.css";
import Sidebar from "../sidebar/sidebar";
import Proyectos from "../proyects/proyects";
import TabsProyect from "../tabsProyect/tabsProyect";

import { withRouter } from "react-router-dom";

class Dashboard extends Component {
  sideBarParent = () => {
    this.proyectsShowAlert();
  };

  proyectsShowAlert = () => {};

  render() {
    return (
      <React.Fragment>
        <Router>
          <div class="aside">
            <div class="sidebar-div">
              <Sidebar showProyectsAlert={this.sideBarParent}></Sidebar>
            </div>
            <div class="view">
              <Switch>
                <Route
                  exact
                  path="/proyects"
                  render={(props) => (
                    <Proyectos
                      setClick={(click) => (this.proyectsShowAlert = click)}
                    ></Proyectos>
                  )}
                />
                <Route
                  exact
                  path="/redactar"
                  render={(props) => <TabsProyect></TabsProyect>}
                />
              </Switch>
            </div>
          </div>
        </Router>
      </React.Fragment>
    );
  }
}

export default withRouter(Dashboard);
