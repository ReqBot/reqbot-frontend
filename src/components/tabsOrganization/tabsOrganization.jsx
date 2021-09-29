import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Tab, Tabs } from "react-bootstrap";
import "./tabsOrganization.css";
import Chatbot from "../chatbot/chatbot";
import OrganizationManagement from "./organizationManagement/organizationManagement";
import OrganizationProfile from "./organizationProfile/organizationProfile";
import Alert from "react-bootstrap/Alert";

class TabsOrganization extends Component {
  state = {
    isHidden: false,
    alertMessage: "",
  };

  constructor(props) {
    super(props);
  }
  componentDidMount() {}

  applyTime = (message) => {
    this.setState(
      {
        isHidden: true,
        alertMessage: message,
      },
      () => {
        this.useEffect();
      }
    );
  };

  useEffect() {
    const timeId = setTimeout(() => {
      this.handleAlert();
    }, 3000);

    return () => {
      clearTimeout(timeId);
    };
  }

  handleAlert = () => {
    this.setState({
      isHidden: false,
    });
  };

  render() {
    return (
      <React.Fragment>
        <Alert variant={"success"} show={this.state.isHidden}>
          {this.state.alertMessage}
        </Alert>
        <div class="organization-titleDiv">
          <h1>{this.props.org.nombre}</h1>
        </div>
        <div class="tab-div-parent">
          <Tabs defaultActiveKey="general" id="uncontrolled-tab-example">
            <Tab eventKey="general" title="General">
              <div class="tab-div-child">
                <OrganizationManagement
                  applyTime={this.applyTime}
                ></OrganizationManagement>
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
