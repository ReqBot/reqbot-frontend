import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Tab, Tabs } from "react-bootstrap";
import "./tabsOrganization.css";
import Chatbot from "../chatbot/chatbot";
import OrganizationManagement from "./organizationManagement/organizationManagement";
import OrganizationProfile from "./organizationProfile/organizationProfile";

class TabsOrganization extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}

  render() {
    return (
      <React.Fragment>
        <div class="organization-titleDiv">
          <h1>{this.props.org.nombre}</h1>
        </div>
        <div class="tab-div-parent">
          <Tabs defaultActiveKey="general" id="uncontrolled-tab-example">
            <Tab eventKey="general" title="General">
              <div class="tab-div-child">
                <OrganizationManagement></OrganizationManagement>
              </div>
            </Tab>
            <Tab eventKey="Perfil" title="Perfil">
              <div class="tab-div-child">
                <OrganizationProfile></OrganizationProfile>
              </div>
            </Tab>
          </Tabs>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(TabsOrganization);
