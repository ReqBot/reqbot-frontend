import React, { Component } from "react";

import "./sidebar.css";
import logo from "../../img/logo.png";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

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
    sessionStorage.setItem("api", "https://reqbot-backend.herokuapp.com/");
    this.props.history.push({
      pathname: "/",
    });
  };

  goHome = () => {
    this.props.history.push({
      pathname: "/",
    });
  };

  clickSideBar = () => {
    this.props.clickSideBar();
  };

  render() {
    return (
      <React.Fragment>
        <div className="sidebar">
          <div class="side-bar-header">
            <img class="logo-image" src={logo}></img>
            <div class="title">ReqBot</div>{" "}
          </div>
          <div class="links-div">
            {sessionStorage.getItem("rol") == "Cliente" ? (
              <Link class="link-element" onClick={this.showAlert}>
                Redactar Requisito
              </Link>
            ) : null}
            <Link class="link-element" to="/dashboard/proyects">
              Proyectos
            </Link>
            {sessionStorage.getItem("rol") == "Administrador" ? (
              <Link class="link-element" to="/dashboard/organization">
                Organización
              </Link>
            ) : null}
            <Link class="link-element" to="/dashboard/logs">
              Logs
            </Link>
            <Link class="link-element" to="/dashboard/tickets">
              Tickets
            </Link>
          </div>
          <div class="side-bar-footer">
            <div class="footer-link" onClick={this.logout}>
              Cerrar Sesión
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(Sidebar);
