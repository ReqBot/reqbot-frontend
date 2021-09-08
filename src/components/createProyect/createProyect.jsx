import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./createProyect.css";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import { GrAdd } from "react-icons/gr";

class CreateProyect extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  componentDidMount() {}

  etiquetas = ["Movil", "Perro", "Carro", "Carro"];

  etiquetasRows = ({ etiquetas }) => (
    <div class="etiqueta-list">
      {etiquetas.map((etiqueta) => (
        <div class="etiqueta-row">{etiqueta} </div>
      ))}
    </div>
  );

  goBack = () => {
    this.props.history.push({
      pathname: "/dashboard/organization/",
    });
  };

  render() {
    return (
      <React.Fragment>
        <div class="header-proyect-admin">
          <h1>Crear Proyecto</h1>
        </div>
        <div class="contenedor-proyect-admin">
          <div class="proyect-admin-center">
            <h5>Nombre:</h5>
            <InputGroup className="mb-3 login-input">
              <FormControl
                placeholder="Nombre"
                aria-label="Nombre"
                aria-describedby="basic-addon1"
              />
            </InputGroup>

            <h5>Etiquetas:</h5>
            <div class="etiqueta-div">
              <InputGroup className="mb-3 login-input">
                <FormControl
                  aria-label="Nombre"
                  aria-describedby="basic-addon1"
                />
              </InputGroup>
              <GrAdd class="etiqueta-add"></GrAdd>
            </div>
            <this.etiquetasRows etiquetas={this.etiquetas}>
              {" "}
            </this.etiquetasRows>

            <h5>Estado:</h5>
            <Form.Select
              aria-label="Default select example"
              id="proyect-info-select"
            >
              <option>Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>

            <h5>Descripción:</h5>
            <Form.Control
              as="textarea"
              placeholder="Leave a comment here"
              style={{ height: "19%" }}
            />

            <div class="login-buttons-div">
              <Button id="save-button" onClick={this.goLogin}>
                Crear
              </Button>

              <Button id="save-button" onClick={this.goBack}>
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(CreateProyect);
