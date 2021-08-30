import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Tab, Tabs } from "react-bootstrap";
import "./organizationManagement.css";
import Button from "react-bootstrap/Button";
import { AiFillSetting, AiFillCloseCircle } from "react-icons/ai";

class OrganizationManagement extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }
  componentDidMount() {}

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

  filterUsers(users, role) {
    var filteredUsers = [];
    for (const i in users) {
      if (users[i].rol == role) {
        filteredUsers.push(users[i]);
      }
    }

    return filteredUsers;
  }

  userRows = ({ users }) => (
    <div class="body-container-overflow">
      {users.map((user) => (
        <div class="info-body">
          <AiFillSetting
            id="settings-user-wheel"
            onClick={this.hanldeSettings}
          ></AiFillSetting>
          <div class="setting-user-text">
            {user.nombre}&nbsp;{user.apellido}
          </div>
        </div>
      ))}
    </div>
  );
  render() {
    return (
      <React.Fragment>
        <div class="organizacion-contenedor-tabla">
          <div class="organizacion-usuarios">
            {" "}
            <div class="header">
              <p>Proyectos</p>
              <Button id="button-info-header" onClick={this.hanldeAdd}>
                Crear
              </Button>
            </div>{" "}
            <this.userRows users={this.usuarios}></this.userRows>
          </div>
        </div>
        <div class="organizacion-contenedor-tabla">
          <div class="organizacion-usuarios">
            {" "}
            <div class="header">
              <p>Usuarios</p>
              <Button id="button-info-header" onClick={this.hanldeAdd}>
                Crear
              </Button>
            </div>{" "}
            <this.userRows users={this.usuarios}></this.userRows>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(OrganizationManagement);
