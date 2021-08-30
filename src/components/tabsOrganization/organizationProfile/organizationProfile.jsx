import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Tab, Tabs } from "react-bootstrap";
import "./organizationProfile.css";

class OrganizationProfile extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }
  componentDidMount() {}

  render() {
    return (
      <React.Fragment>
        <h1>PROFILE</h1>
      </React.Fragment>
    );
  }
}

export default withRouter(OrganizationProfile);
