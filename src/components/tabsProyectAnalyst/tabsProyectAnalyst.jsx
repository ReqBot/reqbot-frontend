import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Tab, Tabs } from "react-bootstrap";
import "./tabsProyectAnalyst.css";
import UserStoriesAnalyst from "../userStoriesAnalyst/userStoriesAnalyst";
import InfoProyect from "../infoProyect/infoProyect";
import Alert from "react-bootstrap/Alert";

class TabsProyectAnalyst extends Component {
  state = {
    isHidden: false,
  };
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

  handleAlert = () => {
    this.setState({
      isHidden: !this.state.isHidden,
    });
  };

  render() {
    return (
      <React.Fragment>
        <Alert variant={"success"} show={this.state.isHidden}>
          {" "}
          Se aprobó la historia de usuario de forma exitosa.{" "}
        </Alert>
        <div class="titleDiv">
          <h1>{this.proyect.nombre}</h1>
        </div>
        <div class="tab-div-parent-analyst">
          <Tabs defaultActiveKey="pendientes" id="uncontrolled-tab-example">
            <Tab eventKey="pendientes" title="Pendientes">
              <div class="tab-div-child">
                <UserStoriesAnalyst
                  handleAlert={this.handleAlert}
                  proyect={this.proyect}
                ></UserStoriesAnalyst>
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

export default withRouter(TabsProyectAnalyst);
