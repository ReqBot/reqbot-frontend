import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./createTicket.css";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import { GrAdd } from "react-icons/gr";

class CreateTicket extends Component {
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
      pathname: "/dashboard/tickets",
    });
  };

  saveTicket = () => {
    this.props.history.push({
      pathname: "/dashboard/tickets",
      megastate: { alert: true },
    });
  };

  render() {
    return (
      <React.Fragment>
        <div class="header-proyect-admin">
          <h1>Crear Ticket</h1>
        </div>
        <div class="contenedor-proyect-admin">
          <div class="proyect-admin-center">
            <h5>Titulo:</h5>
            <InputGroup className="mb-3 login-input">
              <FormControl
                placeholder="Nombre"
                aria-label="Nombre"
                aria-describedby="basic-addon1"
              />
            </InputGroup>

            <h5>Tipo:</h5>
            <Form.Select aria-label="Tipo" id="proyect-info-select">
              <option>Eliga un tipo</option>
              <option value="1">Tecnico</option>
              <option value="2">Entrenamiento</option>
            </Form.Select>

            <h5>Descripción:</h5>
            <Form.Control
              as="textarea"
              aria-label="Descripcion"
              placeholder="Leave a comment here"
              style={{ height: "19%" }}
            />

            <div class="login-buttons-div">
              <Button id="save-button" onClick={this.saveTicket}>
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

export default withRouter(CreateTicket);
