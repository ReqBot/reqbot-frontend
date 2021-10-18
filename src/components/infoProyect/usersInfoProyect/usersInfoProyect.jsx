import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./usersInfoProyect.css";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { AiFillCloseCircle, AiFillEdit, AiFillDelete } from "react-icons/ai";

import { MdRemoveCircle } from "react-icons/md";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

class UserInfoProyect extends Component {
  state = {
    modalAddClient: false,
    modalAddAnalyst: false,
    modalDelete: false,
    usuariosShowed: [],

    clientes: [],
    analistas: [],

    emptyClientes: true,
    emptyAnalistas: true,

    allClientes: [],
    allAnalistas: [],

    isHidden: false,
    alertMessage: "",

    userToDelete: "undefined",
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.getAllUsers();
    this.getUsersByProyectId();
  }

  filterUsers(users, role) {
    var filteredUsers = [];
    for (const i in users) {
      if (users[i].rol == role) {
        filteredUsers.push(users[i]);
      }
    }

    return filteredUsers;
  }

  getUsersByProyectId = () => {
    axios
      .get(
        sessionStorage.getItem("api") +
          "api/usuario/proyecto/" +
          this.props.proyect.idProyecto
      )
      .then((response) => {
        console.log("XDDD");
        console.log(response);
        var users = response.data;
        this.setState(
          {
            clientes: this.filterUsers(users, "Cliente"),
            analistas: this.filterUsers(users, "Analista"),
          },
          () => {
            if (this.state.clientes.length > 0) {
              this.setState({
                emptyClientes: false,
              });
            }
            if (this.state.analistas.length > 0) {
              this.setState({
                emptyAnalistas: false,
              });
            }
          }
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getAllUsers = () => {
    axios
      .get(
        sessionStorage.getItem("api") +
          "api/usuario/organizacion/" +
          sessionStorage.getItem("idOrganizacion")
      )
      .then((response) => {
        var users = response.data;
        this.setState({
          allClientes: this.filterUsers(users, "Cliente"),
          allAnalistas: this.filterUsers(users, "Analista"),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleAddClient = () => {
    var result = this.state.allClientes.filter(
      (o1) =>
        this.state.clientes.filter((o2) => o2.idUsuario === o1.idUsuario)
          .length === 0
    );
    if (!this.state.modalAddClient) {
      this.setState({
        usuariosShowed: result,
      });
    }
    this.setState({
      modalAddClient: !this.state.modalAddClient,
    });
  };

  handleAddAnalyst = () => {
    var result = this.state.allAnalistas.filter(
      (o1) =>
        this.state.analistas.filter((o2) => o2.idUsuario === o1.idUsuario)
          .length === 0
    );

    if (!this.state.modalAddAnalyst) {
      this.setState({
        usuariosShowed: result,
      });
    }
    this.setState({
      modalAddAnalyst: !this.state.modalAddAnalyst,
    });
  };

  filterFunction = (objects, value) => {
    var filteredObjects = [];
    var lowerCaseName = "";
    for (const i in objects) {
      lowerCaseName =
        objects[i].nombre.toLowerCase() + objects[i].apellido.toLowerCase();
      if (lowerCaseName.includes(value.toLowerCase())) {
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

  hanldeSettings = () => {
    this.setState({
      modalDelete: !this.state.modalDelete,
    });
  };

  openModalDeleteAndSetUser = (user) => {
    this.setState({
      modalDelete: !this.state.modalDelete,
      userToDelete: user,
    });
  };

  addUserToProyect = (userID) => {
    const headers = {};
    let jsonSent = {
      idProyecto: this.props.location.megastate.proyect.idProyecto,
      idUsuario: userID,
    };
    axios
      .post(sessionStorage.getItem("api") + "api/usuarioproyecto/", jsonSent, {
        headers: headers,
      })
      .then((response) => {
        this.getAllUsers();
        this.getUsersByProyectId();
        this.props.makeAlert(
          "Se agrego el usuario al proyecto de forma exitosa"
        );
        this.setState({
          modalAddClient: false,
          modalAddAnalyst: false,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  deleteUserFromProyect = () => {
    axios
      .delete(
        sessionStorage.getItem("api") +
          "api/usuarioproyecto/project/" +
          this.props.proyect.idProyecto +
          "/user/" +
          this.state.userToDelete.idUsuario
      )
      .then((response) => {
        this.getAllUsers();
        this.getUsersByProyectId();
        this.props.makeAlert(
          "Se elimino el usuario del proyecto de forma exitosa"
        );
        this.setState({
          modalDelete: false,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };

  userRows = ({ users }) => (
    <div class="body-container-overflow-proyect">
      {users.map((user) => (
        <div class="proyect-edit-body">
          <div class="edit-proyect-user-text-name">
            {user.nombre}&nbsp;{user.apellido}
          </div>
          <div class="edit-proyect-user-text-rol">
            <b>Rol:</b> {user.rol}
          </div>
          <div class="edit-proyect-user-text-state">
            <b>Estado:</b> {user.estado}
          </div>

          <div class="edit-proyect-user-text-delete">
            <AiFillDelete
              id="delete-icon-general"
              onClick={this.openModalDeleteAndSetUser.bind(this, user)}
            ></AiFillDelete>
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
          <Button
            id="agregar-usuario-proyecto"
            onClick={this.addUserToProyect.bind(this, user.idUsuario)}
          >
            Agregar
          </Button>
        </div>
      ))}
    </div>
  );

  render() {
    return (
      <React.Fragment>
        <div class="contenedor-org-manage">
          <div class="organizacion-contenedor-tabla-bottom">
            <div class="organizacion-usuarios">
              {" "}
              <div class="header">
                <p>Clientes</p>
                <Button
                  id="organization-button-header"
                  onClick={this.handleAddClient}
                >
                  Agregar
                </Button>
              </div>{" "}
              <this.userRows users={this.state.clientes}></this.userRows>
            </div>
          </div>
          <div class="organizacion-contenedor-tabla-bottom">
            <div class="organizacion-usuarios">
              {" "}
              <div class="header">
                <p>Analistas</p>
                <Button
                  id="organization-button-header"
                  onClick={this.handleAddAnalyst}
                >
                  Agregar
                </Button>
              </div>{" "}
              <this.userRows users={this.state.analistas}></this.userRows>
            </div>
          </div>
        </div>

        <div>
          <Modal
            show={this.state.modalAddClient}
            onHide={this.handleAddClient}
            id="settings-info-user"
          >
            <Modal.Header>
              <Modal.Title>Agregar un cliente al proyecto</Modal.Title>
              <AiFillCloseCircle
                id="btn-close"
                onClick={this.handleAddClient}
              ></AiFillCloseCircle>
            </Modal.Header>
            <Modal.Body>
              <this.addToProyectUserRows
                users={this.state.usuariosShowed}
              ></this.addToProyectUserRows>
            </Modal.Body>
          </Modal>

          <Modal
            show={this.state.modalAddAnalyst}
            onHide={this.handleAddAnalyst}
            id="settings-info-user"
          >
            <Modal.Header>
              <Modal.Title>Agregar un analista al proyecto</Modal.Title>
              <AiFillCloseCircle
                id="btn-close"
                onClick={this.handleAddAnalyst}
              ></AiFillCloseCircle>
            </Modal.Header>
            <Modal.Body>
              <this.addToProyectUserRows
                users={this.state.usuariosShowed}
              ></this.addToProyectUserRows>
            </Modal.Body>
          </Modal>

          <Modal
            show={this.state.modalDelete}
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
                onClick={this.deleteUserFromProyect}
                id="boton-guardar-modal"
              >
                Aceptar
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(UserInfoProyect);
