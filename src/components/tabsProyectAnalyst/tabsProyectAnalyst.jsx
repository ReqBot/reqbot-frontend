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
    alertMessage: "",
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
        <div class="titleDiv">
          <h1>{this.proyect.nombre}</h1>
        </div>
        <div class="tab-div-parent-analyst">
          <Tabs defaultActiveKey="pendientes" id="uncontrolled-tab-example">
            <Tab eventKey="pendientes" title="Pendientes">
              <div class="tab-div-child">
                <UserStoriesAnalyst
                  makeAlert={this.applyTime}
                  proyect={this.proyect}
                ></UserStoriesAnalyst>
              </div>
            </Tab>
            <Tab eventKey="info" title="Info">
              <InfoProyect
                proyect={this.proyect}
                makeAlert={this.applyTime}
              ></InfoProyect>
            </Tab>
          </Tabs>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(TabsProyectAnalyst);
