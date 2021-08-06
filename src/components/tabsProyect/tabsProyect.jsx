import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Tab, Tabs } from "react-bootstrap";
import "./tabsProyect.css";
import Chatbot from "../chatbot/chatbot";

class TabsProyect extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}

  render() {
    return (
      <React.Fragment>
        <div class="titleDiv">
          <h1>Titulo de Proyecto</h1>
        </div>
        <div class="tab-div-parent">
          <Tabs defaultActiveKey="chatbot" id="uncontrolled-tab-example">
            <Tab eventKey="chatbot" title="Chatbot">
              <div class="tab-div-child">
                <Chatbot></Chatbot>
              </div>
            </Tab>
            <Tab eventKey="historias" title="Historias">
              <div class="tab-div-child">
                <h2>Hello</h2>
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
