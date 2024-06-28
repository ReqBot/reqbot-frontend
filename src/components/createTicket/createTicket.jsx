import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./createTicket.css";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import axios from "axios";

class CreateTicket extends Component {
  state = {
    titulo: "",
    tipo: "",
    descripcion: "",

    incompleteFields: false,
  };

  constructor(props) {
    super(props);

    console.log(new Date().toLocaleString("en-US"));
  }

  componentDidMount() {}

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
    if (
      this.state.titulo == "" ||
      this.state.tipo == "" ||
      this.state.descripcion == ""
    ) {
      this.setState({
        incompleteFields: true,
      });
    } else {
      axios
        .get(
          sessionStorage.getItem("api") +
            "api/historiausuario/organizacion/" +
            sessionStorage.getItem("idOrganizacion")
        )
        .then((response) => {
          const headers = {};

          let jsonSent = {
            titulo: this.state.titulo,
            fecha: new Date().toLocaleString("en-US"),
            tipo: this.state.tipo,
            descripcion: this.state.descripcion,
            estado: "Pendiente",
            creadoPor: response.data[0].idHistoriaUsuario,
          };

          axios
            .post(sessionStorage.getItem("api") + "api/ticket/", jsonSent, {
              headers: headers,
            })
            .then((response) => {
              this.props.history.push({
                pathname: "/dashboard/tickets",
                megastate: { alert: true },
              });
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {});
    }
  };

  handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <React.Fragment>
        <div class="header-proyect-admin">
          <div class="page-main-title">Crear Ticket</div>
        </div>
        <div class="contenedor-proyect-admin">
          <div class="proyect-admin-center">
            <h5>Titulo:</h5>
            <InputGroup className="mb-3 login-input">
              <FormControl
                placeholder="Nombre"
                aria-label="Nombre"
                aria-describedby="basic-addon1"
                onChange={this.handleChange}
                name="titulo"
              />
            </InputGroup>

            <h5>Tipo:</h5>
            <Form.Select
              aria-label="Tipo"
              id="proyect-info-select"
              onClick={this.handleChange}
              name="tipo"
            >
              <option>Eliga un tipo</option>
              <option value="Tecnico">Tecnico</option>
              <option value="Entrenamiento">Entrenamiento</option>
            </Form.Select>

            <h5>Descripción:</h5>
            <Form.Control
              as="textarea"
              aria-label="Descripcion"
              placeholder="Redactar descripción aquí"
              style={{ height: "100px" }}
              name="descripcion"
              onChange={this.handleChange}
            />
            {this.state.incompleteFields ? (
              <div class="empty-fields-create">
                *Por favor, complete todos los campos
              </div>
            ) : null}
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
