import React, { Component } from "react";
import "./login.css";
import logo from "../../img/logo.png";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router-dom";
import Form from "react-bootstrap/Form";
import axios from "axios";

class Login extends Component {
  state = {
    email: "",
    password: "",

    incompleteFields: false,
    incorrectFields: false,
  };

  componentDidMount() {}

  constructor(props) {
    super(props);
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };

  goToRegister = () => {
    /*
    console.log(3);
    this.props.history.push({
      pathname: "/register",
    });
    */
    this.props.changeParentLogin(true, "Andre", "analyst");
    this.props.history.push({
      pathname: "/dashboard/proyects",
    });
  };

  goLogin = () => {
    this.props.changeParentLogin(true, "Luis", "client");
    this.props.history.push({
      pathname: "/dashboard/proyects",
    });
  };

  goForgotPassword = () => {
    /*
    this.props.history.push({
      pathname: "/forgotPassword",
    });*/

    this.props.changeParentLogin(true, "Owner", "Cliente", "XYX", "1", "1");
    this.props.history.push({
      pathname: "/dashboard/proyects",
    });
  };

  handleSubmit = () => {
    this.setState(
      {
        incompleteFields: false,
        incorrectFields: false,
      },
      () => {
        if (this.state.email == "" || this.state.password == "") {
          this.setState({
            incompleteFields: true,
            validated: true,
          });
        } else {
          const headers = {};

          let body = {
            correo: this.state.email,
            contrasenia: this.state.password,
          };

          axios
            .post(sessionStorage.getItem("api") + "api/usuario/login", body, {
              headers: headers,
            })
            .then((response) => {
              console.log(response);
              if (response.data == "Not allowed, invalid credentials") {
                this.setState({
                  incorrectFields: true,
                });
              } else {
                this.props.changeParentLogin(
                  true,
                  response.data.data.nombre,
                  response.data.data.rol,
                  response.data.accessToken,
                  response.data.data.idOrganizacion,
                  response.data.data.id
                );
                this.props.history.push({
                  pathname: "/dashboard/proyects",
                });
              }
            })
            .catch((error) => {
              this.setState({
                incorrectFields: true,
              });
            });
        }
      }
    );
  };

  render() {
    return (
      <React.Fragment>
        <div class="login-container">
          <img class="login-image" src={logo}></img>
          <h1>ReqBot</h1>
          <div class="input-parts">
            {" "}
            <Form noValidate validated={this.state.validated}>
              <InputGroup className="mb-3 login-input">
                <FormControl
                  placeholder="Correo"
                  type="text"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  required
                />
              </InputGroup>
              <InputGroup className="mb-3 login-input" hasValidation>
                <FormControl
                  placeholder="Contraseña"
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  required
                />
              </InputGroup>

              {this.state.incompleteFields ? (
                <div class="error-login-message">
                  *Por favor, complete todos los campos
                </div>
              ) : null}

              {this.state.incorrectFields ? (
                <div class="error-login-message">
                  *El correo o la contraseña ingresados son incorrectos
                </div>
              ) : null}
            </Form>
            <div class="login-buttons-div">
              <Button id="login-button" onClick={this.handleSubmit}>
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
