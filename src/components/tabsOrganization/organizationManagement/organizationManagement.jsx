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

  dummyText =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla congue congue nulla, sed ultricies lacus tincidunt sit amet. Vivamus semper eros lorem. Sed facilisis vulputate massa, quis elementum leo sagittis non. Aliquam  facilisis mollis dolor id ullamcorper. Phasellus cursus nunc ut eros rutrum vulputate. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum libero justo, ornare quis cursus ut, luctus sed diam.";

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
      descripcion: "Lorem ipsum dolor sit amet",
    },
    {
      nombre: "MF DOOM",
      fechaModificacion: "2/11/2020",
      etiqueta: "Movil",
      estado: "En Progreso",
      numeroDeHistorias: "8",
      numeroUsuarios: "6",
      descripcion: this.dummyText,
    },
    {
      nombre: "Proyect Manhattan",
      fechaModificacion: "9/16/2019",
      etiqueta: "Web",
      estado: "Finalizado",
      numeroDeHistorias: "10",
      numeroUsuarios: "3",
      descripcion: this.dummyText,
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
      correo: "luiskcomt@gmail.com",
      contraseña: "",
      rol: "Cliente",
      estado: "Activo",
    },
    {
      nombre: "Cesar",
      apellido: "Lopez",
      correo: "luiskcomt@gmail.com",
      contraseña: "",
      rol: "Analista",
      estado: "Activo",
    },
    {
      nombre: "Bruno",
      apellido: "Atocha",
      correo: "luiskcomt@gmail.com",
      contraseña: "",
      rol: "Analista",
      estado: "Activo",
    },
    {
      nombre: "Junioe",
      apellido: "Lopez",
      correo: "luiskcomt@gmail.com",
      contraseña: "",
      rol: "Cliente",
      estado: "Activo",
    },
    {
      nombre: "Piero",
      apellido: "Melano",
      correo: "luiskcomt@gmail.com",
      contraseña: "",
      rol: "Cliente",
      estado: "Activo",
    },
    {
      nombre: "Junioe",
      apellido: "Lopez",
      correo: "luiskcomt@gmail.com",
      contraseña: "",
      rol: "Cliente",
      estado: "Activo",
    },
    {
      nombre: "Piero",
      apellido: "Melano",
      correo: "luiskcomt@gmail.com",
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

  goToProyectInfo = (proyectIndex) => {
    this.props.history.push({
      pathname: "/dashboard/organization/proyect/info",
      megastate: { proyect: proyectIndex },
    });
  };

  goToEditUser = (userIndex) => {
    this.props.history.push({
      pathname: "/dashboard/organization/edit/user",
      megastate: { user: userIndex },
    });
  };

  goToCreateProyect = () => {
    this.props.history.push({
      pathname: "/dashboard/organization/create/proyect",
    });
  };

  goToCreateUser = () => {
    this.props.history.push({
      pathname: "/dashboard/organization/create/user",
    });
  };

  userRows = ({ users }) => (
    <div class="body-container-overflow-organization">
      {users.map((user) => (
        <div
          class="organization-info-body"
          onClick={this.goToEditUser.bind(this, user)}
        >
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

  projectRows = ({ proyects }) => (
    <div class="body-container-overflow-organization">
      {proyects.map((proyect) => (
        <div
          class="organization-info-body-proyect"
          onClick={this.goToProyectInfo.bind(this, proyect)}
        >
          <div class="organization-proyect-text-name">{proyect.nombre}</div>
          <div class="organization-proyect-text-description">
            {proyect.descripcion}
          </div>
          <div class="organization-proyect-text-date-2">
            <b>Ultima Modificación:</b> {proyect.fechaModificacion}
          </div>
        </div>
      ))}
    </div>
  );

  render() {
    return (
      <React.Fragment>
        <div class="contenedor-org-manage">
          <div class="organizacion-contenedor-tabla-top">
            <div class="organizacion-usuarios">
              {" "}
              <div class="header">
                <p>Proyectos</p>
                <Button
                  id="organization-button-header"
                  onClick={this.goToCreateProyect}
                >
                  Crear
                </Button>
              </div>{" "}
              <this.projectRows proyects={this.proyects}></this.projectRows>
            </div>
          </div>
          <div class="organizacion-contenedor-tabla-bottom">
            <div class="organizacion-usuarios">
              {" "}
              <div class="header">
                <p>Usuarios</p>
                <Button
                  id="organization-button-header"
                  onClick={this.goToCreateUser}
                >
                  Crear
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

export default withRouter(OrganizationManagement);
