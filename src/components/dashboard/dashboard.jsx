import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "@progress/kendo-theme-default/dist/all.css";
import "./dashboard.css";
import Sidebar from "../sidebar/sidebar";
import Proyectos from "../proyects/proyects";
import TabsProyect from "../tabsProyect/tabsProyect";
import Organization from "../organization/organization";
import EditProyect from "../editProyect/editProyect";
import CreateProyect from "../createProyect/createProyect";
import CreateUser from "../createUser/createUser";
import EditUser from "../editUser/editUser";
import EditOrganizationInfo from "../editOrganizationInfo/editOrganizationInfo";
import TabsProyectAnalyst from "../tabsProyectAnalyst/tabsProyectAnalyst";
import { withRouter } from "react-router-dom";
import axios from "axios";
import Tickets from "../tickets/tickets";
import TicketsAdmin from "../ticketsAdmin/ticketsAdmin";
import CreateTicket from "../createTicket/createTicket";
import Logys from "../logys/logys";

class Dashboard extends Component {
  state = {
    org: undefined,
    idOrg: 1,
    flagSideBarActive: null,
    flagResponsive: false,
    sideBarDeployed: false,
  };

  windowSize = 100;

  componentDidMount() {
    this.getOrganization();
    this.checkWindowWidth();

    window.addEventListener("resize", this.checkWindowWidth);
  }

  checkWindowWidth = () => {
    this.windowSize = window.innerWidth;
    let flag = true;

    if (this.windowSize <= 600) {
      flag = true;
    } else {
      flag = false;
    }

    this.setState({
      flagResponsive: flag,
      sideBarDeployed: !flag,
    });
  };

  sideBarParent = () => {
    this.proyectsShowAlert();
  };

  proyectsShowAlert = () => {};

  clickSideBar = () => {
    this.setState(
      {
        sideBarDeployed: !this.state.sideBarDeployed,
      },
      () => {
        console.log(this.state.flagResponsive);
        console.log(this.state.sideBarDeployed);
      }
    );
  };

  getOrganization = () => {
    axios
      .get(
        sessionStorage.getItem("api") +
          "api/organizacion/" +
          sessionStorage.getItem("idOrganizacion")
      )
      .then((response) => {
        console.log("entro aca");

        this.setState({
          org: response.data[0],
        });
        console.log(this.state.org);
      })
      .catch((error) => {
        this.setState({
          org: this.mockOrg,
        });
        console.log("error");
        console.log(this.state.org);
      });
  };

  mockOrg = {
    idOrganizacion: 1,
    nombre: "Gotel Labs",
    siglas: "Gotel",
    descripcion: "Gotel Labs dedicados a la transformacion digital",
    imagen:
      "https://www.renaultgroup.com/wp-content/uploads/2021/03/nouveau_logo_renault_banner.jpg",
    colorPrimario: "#FFFFFF",
    colorSecundario: "#000000",
    idPlan: 2,
  };

  render() {
    return (
      <React.Fragment>
        <div class="aside">
          <Sidebar
            showProyectsAlert={this.sideBarParent}
            clickSideBar={this.clickSideBar}
          ></Sidebar>

          {!this.state.flagResponsive ||
          (this.state.flagResponsive && !this.state.sideBarDeployed) ? (
            <div class="view">
              <Switch>
                <Route
                  path={this.props.match.url + "/proyects"}
                  render={(props) => (
                    <Proyectos
                      setClick={(click) => (this.proyectsShowAlert = click)}
                      org={this.state.org}
                    ></Proyectos>
                  )}
                />
                <Route
                  path={this.props.match.url + "/redactar"}
                  render={(props) => (
                    <TabsProyect org={this.state.org}></TabsProyect>
                  )}
                />

                <Route
                  path={this.props.match.url + "/tickets"}
                  render={(props) => {
                    if (sessionStorage.getItem("rol") == "Administrador") {
                      return <TicketsAdmin org={this.state.org}></TicketsAdmin>;
                    } else {
                      return <Tickets org={this.state.org}></Tickets>;
                    }
                  }}
                />

                <Route
                  exact
                  path={this.props.match.url + "/organization"}
                  render={(props) => (
                    <Organization org={this.state.org}></Organization>
                  )}
                />

                <Route
                  exact
                  path={this.props.match.url + "/organization/proyect/info"}
                  render={(props) => (
                    <EditProyect org={this.state.org}></EditProyect>
                  )}
                />

                <Route
                  exact
                  path={this.props.match.url + "/organization/create/proyect"}
                  render={(props) => (
                    <CreateProyect org={this.state.org}></CreateProyect>
                  )}
                />

                <Route
                  exact
                  path={this.props.match.url + "/organization/create/user"}
                  render={(props) => (
                    <CreateUser org={this.state.org}></CreateUser>
                  )}
                />

                <Route
                  exact
                  path={this.props.match.url + "/create/ticket"}
                  render={(props) => (
                    <CreateTicket org={this.state.org}></CreateTicket>
                  )}
                />

                <Route
                  exact
                  path={this.props.match.url + "/organization/edit/user"}
                  render={(props) => <EditUser org={this.state.org}></EditUser>}
                />

                <Route
                  exact
                  path={this.props.match.url + "/organization/edit/info"}
                  render={(props) => (
                    <EditOrganizationInfo
                      org={this.state.org}
                    ></EditOrganizationInfo>
                  )}
                />

                <Route
                  exact
                  path={this.props.match.url + "/analyst"}
                  render={(props) => (
                    <TabsProyectAnalyst
                      org={this.state.org}
                    ></TabsProyectAnalyst>
                  )}
                />

                <Route
                  exact
                  path={this.props.match.url + "/logs"}
                  render={(props) => <Logys org={this.state.org}></Logys>}
                />
              </Switch>
            </div>
          ) : null}
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(Dashboard);
