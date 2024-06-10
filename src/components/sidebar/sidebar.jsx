import React, { Component } from "react";
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
        <div
          style={{
            display: "flex",
            height: "100%",
            overflow: "scroll initial",
          }}
        ></div>
      </React.Fragment>
    );
  }
}

export default withRouter(Sidebar);
