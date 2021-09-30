import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./editProyect.css";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import { BsPlusSquareFill } from "react-icons/bs";
import Modal from "react-bootstrap/Modal";
import { AiFillSetting, AiFillCloseCircle } from "react-icons/ai";

class EditProyect extends Component {
  state = {
    modalAddClient: false,
    modalAddAnalyst: false,
    modalDelete: false,
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
        <div class="proyect-edit-body" onClick={this.hanldeSettings}>
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

  handleAddClient = () => {
    if (!this.state.modalAddClient) {
      this.setState({
        usuariosShowed: this.usuarios,
      });
    }
    this.setState({
      usuariosShowed: this.usuarios,
      modalAddClient: !this.state.modalAddClient,
    });
  };

  handleAddAnalyst = () => {
    if (!this.state.modalAddAnalyst) {
      this.setState({
        usuariosShowed: this.usuarios,
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

  editProyect = () => {
    this.props.history.push({
      pathname: "/dashboard/organization/",
      megastate: { alert: "editProyect" },
    });
  };

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
                defaultValue={this.props.location.megastate.proyect.nombre}
              />
            </InputGroup>

            <h5>Etiquetas:</h5>
            <div class="etiqueta-div">
              <InputGroup className="mb-3 login-input">
                <FormControl
                  aria-label="Etiqueta"
                  aria-describedby="basic-addon1"
                />
              </InputGroup>
              <BsPlusSquareFill class="etiqueta-add"></BsPlusSquareFill>
            </div>
            <this.etiquetasRows etiquetas={this.etiquetas}>
              {" "}
            </this.etiquetasRows>

            <h5>Estado:</h5>
            <Form.Select aria-label="Estado" id="proyect-info-select">
              <option>Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>

            <h5>Descripción:</h5>
            <Form.Control
              aria-label="Descripcion"
              as="textarea"
              placeholder="Leave a comment here"
              style={{ height: "19%" }}
              defaultValue={this.props.location.megastate.proyect.descripcion}
            />
            <Button id="edit-button" onClick={this.editProyect}>
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
                  onClick={this.handleAddClient}
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
                  onClick={this.handleAddAnalyst}
                >
                  Agregar
                </Button>
              </div>{" "}
              <this.userRows users={this.usuarios}></this.userRows>
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
                onClick={this.hanldeSettings}
                id="boton-guardar-modal"
              >
                Si
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(EditProyect);
