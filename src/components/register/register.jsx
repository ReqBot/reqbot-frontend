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

  plansCols = ({ planes }) => (
    <div class="plan-flex-div">
      {planes.map((plan) => (
        <div class="plan-card">
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

  render() {
    return (
      <React.Fragment>
        <div class="register-container">
          <h1>ReqBot</h1>
          <div class="register-parts">
            <this.plansCols planes={this.planes}></this.plansCols>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(Register);
