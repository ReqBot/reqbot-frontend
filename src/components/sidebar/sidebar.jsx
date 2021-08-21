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
    this.props.showProyectsAlert();
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
                    <img class="imgTable" src={logo} alt=" " />
                  </div>
                </CDBSidebarMenuItem>
                <NavLink exact to="/proyects">
                  <CDBSidebarMenuItem className="titleSide">
                    Proyectos
                  </CDBSidebarMenuItem>
                </NavLink>

                <NavLink exact to="/proyects">
                  <CDBSidebarMenuItem className="titleSide">
                    Organización
                  </CDBSidebarMenuItem>
                </NavLink>

                <CDBSidebarMenuItem
                  active="true"
                  className="buttonSideBar"
                  onClick={this.showAlert}
                >
                  Redactar Requisito
                </CDBSidebarMenuItem>
              </CDBSidebarMenu>
            </CDBSidebarContent>

            <CDBSidebarFooter style={{ textAlign: "center" }}>
              <div
                style={{
                  padding: "20px 5px",
                }}
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
