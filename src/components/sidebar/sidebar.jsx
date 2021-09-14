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
import { createPortal } from "react-dom/cjs/react-dom.development";
import { withRouter } from "react-router-dom";

class Sidebar extends Component {
  constructor(props) {
    super(props);
  }

  showAlert = () => {
    if (window.location.href != "http://localhost:3000/dashboard/proyects") {
      this.props.history.push({
        pathname: "/dashboard/proyects",
      });
    } else {
      this.props.showProyectsAlert();
    }
  };

  logout = () => {
    localStorage.clear();
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

                {localStorage.getItem("rol") == "analyst" ||
                localStorage.getItem("rol") == "client" ? (
                  <NavLink exact to="/dashboard/proyects">
                    <CDBSidebarMenuItem className="titleSide">
                      Proyectos
                    </CDBSidebarMenuItem>
                  </NavLink>
                ) : (
                  <div></div>
                )}

                <NavLink exact to="/dashboard/proyects">
                  <CDBSidebarMenuItem className="titleSide">
                    Historias de Usuario
                  </CDBSidebarMenuItem>
                </NavLink>

                <NavLink exact to="/dashboard/proyects">
                  <CDBSidebarMenuItem className="titleSide">
                    Tickets
                  </CDBSidebarMenuItem>
                </NavLink>

                {localStorage.getItem("rol") == "client" ? (
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

                {localStorage.getItem("rol") == "analyst" ||
                localStorage.getItem("rol") == "owner" ? (
                  <NavLink exact to="/dashboard/proyects">
                    <CDBSidebarMenuItem className="titleSide">
                      Logs
                    </CDBSidebarMenuItem>
                  </NavLink>
                ) : (
                  <div></div>
                )}

                {localStorage.getItem("rol") == "owner" ? (
                  <NavLink exact to="/dashboard/organization">
                    <CDBSidebarMenuItem className="titleSide">
                      Organización
                    </CDBSidebarMenuItem>
                  </NavLink>
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
