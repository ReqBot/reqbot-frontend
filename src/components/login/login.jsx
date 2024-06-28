import React, { Component } from "react";
import "./login.css";
import logo from "../../img/logo.png";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router-dom";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

class Login extends Component {
  state = {
    email: "",
    password: "",

    incompleteFields: false,
    incorrectFields: false,

    isHidden: false,

    loadingSent: false,
  };

  componentDidMount() {
    if (this.props.location.megastate) {
      if (this.props.location.megastate.alert) {
        this.applyTme();
      }
    } else {
      console.log("Entro acacc");
    }
  }

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
    this.props.history.push({
      pathname: "/register",
    });

    /*
    this.props.changeParentLogin(true, "Andre", "analyst");
    this.props.history.push({
      pathname: "/dashboard/proyects",
    });

    */
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
          this.setState(
            {
              loadingSent: true,
            },
            () => {
              const headers = {};

              let body = {
                correo: this.state.email,
                contrasenia: this.state.password,
              };
              axios
                .post(
                  sessionStorage.getItem("api") + "api/usuario/login",
                  body,
                  {
                    headers: headers,
                  }
                )
                .then((response) => {
                  console.log(response);
                  if (response.data == "Not allowed, invalid credentials") {
                    this.setState({
                      incorrectFields: true,
                      loadingSent: false,
                    });
                  } else {
                    this.setState({ loadingSent: false });
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
                    loadingSent: false,
                  });
                });
            }
          );
        }
      }
    );
  };

  applyTme = () => {
    this.setState({
      isHidden: true,
    });

    this.useEffect();
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
          {" "}
          Se registro de manera exitosa
        </Alert>
        <div class="login-container">
          <div class="middle-center">
            <div class="content-container login-form-div">
              <img class="login-image" src={logo}></img>{" "}
              <div class="login-title">ReqBot</div>{" "}
              <Form noValidate validated={this.state.validated}>
                <Form.Group className="mb-3 login-input">
                  <Form.Label className="input-label-inside-div">
                    Correo Electronico
                  </Form.Label>
                  <FormControl
                    placeholder="Correo"
                    type="text"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                    required
                  />{" "}
                </Form.Group>

                <Form.Group className="mb-3 login-input" hasValidation>
                  <Form.Label className="input-label-inside-div">
                    Contraseña
                  </Form.Label>
                  <FormControl
                    placeholder="Contraseña"
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    required
                  />
                </Form.Group>

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
                <Button
                  className="primary-button-color primary-button-size"
                  onClick={this.handleSubmit}
                  disabled={this.state.loadingSent}
                >
                  {this.state.loadingSent ? (
                    <Spinner className="loader-send-inside-button"></Spinner>
                  ) : null}
                  <div class="button-text">Iniciar Sesión</div>
                </Button>
                <Button
                  className="primary-button-color primary-button-size"
                  onClick={this.goToRegister}
                >
                  Registrarme
                </Button>
              </div>
              <p class="login-link">¿Olvidaste tu contraseña?</p>
            </div>
            <p class="footer-login">
              Lima,
              <br />
              Proyecto de tesis de Luis Kcomt y Andres Lopez <br />
              octubre, 2021
            </p>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(Login);
