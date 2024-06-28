import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./organizationManagement.css";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { AiFillCloseCircle, AiFillEdit, AiFillDelete } from "react-icons/ai";
import Modal from "react-bootstrap/Modal";

class OrganizationManagement extends Component {
  state = {
    proyects: [],
    users: [],

    modalDeleteProyect: false,
    modalDeleteUser: false,

    proyectToDelete: false,
    userToDelete: false,
  };
  constructor(props) {
    super(props);
    console.log(props);
  }

  componentDidMount() {
    if (this.props.location.megastate) {
      if (this.props.location.megastate.alert == "createProyect") {
        this.props.applyTime("Se creo el proyecto de forma exitosa");
      }
      if (this.props.location.megastate.alert == "createUser") {
        this.props.applyTime("Se creo el usuario de forma exitosa");
      }
      if (this.props.location.megastate.alert == "editProyect") {
        this.props.applyTime("Se edito el proyecto de forma exitosa");
      }
      if (this.props.location.megastate.alert == "editUser") {
        this.props.applyTime("Se edito el usuario de forma exitosa");
      }
    } else {
      console.log("Entro acacc");
    }
    this.getProyects();
    this.getUsers();
  }

  getProyects = () => {
    axios
      .get(
        sessionStorage.getItem("api") +
          "api/proyecto/organizacion/" +
          sessionStorage.getItem("idOrganizacion")
      )
      .then((resonse) => {
        this.setState({
          proyects: resonse.data,
        });
      })
      .catch((error) => {
        this.setState({
          proyects: this.proyects,
        });
      });
  };

  getUsers = () => {
    axios
      .get(
        sessionStorage.getItem("api") +
          "api/usuario/organizacion/" +
          sessionStorage.getItem("idOrganizacion")
      )
      .then((resonse) => {
        this.setState({
          users: resonse.data,
        });
      })
      .catch((error) => {
        this.setState({
          users: this.usuarios,
        });
      });
  };

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
        <div class="organization-info-body">
          <div class="organization-user-text-name">
            {user.nombre}&nbsp;{user.apellido}
          </div>
          <div class="organization-user-text-rol">
            <b>Rol:</b> {user.rol}
          </div>
          <div class="organization-user-text-state">
            <b>Estado:</b> {user.estado}
          </div>

          <div class="organization-proyect-edit">
            {user.rol != "Administrador" ? (
              <AiFillEdit
                id="delete-icon-general"
                onClick={this.goToEditUser.bind(this, user)}
              ></AiFillEdit>
            ) : null}
          </div>

          <div class="organization-proyect-delete">
            {user.rol != "Administrador" ? (
              <AiFillDelete
                id="delete-icon-general"
                onClick={this.assignUserToDelete.bind(this, user)}
              ></AiFillDelete>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );

  projectRows = ({ proyects }) => (
    <div class="body-container-overflow-organization">
      {proyects.map((proyect) => (
        <div class="organization-info-body-proyect">
          <div class="organization-proyect-text-name">{proyect.nombre}</div>
          <div class="organization-proyect-text-state">
            <b>Estado: </b>
            <br />
            <p>{proyect.estado}</p>
          </div>
          <div class="organization-proyect-text-date-2">
            <b>Ultima Modificación:</b> {proyect.fechaModificacion}
          </div>

          <div class="organization-proyect-edit">
            <AiFillEdit
              id="delete-icon-general"
              onClick={this.goToProyectInfo.bind(this, proyect)}
            ></AiFillEdit>
          </div>

          <div class="organization-proyect-delete">
            <AiFillDelete
              id="delete-icon-general"
              onClick={this.assignProyectToDelete.bind(this, proyect)}
            ></AiFillDelete>
          </div>
        </div>
      ))}
    </div>
  );

  assignProyectToDelete = (proyect) => {
    this.setState({
      modalDeleteProyect: !this.state.modalDeleteProyect,
      proyectToDelete: proyect,
    });
  };

  assignUserToDelete = (user) => {
    this.setState({
      modalDeleteUser: !this.state.modalDeleteUser,
      userToDelete: user,
    });
  };

  hanldeModalDeleteProyect = () => {
    this.setState({
      modalDeleteProyect: !this.state.modalDeleteProyect,
    });
  };

  hanldeModalDeleteUser = () => {
    this.setState({
      modalDeleteUser: !this.state.modalDeleteUser,
    });
  };

  deleteProyect = () => {
    axios
      .get(
        sessionStorage.getItem("api") +
          "api/proyecto/delete/" +
          this.state.proyectToDelete.idProyecto
      )
      .then((response) => {
        this.getProyects();
        this.props.applyTime("Se elimino el proyecto de forma exitosa");
        this.setState({
          modalDeleteProyect: false,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  deleteUser = () => {
    axios
      .get(
        sessionStorage.getItem("api") +
          "api/usuario/delete/" +
          this.state.userToDelete.idUsuario
      )
      .then((response) => {
        this.getUsers();
        this.props.applyTime("Se elimino el usuario de forma exitosa");
        this.setState({
          modalDeleteUser: false,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
              <this.projectRows
                proyects={this.state.proyects}
              ></this.projectRows>
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
              <this.userRows users={this.state.users}></this.userRows>
            </div>
          </div>
        </div>

        <Modal
          show={this.state.modalDeleteProyect}
          onHide={this.hanldeModalDeleteProyect}
        >
          <Modal.Header>
            <Modal.Title>Eliminar Proyecto</Modal.Title>
            <AiFillCloseCircle
              id="btn-close"
              onClick={this.hanldeModalDeleteProyect}
            ></AiFillCloseCircle>
          </Modal.Header>
          <Modal.Body>
            ¿Esta seguro que desea eliminar este proyecto?
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={this.hanldeModalDeleteProyect}
              className="secondary-button-color secondary-button-size"
            >
              Cancelar
            </Button>
            <Button
              variant="primary"
              onClick={this.deleteProyect}
              className="primary-button-color primary-button-size"
            >
              Aceptar
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={this.state.modalDeleteUser}
          onHide={this.hanldeModalDeleteUser}
        >
          <Modal.Header>
            <Modal.Title>Eliminar Usuario</Modal.Title>
            <AiFillCloseCircle
              id="btn-close"
              onClick={this.hanldeModalDeleteUser}
            ></AiFillCloseCircle>
          </Modal.Header>
          <Modal.Body>¿Esta seguro que desea eliminar este usuario?</Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={this.hanldeModalDeleteUser}
              className="secondary-button-color secondary-button-size"
            >
              Cancelar
            </Button>
            <Button
              variant="primary"
              onClick={this.deleteUser}
              className="primary-button-color primary-button-size"
            >
              Aceptar
            </Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}

export default withRouter(OrganizationManagement);
