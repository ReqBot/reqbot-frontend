import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Tab, Tabs } from "react-bootstrap";
import "./tabsProyectAnalyst.css";
import UserStoriesAnalyst from "../userStoriesAnalyst/userStoriesAnalyst";
import InfoProyect from "../infoProyect/infoProyect";

class TabsProyectAnalyst extends Component {
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
        <div class="tab-div-parent-analyst">
          <Tabs defaultActiveKey="historias" id="uncontrolled-tab-example">
            <Tab eventKey="historias" title="Historias">
              <div class="tab-div-child">
                <UserStoriesAnalyst></UserStoriesAnalyst>
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

export default withRouter(TabsProyectAnalyst);
