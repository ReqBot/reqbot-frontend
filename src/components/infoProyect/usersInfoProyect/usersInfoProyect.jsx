import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./usersInfoProyect.css";
import Button from "react-bootstrap/Button";
import { AiFillSetting } from "react-icons/ai";

class UserInfoProyect extends Component {
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
          <AiFillSetting id="settings-user-wheel"></AiFillSetting>
          <div class="setting-user-text">
            {user.nombre}&nbsp;{user.apellido}
          </div>
          <div></div>
        </div>
      ))}
    </div>
  );

  render() {
    return (
      <React.Fragment>
        <div class="contenedor-tabla">
          <div class="col-clientes">
            {" "}
            <div class="header">
              <p>Clientes</p>
              <Button id="button-info-header">Agregar</Button>
            </div>{" "}
            <this.userRows
              users={this.filterUsers(this.usuarios, "Cliente")}
            ></this.userRows>
          </div>
          <div class="col-analistas">
            {" "}
            <div class="header">
              <p>Analistas</p>
              <Button id="button-info-header">Agregar</Button>
            </div>{" "}
            <this.userRows
              users={this.filterUsers(this.usuarios, "Analista")}
            ></this.userRows>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(UserInfoProyect);
