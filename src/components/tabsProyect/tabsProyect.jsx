import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Tab, Tabs } from "react-bootstrap";
import "./tabsProyect.css";
import Chatbot from "../chatbot/chatbot";
import UserStories from "../userStories/userStories";
import InfoProyect from "../infoProyect/infoProyect";

class TabsProyect extends Component {
  proyect = "";

  constructor(props) {
    super(props);

    if (this.props.location.megastate != null) {
      if (this.props.location.megastate.proyect) {
        this.proyect = this.props.location.megastate.proyect;
      }
    } else {
      this.proyect = JSON.parse(sessionStorage.getItem("proyectSelected"));
    }
  }

  componentDidMount() {}

  render() {
    return (
      <React.Fragment>
        <div class="titleDiv">
          <h1>{this.proyect.nombre}</h1>
        </div>
        <div class="tab-div-parent">
          <Tabs defaultActiveKey="chatbot" id="uncontrolled-tab-example">
            <Tab eventKey="chatbot" title="Chatbot">
              <div class="tab-div-child">
                <Chatbot proyect={this.proyect}></Chatbot>
              </div>
            </Tab>
            <Tab eventKey="historias" title="Historias">
              <div class="tab-div-child">
                <UserStories proyect={this.proyect}></UserStories>
              </div>
            </Tab>
            <Tab eventKey="info" title="Info">
              <InfoProyect proyect={this.proyect}></InfoProyect>
            </Tab>
          </Tabs>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(TabsProyect);
