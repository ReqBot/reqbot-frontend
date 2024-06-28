import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./editProyect.css";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import { BsPlusSquareFill } from "react-icons/bs";
import Modal from "react-bootstrap/Modal";
import { AiFillCloseCircle, AiFillDelete } from "react-icons/ai";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import { MdRemoveCircle } from "react-icons/md";

class EditProyect extends Component {
  state = {
    modalAddClient: false,
    modalAddAnalyst: false,
    modalDelete: false,
    usuariosShowed: [],

    etiquetaIndi: "",
    etiquetas: [],
    clientes: [],
    analistas: [],

    emptyClientes: true,
    emptyAnalistas: true,

    allClientes: [],
    allAnalistas: [],

    isHidden: false,
    alertMessage: "",

    userToDelete: "undefined",

    nombre: "",
    descripcion: "",
    estado: "",
    incompleteFields: false,
  };

  constructor(props) {
    super(props);
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
          this.props.location.megastate.proyect.idProyecto
      )
      .then((response) => {
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

  componentDidMount() {
    this.getAllUsers();
    this.getUsersByProyectId();

    this.stringSplitter(this.props.location.megastate.proyect.etiqueta);
    this.setState({
      nombre: this.props.location.megastate.proyect.nombre,
      descripcion: this.props.location.megastate.proyect.descripcion,
    });
  }

  stringSplitter = (etiquetasString) => {
    var fields = etiquetasString.split(";");

    this.setState({
      etiquetas: fields,
    });
  };

  addEtiqueta = () => {
    if (this.state.etiquetaIndi != "") {
      let newArr = this.state.etiquetas;
      newArr.push(this.state.etiquetaIndi);
      this.setState(
        {
          etiquetas: newArr,
        },
        () => {
          this.setState({
            etiquetaIndi: "",
          });
        }
      );
    }
  };

  removeEtiqueta = (index) => {
    let newArr = this.state.etiquetas;
    newArr.splice(index, 1);
    this.setState({
      etiquetas: newArr,
    });
  };

  etiquetasRows = ({ etiquetas }) => (
    <div class="etiquetas-list">
      {etiquetas.map((etiqueta) => (
        <div class="etiquetas-row">
          <p>{etiqueta} </p>
          <MdRemoveCircle
            class="etiqueta-delete"
            onClick={this.removeEtiqueta.bind(
              this,
              etiquetas.indexOf(etiqueta)
            )}
          >
            {" "}
          </MdRemoveCircle>
        </div>
      ))}
    </div>
  );

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
        this.applyTime("Se agrego el usuario al proyecto de forma exitosa");
        this.setState({
          modalAddClient: false,
          modalAddAnalyst: false,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  transformSemiColonsToArray = (input) => {
    var stringOfEtiquetas = "";
    for (const i in input) {
      if (i != input.length - 1) {
        stringOfEtiquetas = stringOfEtiquetas + input[i] + ";";
      } else {
        stringOfEtiquetas = stringOfEtiquetas + input[i];
      }
    }
    return stringOfEtiquetas;
  };

  editProyect = () => {
    if (
      this.state.nombre == "" ||
      this.state.descripcion == "" ||
      this.state.estado == "" ||
      this.state.etiquetas.length <= 0
    ) {
      this.setState({
        incompleteFields: true,
      });
    } else {
      const headers = {};

      let jsonSent = {
        nombre: this.state.nombre,
        fechaModificacion: new Date().toLocaleString("en-US"),
        etiqueta: this.transformSemiColonsToArray(this.state.etiquetas),
        descripcion: this.state.descripcion,
        estado: this.state.estado,
        numeroHistorias: "0",
        numeroUsuarios: "0",
        idOrganizacion: sessionStorage.getItem("idOrganizacion"),
      };

      axios
        .put(
          sessionStorage.getItem("api") +
            "api/proyecto/" +
            this.props.location.megastate.proyect.idProyecto,
          jsonSent,
          {
            headers: headers,
          }
        )
        .then((response) => {
          this.props.history.push({
            pathname: "/dashboard/organization/",
            megastate: { alert: "editProyect" },
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  applyTime = (message) => {
    this.setState(
      {
        isHidden: true,
        alertMessage: message,
      },
      () => {
        this.useEffect();
      }
    );
  };

  useEffect() {
    const timeId = setTimeout(() => {
      this.handleAlert();
    }, 3000);

    return () => {
      clearTimeout(timeId);
    };
  }

  handleAlert = () => {
    this.setState({
      isHidden: false,
    });
  };

  goBack = () => {
    this.props.history.push({
      pathname: "/dashboard/organization/",
    });
  };

  deleteUserFromProyect = () => {
    axios
      .delete(
        sessionStorage.getItem("api") +
          "api/usuarioproyecto/project/" +
          this.props.location.megastate.proyect.idProyecto +
          "/user/" +
          this.state.userToDelete.idUsuario
      )
      .then((response) => {
        this.getAllUsers();
        this.getUsersByProyectId();
        this.applyTime("Se elimino el usuario del proyecto de forma exitosa");
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

  render() {
    return (
      <React.Fragment>
        <Alert variant={"success"} show={this.state.isHidden}>
          {this.state.alertMessage}
        </Alert>
        <div class="header-proyect-admin">
          <div class="page-main-title">Editar Proyecto</div>
        </div>
        <div class="contenedor-proyect-admin">
          <div class="proyect-admin-left">
            <h5>Nombre:</h5>
            <InputGroup className="mb-3 login-input">
              <FormControl
                placeholder="Nombre"
                aria-label="Nombre"
                aria-describedby="basic-addon1"
                defaultValue={this.state.nombre}
                name="nombre"
                onChange={this.handleChange}
              />
            </InputGroup>

            <h5>Etiquetas:</h5>
            <div class="etiqueta-div">
              <InputGroup className="mb-3 login-input">
                <FormControl
                  aria-label="Etiqueta"
                  aria-describedby="basic-addon1"
                  value={this.state.etiquetaIndi}
                  name="etiquetaIndi"
                  onChange={this.handleChange}
                />
              </InputGroup>
              <BsPlusSquareFill
                class="etiqueta-add"
                onClick={this.addEtiqueta}
              ></BsPlusSquareFill>
            </div>
            <this.etiquetasRows etiquetas={this.state.etiquetas}>
              {" "}
            </this.etiquetasRows>

            <h5>Estado:</h5>
            <Form.Select
              aria-label="Estado"
              id="proyect-info-select"
              onClick={this.handleChange}
              name="estado"
            >
              <option>Eliga un Estado</option>
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </Form.Select>

            <h5>Descripción:</h5>
            <Form.Control
              aria-label="Descripcion"
              as="textarea"
              placeholder="Leave a comment here"
              style={{ height: "19%" }}
              defaultValue={this.state.descripcion}
              name="descripcion"
              onChange={this.handleChange}
            />

            <div class="create-user-buttons-div">
              <Button id="save-button" onClick={this.editProyect}>
                Guardar
              </Button>

              <Button id="save-button" onClick={this.goBack}>
                Cancelar
              </Button>
            </div>
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
              {!this.state.emptyClientes ? (
                <this.userRows users={this.state.clientes}></this.userRows>
              ) : null}
              {this.state.emptyClientes ? (
                <div class="empty-spacer"></div>
              ) : null}
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
              {!this.state.emptyAnalistas ? (
                <this.userRows users={this.state.analistas}></this.userRows>
              ) : null}
            </div>

            {this.state.incompleteFields ? (
              <div class="empty-edit">
                *Por favor, complete todos los campos
              </div>
            ) : null}
          </div>
        </div>
        <div>
          <Modal show={this.state.modalAddClient} onHide={this.handleAddClient}>
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

          <Modal show={this.state.modalDelete} onHide={this.hanldeSettings}>
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
                className="secondary-button-color secondary-button-size"
              >
                Cancelar
              </Button>
              <Button
                variant="primary"
                onClick={this.deleteUserFromProyect}
                className="primary-button-color primary-button-size"
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

export default withRouter(EditProyect);
