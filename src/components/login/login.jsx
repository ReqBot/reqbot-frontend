import React, { Component } from "react";
import "./login.css";
import logo from "../../img/logo.png";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router-dom";

class Login extends Component {
  state = {
    loggedIn: false,
  };

  componentDidMount() {}

  goToRegister = () => {
    console.log(3);
    this.props.history.push({
      pathname: "/register",
    });
  };

  goLogin = () => {
    this.props.changeParentLogin(true);
    this.props.history.push({
      pathname: "/dashboard/proyects",
    });
  };

  goForgotPassword = () => {
    this.props.history.push({
      pathname: "/forgot-password",
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
            <div class="login-buttons-div">
              <Button id="login-button" onClick={this.goLogin}>
                Iniciar Sesión
              </Button>
              <Button id="login-button" onClick={this.goToRegister}>
                Registrarme
              </Button>
            </div>
            <p class="login-link" onClick={this.goForgotPassword}>
              {" "}
              ¿Olvidaste tu contraseña?
            </p>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(Login);
