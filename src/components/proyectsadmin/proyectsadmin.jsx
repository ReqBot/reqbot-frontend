import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./proyectsadmin.css";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import { GrAdd } from "react-icons/gr";

class ProyectsAdmin extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }
  componentDidMount() {}

  etiquetas = ["Movil", "Perro", "Carro", "Carro"];

  usuarios = [
    {
      nombre: "Luis",
      apellido: "Kcomt",
      correo: "",
      contraseña: "",
      rol: "Cliente",
      estado: "Activo",
    },
    {
      nombre: "Cesar",
      apellido: "Lopez",
      correo: "",
      contraseña: "",
      rol: "Analista",
      estado: "Activo",
    },
    {
      nombre: "Bruno",
      apellido: "Atocha",
      correo: "",
      contraseña: "",
      rol: "Analista",
      estado: "Activo",
    },
    {
      nombre: "Junioe",
      apellido: "Lopez",
      correo: "",
      contraseña: "",
      rol: "Cliente",
      estado: "Activo",
    },
    {
      nombre: "Piero",
      apellido: "Melano",
      correo: "",
      contraseña: "",
      rol: "Cliente",
      estado: "Activo",
    },
    {
      nombre: "Junioe",
      apellido: "Lopez",
      correo: "",
      contraseña: "",
      rol: "Cliente",
      estado: "Activo",
    },
    {
      nombre: "Piero",
      apellido: "Melano",
      correo: "",
      contraseña: "",
      rol: "Cliente",
      estado: "Activo",
    },
  ];

  etiquetasRows = ({ etiquetas }) => (
    <div class="etiqueta-list">
      {etiquetas.map((etiqueta) => (
        <div class="etiqueta-row">{etiqueta} </div>
      ))}
    </div>
  );

  userRows = ({ users }) => (
    <div class="body-container-overflow-proyect">
      {users.map((user) => (
        <div class="proyect-edit-body">
          <div class="organization-user-text-name">
            {user.nombre}&nbsp;{user.apellido}
          </div>
          <div class="organization-user-text-rol">
            <b>Rol:</b> {user.rol}
          </div>
          <div class="organization-user-text-state">
            <b>Estado:</b> {user.estado}
          </div>
        </div>
      ))}
    </div>
  );

  render() {
    return (
      <React.Fragment>
        <div class="header-proyect-admin">
          <h1>Editar Proyecto</h1>
        </div>
        <div class="contenedor-proyect-admin">
          <div class="proyect-admin-left">
            <h5>Nombre:</h5>
            <InputGroup className="mb-3 login-input">
              <FormControl
                placeholder="Nombre"
                aria-label="Nombre"
                aria-describedby="basic-addon1"
                defaultValue="HELLO"
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
            <Button id="save-button" onClick={this.goLogin}>
              Guardar
            </Button>
          </div>
          <div class="proyect-admin-left">
            <div class="organizacion-usuarios">
              {" "}
              <div class="header">
                <p>Clientes</p>
                <Button
                  id="organization-button-header"
                  onClick={this.hanldeAdd}
                >
                  Agregar
                </Button>
              </div>{" "}
              <this.userRows users={this.usuarios}></this.userRows>
            </div>
            <div class="organizacion-usuarios">
              {" "}
              <div class="header">
                <p>Analistas</p>
                <Button
                  id="organization-button-header"
                  onClick={this.hanldeAdd}
                >
                  Agregar
                </Button>
              </div>{" "}
              <this.userRows users={this.usuarios}></this.userRows>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(ProyectsAdmin);
