import React, { Component } from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink } from "react-router-dom";
import "./sidebar.css";
import logo from "../../img/logo.png";
import { withRouter } from "react-router-dom";

class Sidebar extends Component {
  constructor(props) {
    super(props);
  }

  showAlert = () => {
    if (
      window.location.href !=
      window.location.origin + "/dashboard/proyects"
    ) {
      this.props.history.push({
        pathname: "/dashboard/proyects",
      });
    } else {
      this.props.showProyectsAlert();
    }
  };

  logout = () => {
    sessionStorage.clear();
    sessionStorage.setItem("api", "http://localhost:5000/");
    this.props.history.push({
      pathname: "/",
    });
  };

  goHome = () => {
    this.props.history.push({
      pathname: "/",
    });
  };

  render() {
    return (
      <React.Fragment>
        <div
          style={{
            display: "flex",
            height: "100%",
            overflow: "scroll initial",
          }}
        >
          <CDBSidebar textColor="#fff" backgroundColor="#545871">
            <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
              <a
                href="/"
                className="text-decoration-none"
                style={{ color: "inherit" }}
              >
                ReqBot
              </a>
            </CDBSidebarHeader>

            <CDBSidebarContent className="sidebar-content">
              <CDBSidebarMenu>
                <CDBSidebarMenuItem className="center">
                  <div>
                    <img
                      class="imgTable"
                      src={logo}
                      alt=" "
                      onClick={this.goHome}
                    />
                  </div>
                </CDBSidebarMenuItem>

                <NavLink exact to="/dashboard/proyects">
                  <CDBSidebarMenuItem className="titleSide">
                    Proyectos
                  </CDBSidebarMenuItem>
                </NavLink>

                {sessionStorage.getItem("rol") == "Administrador" ? (
                  <NavLink exact to="/dashboard/organization">
                    <CDBSidebarMenuItem className="titleSide">
                      Organización
                    </CDBSidebarMenuItem>
                  </NavLink>
                ) : (
                  <div></div>
                )}

                <NavLink exact to="/dashboard/logs">
                  <CDBSidebarMenuItem className="titleSide">
                    Logs
                  </CDBSidebarMenuItem>
                </NavLink>
                <NavLink exact to="/dashboard/tickets">
                  <CDBSidebarMenuItem className="titleSide">
                    Tickets
                  </CDBSidebarMenuItem>
                </NavLink>

                {sessionStorage.getItem("rol") == "Cliente" ? (
                  <CDBSidebarMenuItem
                    active="true"
                    className="buttonSideBar"
                    onClick={this.showAlert}
                  >
                    Redactar Requisito
                  </CDBSidebarMenuItem>
                ) : (
                  <div></div>
                )}
              </CDBSidebarMenu>
            </CDBSidebarContent>

            <CDBSidebarFooter style={{ textAlign: "center" }}>
              <div
                style={{
                  padding: "20px 5px",
                }}
                onClick={this.logout}
                class="logout"
              >
                Cerrar Sesión
              </div>
            </CDBSidebarFooter>
          </CDBSidebar>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(Sidebar);
