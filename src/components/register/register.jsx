import React, { Component } from "react";
import "./register.css";
import logo from "../../img/logo.png";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router-dom";
import { Tab, Tabs } from "react-bootstrap";

class Register extends Component {
  state = {
    loggedIn: false,
  };

  componentDidMount() {}

  goToRegister = () => {
    this.props.history.push({
      pathname: "/registrar",
    });
  };

  render() {
    return (
      <React.Fragment>
        <div class="login-container">
          <img class="login-image" src={logo}></img>
          <h1>ReqBot</h1>
          <div class="input-parts">
            {" "}
            <Tabs defaultActiveKey="chatbot">
              <Tab
                eventKey="chatbot"
                title="Pago"
                tabClassName="ind-tab-register"
              >
                <h4>Hello 1</h4>
              </Tab>
              <Tab
                eventKey="historias"
                title="Información"
                tabClassName="ind-tab-register"
              >
                <h4>Hello 2</h4>
              </Tab>
            </Tabs>
            <InputGroup className="mb-3 login-input">
              <FormControl
                placeholder="Correo"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </InputGroup>
            <InputGroup className="mb-3 login-input">
              <FormControl
                placeholder="Contraseña"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </InputGroup>
            <InputGroup className="mb-3 login-input">
              <FormControl
                placeholder="Contraseña"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </InputGroup>
            <InputGroup className="mb-3 login-input">
              <FormControl
                placeholder="Contraseña"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </InputGroup>
            <InputGroup className="mb-3 login-input">
              <FormControl
                placeholder="Contraseña"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </InputGroup>
            <div class="login-buttons-div">
              <Button id="login-button" onClick={this.goToRegister}>
                Registrarme
              </Button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(Register);
