import React, { Component } from "react";
import "./register.css";
import logo from "../../img/logo.png";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router-dom";

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
        <Button id="login-button" onClick={this.goToRegister}>
          Registrarme
        </Button>
      </React.Fragment>
    );
  }
}

export default withRouter(Register);
