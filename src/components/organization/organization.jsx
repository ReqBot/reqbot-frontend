import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import TabsOrganization from "../tabsOrganization/tabsOrganization";

class Organization extends Component {
  state = {
    proyectsShowed: [],
    isHidden: false,
  };

  render() {
    return (
      <React.Fragment>
        <TabsOrganization></TabsOrganization>
      </React.Fragment>
    );
  }
}

export default withRouter(Organization);
