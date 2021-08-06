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

class Sidebar extends Component {
  render() {
    return (
      <React.Fragment>
        <div
          style={{
            display: "flex",
            height: "100vh",
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

                <NavLink exact to="/redactar">
                  <CDBSidebarMenuItem active="true" className="buttonSideBar">
                    Redactar Requisito
                  </CDBSidebarMenuItem>
                </NavLink>
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

export default Sidebar;
