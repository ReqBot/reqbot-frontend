import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./usersInfoProyect.css";
import Button from "react-bootstrap/Button";
import { AiFillSetting, AiFillCloseCircle } from "react-icons/ai";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

class UserInfoProyect extends Component {
  state = {
    modalSettings: false,
    modalAdd: false,
    usuariosShowed: [],
  };

  constructor(props) {
    super(props);
    console.log(props);
  }

  componentDidMount() {
    this.setState({
      usuariosShowed: this.usuarios,
    });
  }

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

  addToProyectUserRows = ({ users }) => (
    <div class="add-to-proyects-body">
      <div class="searchbar-div-add-user-proyect">
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Buscar"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            onChange={this.editSearchTerm}
            id="search-bar-add-user-proyect"
          />
        </InputGroup>
      </div>
      {users.map((user) => (
        <div class="add-to-proyects-info-body">
          <img
            src="https://i.pinimg.com/originals/b9/dc/14/b9dc143762700bee689092a1c96edc98.jpg"
            class="add-user-img"
          ></img>
          <div class="setting-user-text">
            {user.nombre}&nbsp;{user.apellido}
          </div>
          <Button id="agregar-usuario-proyecto">Agregar</Button>
        </div>
      ))}
    </div>
  );

  hanldeSettings = () => {
    this.setState({
      modalSettings: !this.state.modalSettings,
    });
  };

  hanldeAdd = () => {
    if (!this.state.modalAdd) {
      this.setState({
        usuariosShowed: this.usuarios,
      });
    }
    this.setState({
      modalAdd: !this.state.modalAdd,
    });
  };

  filterFunction = (objects, value) => {
    var filteredObjects = [];
    for (const i in objects) {
      if (objects[i].nombre.includes(value)) {
        filteredObjects.push(objects[i]);
      }
    }

    return filteredObjects;
  };

  editSearchTerm = (e) => {
    if (e.target.value != null) {
      this.setState({
        usuariosShowed: this.filterFunction(this.usuarios, e.target.value),
      });
    } else {
      this.setState({
        userStoriesShowed: this.usuarios,
      });
    }
  };

  render() {
    return (
      <React.Fragment>
        <div class="contenedor-tabla">
          <div class="col-clientes">
            {" "}
            <div class="header">
              <p>Clientes</p>
              <Button id="button-info-header" onClick={this.hanldeAdd}>
                Agregar
              </Button>
            </div>{" "}
            <this.userRows
              users={this.filterUsers(this.usuarios, "Cliente")}
            ></this.userRows>
          </div>
          <div class="col-analistas">
            {" "}
            <div class="header">
              <p>Analistas</p>
              <Button id="button-info-header" onClick={this.hanldeAdd}>
                Agregar
              </Button>
            </div>{" "}
            <this.userRows
              users={this.filterUsers(this.usuarios, "Analista")}
            ></this.userRows>
          </div>
        </div>

        <Modal
          show={this.state.modalSettings}
          onHide={this.hanldeSettings}
          id="settings-info-user"
        >
          <Modal.Header>
            <Modal.Title>Eliminar Usuario de Proyecto</Modal.Title>
            <AiFillCloseCircle
              id="btn-close"
              onClick={this.hanldeSettings}
            ></AiFillCloseCircle>
          </Modal.Header>
          <Modal.Body>
            ¿Esta seguro que desea eliminar este usuario del proyecto?
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={this.hanldeSettings}
              id="boton-cerrar-modal"
            >
              Cancelar
            </Button>
            <Button
              variant="primary"
              onClick={this.hanldeSettings}
              id="boton-guardar-modal"
            >
              Si
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={this.state.modalAdd}
          onHide={this.hanldeAdd}
          id="settings-info-user"
        >
          <Modal.Header>
            <Modal.Title>Agregar un usuario al proyecto</Modal.Title>
            <AiFillCloseCircle
              id="btn-close"
              onClick={this.hanldeAdd}
            ></AiFillCloseCircle>
          </Modal.Header>
          <Modal.Body>
            <this.addToProyectUserRows
              users={this.state.usuariosShowed}
            ></this.addToProyectUserRows>
          </Modal.Body>
        </Modal>
      </React.Fragment>
    );
  }
}

export default withRouter(UserInfoProyect);
