import React, { Component } from "react";
import "./forgotPassword.css";
import logo from "../../img/logo.png";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router-dom";
import { FiMail } from "react-icons/fi";

class ForgotPassword extends Component {
  state = {
    loggedIn: false,
  };

  componentDidMount() {}

  goLogin = () => {
    console.log("Se mando correo");
  };

  goBack = () => {
    this.props.history.push({
      pathname: "/",
    });
  };

  render() {
    return (
      <React.Fragment>
        <div class="login-container">
          <img class="login-image" src={logo}></img>
          <h1>Cambia tu Contraseña</h1>
          <div class="input-parts">
            {" "}
            <p class="info-password-change">
              *Le enviaremos instrucciones a tu correo para cambiar tu
              contraseña
            </p>
            <InputGroup className="mb-3 login-input">
              <FormControl
                placeholder="Correo"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
              <InputGroup.Text id="basic-addon2">
                <FiMail class="mail-password"></FiMail>
              </InputGroup.Text>
            </InputGroup>
            <div class="login-buttons-div">
              <Button id="login-button" onClick={this.goLogin}>
                Cambiar Contraseña
              </Button>
              <Button id="login-button" onClick={this.goBack}>
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(ForgotPassword);
