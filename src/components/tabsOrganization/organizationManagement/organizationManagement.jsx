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

  proyects = [
    {
      nombre: "carritOS",
      fechaModificacion: "8/14/2021",
      etiqueta: "Movil",
      estado: "En Progreso",
      numeroDeHistorias: "5",
      numeroUsuarios: "4",
      descripcion: this.dummyText,
    },
    {
      nombre: "Cubi Pools",
      fechaModificacion: "5/10/2020",
      etiqueta: "Web",
      estado: "En Progreso",
      numeroDeHistorias: "4",
      numeroUsuarios: "5",
      descripcion: this.dummyText,
    },
    {
      nombre: "MF DOOM",
      fechaModificacion: "2/11/2020",
      etiqueta: "Movil",
      estado: "En Progreso",
      numeroDeHistorias: "8",
      numeroUsuarios: "6",
      descripcion: "",
    },
    {
      nombre: "Proyect Manhattan",
      fechaModificacion: "9/16/2019",
      etiqueta: "Web",
      estado: "Finalizado",
      numeroDeHistorias: "10",
      numeroUsuarios: "3",
      descripcion: "",
    },
    {
      nombre: "Americas Most Blunted",
      fechaModificacion: "12/24/2018",
      etiqueta: "Movil",
      estado: "Finalizado",
      numeroDeHistorias: "15",
      numeroUsuarios: "4",
      descripcion: this.dummyText,
    },
    {
      nombre: "carritOS 2",
      fechaModificacion: "11/29/2018",
      etiqueta: "Movil",
      estado: "Finalizado",
      numeroDeHistorias: "14",
      numeroUsuarios: "5",
      descripcion: this.dummyText,
    },
  ];

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
        <div class="organization-info-body ">
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

  projectRows = ({ users }) => (
    <div class="body-container-overflow">
      {users.map((user) => (
        <div class="organization-info-body">
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
              <Button id="organization-button-header" onClick={this.hanldeAdd}>
                Crear
              </Button>
            </div>{" "}
            <this.projectRows users={this.usuarios}></this.projectRows>
          </div>
        </div>
        <div class="organizacion-contenedor-tabla">
          <div class="organizacion-usuarios">
            {" "}
            <div class="header">
              <p>Usuarios</p>
              <Button id="organization-button-header" onClick={this.hanldeAdd}>
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
