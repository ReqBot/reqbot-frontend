import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Tab, Tabs } from "react-bootstrap";
import "./tabsProyect.css";
import Chatbot from "../chatbot/chatbot";
import UserStories from "../userStories/userStories";
import InfoProyect from "../infoProyect/infoProyect";
import Alert from "react-bootstrap/Alert";

class TabsProyect extends Component {
  proyect = "";

  state = {
    isHidden: false,

    alertMessage: "",
  };

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

  handleAlert = () => {
    this.setState({
      isHidden: !this.state.isHidden,
    });
  };

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

  componentDidMount() {}

  render() {
    return (
      <React.Fragment>
        <Alert variant={"success"} show={this.state.isHidden}>
          {this.state.alertMessage}
        </Alert>
        <div class="titleDiv">
          <div class="page-main-title">{this.proyect.nombre}</div>
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
                <UserStories
                  proyect={this.proyect}
                  makeAlert={this.applyTime}
                ></UserStories>
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
