import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Tab, Tabs } from "react-bootstrap";
import "./tabsProyect.css";
import Chatbot from "../chatbot/chatbot";
import UserStories from "../userStories/userStories";
import InfoProyect from "../infoProyect/infoProyect";

class TabsProyect extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }
  componentDidMount() {}

  render() {
    return (
      <React.Fragment>
        <div class="titleDiv">
          <h1>{this.props.location.megastate.proyect.nombre}</h1>
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
                <UserStories
                  proyect={this.props.location.megastate.proyect}
                ></UserStories>
              </div>
            </Tab>
            <Tab eventKey="info" title="Info">
              <InfoProyect
                proyect={this.props.location.megastate.proyect}
              ></InfoProyect>
            </Tab>
          </Tabs>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(TabsProyect);
