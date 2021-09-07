import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "@progress/kendo-theme-default/dist/all.css";
import "./dashboard.css";
import Sidebar from "../sidebar/sidebar";
import Proyectos from "../proyects/proyects";
import TabsProyect from "../tabsProyect/tabsProyect";
import Organization from "../organization/organization";
import ProyectsAdmin from "../proyectsadmin/proyectsadmin";
import { withRouter } from "react-router-dom";

class Dashboard extends Component {
  componentDidMount() {
    console.log(this.props.match.url);
  }
  sideBarParent = () => {
    this.proyectsShowAlert();
  };
  proyectsShowAlert = () => {};

  render() {
    return (
      <React.Fragment>
        <div class="aside">
          <div class="sidebar-div">
            <Sidebar showProyectsAlert={this.sideBarParent}></Sidebar>
          </div>
          <div class="view">
            <Switch>
              <Route
                path={this.props.match.url + "/proyects"}
                render={(props) => (
                  <Proyectos
                    setClick={(click) => (this.proyectsShowAlert = click)}
                  ></Proyectos>
                )}
              />
              <Route
                path={this.props.match.url + "/redactar"}
                render={(props) => <TabsProyect></TabsProyect>}
              />

              <Route
                exact
                path={this.props.match.url + "/organization"}
                render={(props) => <Organization></Organization>}
              />

              <Route
                exact
                path={this.props.match.url + "/organization/proyect/info"}
                render={(props) => <ProyectsAdmin></ProyectsAdmin>}
              />
            </Switch>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(Dashboard);
