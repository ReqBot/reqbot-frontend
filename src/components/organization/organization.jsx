import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import TabsOrganization from "../tabsOrganization/tabsOrganization";
import axios from "axios";

class Organization extends Component {
  state = {
    proyectsShowed: [],
    isHidden: false,
    org: "",
  };

  constructor(props) {
    super(props);

    axios
      .get(
        sessionStorage.getItem("api") +
          "api/organizacion/" +
          sessionStorage.getItem("idOrganizacion")
      )
      .then((response) => {
        console.log("XXX");
        console.log(response);
        this.setState({
          org: response.data[0],
        });
      })
      .catch((error) => {
        console.log("Error en obtener Organizacion");
      });
  }

  render() {
    return (
      <React.Fragment>
        <TabsOrganization org={this.state.org}></TabsOrganization>
      </React.Fragment>
    );
  }
}

export default withRouter(Organization);
