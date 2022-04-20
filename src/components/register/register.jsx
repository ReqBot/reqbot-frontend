import React, { Component } from "react";
import "./register.css";
import axios from "axios";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router-dom";
import CreditCardInput from "react-credit-card-input";
import { SliderPicker } from "react-color";

class Register extends Component {
  state = {
    loggedIn: false,

    phase: 1,

    color1: "#545871",
    color2: "#f7eceb",
    color3: "#FFFFFF",
    color4: "#f7eceb",

    cardNumber: "",
    expiry: "",
    cvc: "",

    nombre: "",
    siglas: "",
    descripcion: "",
    idioma: "",

    planes: [],
    selectedPlan: "",

    incompleteFields1: false,
    incompleteFields2: false,
    notEqualPasswords: false,

    nombreUsuario: "",
    apellidoUsuario: "",
    correoUsuario: "",
    contraseña: "",
    repetirContraseña: "",
  };

  componentDidMount() {
    this.getAllPlans();
  }

  getAllPlans = () => {
    axios
      .get(sessionStorage.getItem("api") + "api/plan/")
      .then((response) => {
        this.setState({
          planes: response.data,
        });
      })
      .catch((error) => {});
  };

  goToRegister = () => {
    this.props.history.push({
      pathname: "/registrar",
    });
  };

  nextPhase = () => {
    this.setState({
      phase: this.state.phase + 1,
    });
  };

  nextPhase2To3 = () => {
    if (
      this.state.nombre == "" ||
      this.state.siglas == "" ||
      this.state.descripcion == "" ||
      this.state.idioma == "" ||
      this.state.cardNumber == "" ||
      this.state.expiry ||
      this.state.cvc
    ) {
      this.setState({
        incompleteFields1: true,
      });
    } else {
      this.setState({
        phase: this.state.phase + 1,
      });
    }
  };

  prevPhase = () => {
    this.setState({
      phase: this.state.phase - 1,
      incompleteFields1: false,
      incompleteFields2: false,
    });
  };

  selectPlanAndNextPhase = (selectPlan) => {
    this.setState({
      selectedPlan: selectPlan,
      phase: this.state.phase + 1,
    });
  };

  plansCols = ({ planes }) => (
    <div class="register-parts-2">
      <div class="plan-flex-div">
        {planes.map((plan) => (
          <div
            class="plan-card"
            onClick={this.selectPlanAndNextPhase.bind(this, plan)}
          >
            <h5>{plan.nombre}</h5>
            <p>{plan.descripcion}</p>
            <p>
              <b>S/.{plan.costo}</b>
            </p>
            <p>
              <i>Mensual</i>
            </p>{" "}
            <Button id="boton-guardar-modal">Elegir</Button>
          </div>
        ))}
      </div>
      <div class="go-back-div">
        <Button id="go-back-register" onClick={this.goBack}>
          Regresar
        </Button>{" "}
      </div>
    </div>
  );

  handleChangeComplete = (color) => {
    this.setState({ color1: color.hex });
  };

  handleChangeComplete2 = (color) => {
    this.setState({ color2: color.hex });
  };

  handleChangeComplete3 = (color) => {
    this.setState({ color3: color.hex });
  };

  handleChangeComplete4 = (color) => {
    this.setState({ color4: color.hex });
  };

  handleCardNumberChange = (event) => {
    this.setState({ cardNumber: event.value });
  };

  handleCardExpiryChange = (event) => {
    this.setState({ expiry: event.value });
  };

  handleCardCVCChange = (event) => {
    this.setState({ cvc: event.value });
  };

  handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };

  register = () => {
    if (
      this.state.nombreUsuario == "" ||
      this.state.apellidoUsuario == "" ||
      this.state.correoUsuario == "" ||
      this.state.contraseña == "" ||
      this.state.repetirContraseña == ""
    ) {
      this.setState({
        incompleteFields2: true,
      });
    } else {
      if (this.state.contraseña != this.state.repetirContraseña) {
        this.setState({
          notEqualPasswords: true,
        });
      } else {
        const headers = {};

        let jsonSent = {
          nombre: this.state.nombre,
          siglas: this.state.siglas,
          descripcion: this.state.descripcion,
          imagen:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdaXHXlG65nzBxuNdReq3btK65jtN0w1S_wQ&usqp=CAU",
          colorPrimario: this.state.color1,
          colorSecundario: this.state.color2,
          idPlan: this.state.selectedPlan.idPlan,
        };

        axios
          .post(sessionStorage.getItem("api") + "api/organizacion/", jsonSent, {
            headers: headers,
          })
          .then((response) => {
            console.log(response);

            var idOrg = response.data.data;

            let jsonSentUsuario = {
              nombre: this.state.nombreUsuario,
              apellido: this.state.apellidoUsuario,
              correo: this.state.correoUsuario,
              contrasenia: this.state.contraseña,
              rol: "Administrador",
              estado: "Activo",
              idOrganizacion: idOrg,
            };

            axios
              .post(
                sessionStorage.getItem("api") + "api/usuario/",
                jsonSentUsuario,
                {
                  headers: headers,
                }
              )
              .then((response) => {
                this.props.history.push({
                  pathname: "/",
                  megastate: { alert: true },
                });
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };

  goBack = () => {
    this.props.history.push({
      pathname: "/",
    });
  };

  render() {
    return (
      <React.Fragment>
        <div class="register-container">
          <div class="middle-center-register">
            <h1>Registro</h1>
            <div class="register-parts">
              {this.state.phase == 1 ? (
                <this.plansCols planes={this.state.planes}></this.plansCols>
              ) : null}
              {this.state.phase == 2 ? (
                <div class="register-info">
                  <div>
                    {" "}
                    <h4>Datos de organización:</h4>{" "}
                  </div>

                  <div class="register-seccions">
                    <div class="col-register">
                      <p>Nombre:</p>
                      <InputGroup className="mb-3 login-input">
                        <FormControl
                          aria-label="Nombre"
                          aria-describedby="basic-addon1"
                          name="nombre"
                          value={this.state.nombre}
                          onChange={this.handleChange}
                        />
                      </InputGroup>
                      <p>Siglas:</p>
                      <InputGroup className="mb-3 login-input">
                        <FormControl
                          aria-label="siglas"
                          aria-describedby="basic-addon1"
                          name="siglas"
                          value={this.state.siglas}
                          onChange={this.handleChange}
                        />
                      </InputGroup>
                      <p>Descripcion:</p>
                      <Form.Control
                        aria-label="Descripcion"
                        as="textarea"
                        style={{ height: "19%" }}
                        name="descripcion"
                        value={this.state.descripcion}
                        onChange={this.handleChange}
                      />
                    </div>{" "}
                    <div class="col-register">
                      {" "}
                      <h5>Idioma:</h5>
                      <Form.Select
                        aria-label="Rol"
                        id="register-color-select"
                        onClick={this.handleChange}
                        name="idioma"
                      >
                        <option>Eliga un idioma</option>
                        <option value="1">English</option>
                        <option value="2">Español</option>
                      </Form.Select>
                      <h5>Pago:</h5>
                      <CreditCardInput
                        cardNumberInputProps={{
                          value: this.state.cardNumber,
                          onChange: this.handleCardNumberChange,
                        }}
                        cardExpiryInputProps={{
                          value: this.state.expiry,
                          onChange: this.handleCardExpiryChange,
                        }}
                        cardCVCInputProps={{
                          value: this.state.cvc,
                          onChange: this.handleCardCVCChange,
                        }}
                        fieldClassName="card-field"
                      />
                      <div class="line-flex-color-register">
                        <div class="color-picker-div-register">
                          <h5>Color Primario:</h5>
                          <SliderPicker
                            color={this.state.color1}
                            onChangeComplete={this.handleChangeComplete}
                          />
                        </div>

                        <div class="color-picker-div-register">
                          <h5>Color de Secundario:</h5>
                          <SliderPicker
                            color={this.state.color2}
                            onChangeComplete={this.handleChangeComplete2}
                          />
                        </div>
                      </div>
                      {this.state.incompleteFields1 ? (
                        <div class="empty-fields-register">
                          *Por favor, complete todos los campos
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div class="buttons-register-info">
                    <Button id="boton-guardar-modal-2" onClick={this.prevPhase}>
                      Regresar
                    </Button>
                    <Button
                      id="boton-guardar-modal-2"
                      onClick={this.nextPhase2To3}
                    >
                      Siguiente
                    </Button>
                  </div>
                </div>
              ) : null}

              {this.state.phase == 3 ? (
                <div class="register-info">
                  <div>
                    {" "}
                    <h4>Datos de cuenta:</h4>{" "}
                  </div>

                  <div class="register-seccions">
                    <div class="col-register">
                      <p>Nombre:</p>
                      <InputGroup className="mb-3 login-input">
                        <FormControl
                          aria-label="Nombre"
                          aria-describedby="basic-addon1"
                          name="nombreUsuario"
                          onChange={this.handleChange}
                        />
                      </InputGroup>
                      <p>Apellido:</p>
                      <InputGroup className="mb-3 login-input">
                        <FormControl
                          aria-label="siglas"
                          aria-describedby="basic-addon1"
                          name="apellidoUsuario"
                          onChange={this.handleChange}
                        />
                      </InputGroup>
                      <p>Correo:</p>
                      <InputGroup className="mb-3 login-input">
                        <FormControl
                          aria-label="siglas"
                          aria-describedby="basic-addon1"
                          name="correoUsuario"
                          onChange={this.handleChange}
                        />
                      </InputGroup>

                      <h5>Rol:</h5>
                      <Form.Select
                        aria-label="Rol"
                        id="register-color-select"
                        disabled
                      >
                        <option>Administrador</option>
                      </Form.Select>
                    </div>{" "}
                    <div class="col-register">
                      <h5>Contraseña:</h5>
                      <InputGroup className="mb-3 login-input">
                        <FormControl
                          type="password"
                          aria-label="Contraseña"
                          aria-describedby="passwordHelpBlock"
                          onChange={this.handleChange}
                          name="contraseña"
                        />
                      </InputGroup>
                      <h5>Confirmar Contraseña:</h5>
                      <InputGroup className="mb-3 login-input">
                        <FormControl
                          type="password"
                          aria-label="ConfirmarContraseña"
                          aria-describedby="passwordHelpBlock"
                          onChange={this.handleChange}
                          name="repetirContraseña"
                        />
                      </InputGroup>
                      <div class="line-flex-color-register">
                        <div class="color-picker-div-register">
                          <h5>Color Terciario:</h5>
                          <SliderPicker
                            color={this.state.color3}
                            onChangeComplete={this.handleChangeComplete3}
                          />
                        </div>

                        <div class="color-picker-div-register">
                          <h5>Color de Texto:</h5>
                          <SliderPicker
                            color={this.state.color4}
                            onChangeComplete={this.handleChangeComplete4}
                          />
                        </div>
                      </div>
                      {this.state.incompleteFields2 ? (
                        <div class="empty-fields-register">
                          *Por favor, complete todos los campos
                        </div>
                      ) : null}

                      {this.state.notEqualPasswords ? (
                        <div class="empty-fields-register">
                          *Las contraseñas no coinciden
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div class="buttons-register-info">
                    <Button id="boton-guardar-modal-2" onClick={this.prevPhase}>
                      Regresar
                    </Button>
                    <Button id="boton-guardar-modal-2" onClick={this.register}>
                      Registrar
                    </Button>
                  </div>
                </div>
              ) : null}
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

export default withRouter(Register);
