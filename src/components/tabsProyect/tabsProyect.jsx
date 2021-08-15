import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Tab, Tabs } from "react-bootstrap";
import "./tabsProyect.css";
import Chatbot from "../chatbot/chatbot";
import UserStories from "../userStories/userStories";

class TabsProyect extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}

  render() {
    return (
      <React.Fragment>
        <div class="titleDiv"></div>
        <div class="tab-div-parent">
          <Tabs defaultActiveKey="chatbot" id="uncontrolled-tab-example">
            <Tab eventKey="chatbot" title="Chatbot">
              <div class="tab-div-child">
                <Chatbot></Chatbot>
              </div>
            </Tab>
            <Tab eventKey="historias" title="Historias">
              <div class="tab-div-child">
                <UserStories></UserStories>
              </div>
            </Tab>
            <Tab eventKey="info" title="Info">
              <div class="tab-div-child">
                <h2>Hello</h2>
              </div>
            </Tab>
          </Tabs>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(TabsProyect);
