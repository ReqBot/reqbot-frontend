import React, { Component } from "react";
import "./register.css";
import logo from "../../img/logo.png";
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

    cardNumber: "",
    expiry: "",
    cvc: "",
  };

  planes = [
    {
      idProyecto: 1,
      nombre: "Plan 1",
      descripcion:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla congue congue nulla, sed ultricies lacus tincidunt sit amet.",
      costo: "0",
    },
    {
      idProyecto: 2,
      nombre: "Plan 2",
      descripcion:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla congue congue nulla, sed ultricies lacus tincidunt sit amet.",
      costo: "20",
    },
    {
      idProyecto: 3,
      nombre: "Plan 3",
      descripcion:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla congue congue nulla, sed ultricies lacus tincidunt sit amet.",
      costo: "40",
    },
  ];

  componentDidMount() {}

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

  prevPhase = () => {
    this.setState({
      phase: this.state.phase - 1,
    });
  };

  plansCols = ({ planes }) => (
    <div class="plan-flex-div">
      {planes.map((plan) => (
        <div class="plan-card" onClick={this.nextPhase}>
          <h5>{plan.nombre}</h5>
          <p>{plan.descripcion}</p>
          <p>
            <b>S/.{plan.costo}</b>
          </p>
          <p>
            <i>Mensual</i>
          </p>
          <Button id="boton-guardar-modal">Elegir</Button>
        </div>
      ))}
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

  handleCardNumberChange = (event) => {
    this.setState({ cardNumber: event.value });
  };

  handleCardExpiryChange = (event) => {
    this.setState({ expiry: event.value });
  };

  handleCardCVCChange = (event) => {
    this.setState({ cvc: event.value });
  };

  render() {
    return (
      <React.Fragment>
        <div class="register-container">
          <h1>ReqBot</h1>
          <div class="register-parts">
            {this.state.phase == 1 ? (
              <this.plansCols planes={this.planes}></this.plansCols>
            ) : null}
            {this.state.phase == 2 ? (
              <div class="register-info">
                <h4>Datos:</h4>{" "}
                <div class="register-seccions">
                  <div class="col-register">
                    <p>Nombre:</p>
                    <InputGroup className="mb-3 login-input">
                      <FormControl
                        aria-label="Nombre"
                        aria-describedby="basic-addon1"
                      />
                    </InputGroup>
                    <p>Siglas:</p>
                    <InputGroup className="mb-3 login-input">
                      <FormControl
                        aria-label="siglas"
                        aria-describedby="basic-addon1"
                      />
                    </InputGroup>
                    <p>Descripcion:</p>
                    <Form.Control
                      aria-label="Descripcion"
                      as="textarea"
                      style={{ height: "19%" }}
                    />
                  </div>{" "}
                  <div class="col-register">
                    {" "}
                    <h5>Idioma:</h5>
                    <Form.Select aria-label="Rol" id="register-color-select">
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
                  </div>
                </div>
                <div class="buttons-register-info">
                  <Button id="boton-guardar-modal-2" onClick={this.prevPhase}>
                    Regresar
                  </Button>
                  <Button id="boton-guardar-modal-2" onClick={this.nextPhase}>
                    Siguiente
                  </Button>
                </div>
              </div>
            ) : null}

            {this.state.phase == 3 ? (
              <div class="register-info">
                <h4>Información:</h4>{" "}
                <div class="register-seccions">
                  <div class="col-register">
                    <div class="line-flex-color-register">
                      <div class="color-picker-div-register">
                        <h5>Color Primario:</h5>
                        <SliderPicker
                          color={this.state.color1}
                          onChangeComplete={this.handleChangeComplete}
                        />
                      </div>
                      <div class="color-picker-div-register">
                        <h5>Color Secundario:</h5>
                        <SliderPicker
                          color={this.state.color2}
                          onChangeComplete={this.handleChangeComplete2}
                        />
                      </div>
                    </div>
                  </div>{" "}
                  <div class="col-register">
                    <div class="line-flex-color">
                      <div class="color-picker-div-register">
                        <h5>Color Terciario:</h5>
                        <SliderPicker
                          color={this.state.color1}
                          onChangeComplete={this.handleChangeComplete}
                        />
                      </div>

                      <div class="color-picker-div-register">
                        <h5>Color de texto:</h5>
                        <SliderPicker
                          color={this.state.color3}
                          onChangeComplete={this.handleChangeComplete3}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="buttons-register-info">
                  <Button id="boton-guardar-modal-2" onClick={this.prevPhase}>
                    Regresar
                  </Button>
                  <Button id="boton-guardar-modal-2">Registrar</Button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(Register);
