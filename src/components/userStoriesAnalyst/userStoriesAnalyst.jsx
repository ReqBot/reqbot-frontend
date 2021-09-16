import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import "./userStoriesAnalyst.css";
import { FaSearch } from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

class UserStoriesAnalyst extends Component {
  state = {
    userStoriesShowed: [],
    modalApprove: false,
    selectedUserStoryId: "",
    selectedUserStoryNombre: "",
    selectedUserStoryRol: "",
    selectedUserStoryFuncionalidad: "",
    selectedUserStoryResultado: "",
    selectedUserStoryFecha: "",
    selectedUserStoryModPor: "",
    selectedUserStoryIdProyecto: "",
    selectedUserStoryEstado: "",
  };

  constructor(props) {
    super(props);
    this.openAndSetApprove = this.openAndSetApprove.bind(this);
  }

  componentDidMount() {
    this.getUserStories();
  }

  getUserStories = () => {
    axios
      .get(
        "http://localhost:5000/api/historiausuario/pendientes/" +
          this.props.proyect.idProyecto
      )
      .then((resonse) => {
        this.setState({
          useStories: resonse.data,
          userStoriesShowed: resonse.data,
        });
      })
      .catch((error) => {
        this.setState({
          userStoriesShowed: this.userStories,
        });
      });
  };

  userStories = [
    {
      idHistoriaUsuario: 2,
      nombre: "Historia 2",
      rol: "Cliente",
      funcionalidad: "Loguearse con Apple",
      resultado: "Para tener facilidad de loguearse",
      fechaModificacion: "2021-07-09T05:00:00.000Z",
      modificadoPor: 1,
      idProyecto: 1,
      estado: "Aprobado",
    },
    {
      idHistoriaUsuario: 3,
      nombre: "Historia 3",
      rol: "Cliente",
      funcionalidad: "Loguearse con Apple",
      resultado: "Para tener facilidad de loguearse",
      fechaModificacion: "2021-07-09T05:00:00.000Z",
      modificadoPor: 1,
      idProyecto: 1,
      estado: "Aprobado",
    },
    {
      idHistoriaUsuario: 2,
      nombre: "Historia 2",
      rol: "Cliente",
      funcionalidad: "Loguearse con Apple",
      resultado: "Para tener facilidad de loguearse",
      fechaModificacion: "2021-07-09T05:00:00.000Z",
      modificadoPor: 1,
      idProyecto: 1,
      estado: "Aprobado",
    },
    {
      idHistoriaUsuario: 3,
      nombre: "Historia 3",
      rol: "Cliente",
      funcionalidad: "Loguearse con Apple",
      resultado: "Para tener facilidad de loguearse",
      fechaModificacion: "2021-07-09T05:00:00.000Z",
      modificadoPor: 1,
      idProyecto: 1,
      estado: "Aprobado",
    },
    {
      idHistoriaUsuario: 2,
      nombre: "Historia 2",
      rol: "Cliente",
      funcionalidad: "Loguearse con Apple",
      resultado: "Para tener facilidad de loguearse",
      fechaModificacion: "2021-07-09T05:00:00.000Z",
      modificadoPor: 1,
      idProyecto: 1,
      estado: "Aprobado",
    },
    {
      idHistoriaUsuario: 3,
      nombre: "Historia 3",
      rol: "Cliente",
      funcionalidad: "Loguearse con Apple",
      resultado: "Para tener facilidad de loguearse",
      fechaModificacion: "2021-07-09T05:00:00.000Z",
      modificadoPor: 1,
      idProyecto: 1,
      estado: "Aprobado",
    },
  ];

  filterFunction = (objects, value) => {
    var filteredObjects = [];
    for (const i in objects) {
      if (objects[i].call.includes(value)) {
        filteredObjects.push(objects[i]);
      }
    }

    return filteredObjects;
  };

  editSearchTerm = (e) => {
    if (e.target.value != null) {
      this.setState({
        userStoriesShowed: this.filterFunction(
          this.userStories,
          e.target.value
        ),
      });
    } else {
      this.setState({
        userStoriesShowed: this.userStories,
      });
    }
  };

  openAndSetApprove = (HUIndexed) => {
    this.setState({
      modalApprove: !this.state.modalApprove,

      selectedUserStoryId: HUIndexed.idHistoriaUsuario,
      selectedUserStoryNombre: HUIndexed.nombre,
      selectedUserStoryRol: HUIndexed.rol,
      selectedUserStoryFuncionalidad: HUIndexed.funcionalidad,
      selectedUserStoryResultado: HUIndexed.resultado,
      selectedUserStoryFecha: HUIndexed.fechaModificacion,
      selectedUserStoryModPor: HUIndexed.modificadoPor,
      selectedUserStoryIdProyecto: HUIndexed.idProyecto,
      selectedUserStoryEstado: HUIndexed.estado,
    });
  };

  hanldeApprove = () => {
    this.setState({
      modalApprove: !this.state.modalApprove,
    });
  };

  getAlert() {
    this.props.handleAlert();

    this.useEffect();
  }

  useEffect() {
    const timeId = setTimeout(() => {
      this.props.handleAlert();
    }, 3000);

    return () => {
      clearTimeout(timeId);
    };
  }

  approveUserStory = () => {
    const headers = {};

    let jsonSent = {
      nombre: this.state.selectedUserStoryNombre,
      rol: this.state.selectedUserStoryRol,
      funcionalidad: this.state.selectedUserStoryFuncionalidad,
      resultado: this.state.selectedUserStoryResultado,
      fechaModificacion: this.state.selectedUserStoryFecha,
      modificadoPor: this.state.selectedUserStoryModPor,
      idProyecto: this.state.selectedUserStoryIdProyecto,
      estado: "Aprobado",
    };

    axios
      .put(
        "http://localhost:5000/api/historiausuario/" +
          this.state.selectedUserStoryId,
        jsonSent,
        {
          headers: headers,
        }
      )
      .then((response) => {
        console.log(response.data);
        this.hanldeApprove();
        this.getAlert();
        this.getUserStories();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  Test = ({ UserStories }) => (
    <div class="flex-div-userStories-analyst">
      {UserStories.map((USRTORY) => (
        <Card className="userCard-analyst">
          <Card.Body id="card-body-analyst">
            <div class="left-part-card-analyst">
              <Card.Title className="title">{USRTORY.nombre}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Como {USRTORY.rol}
              </Card.Subtitle>
              <Card.Subtitle className="mb-2 text-muted">
                Quiero {USRTORY.funcionalidad}
              </Card.Subtitle>
              <Card.Subtitle className="mb-2 text-muted">
                Para {USRTORY.resultado}
              </Card.Subtitle>
            </div>
            <div class="right-part-card-analyst">
              <Button
                id="aprobar-button"
                onClick={this.openAndSetApprove.bind(this, USRTORY)}
              >
                Aprobar
              </Button>
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );

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
        <div>
          <div class="header-proyectos-analyst">
            <div class="searchbar-div-userStories-analyst">
              <InputGroup id="input-userStories" className="mb-3">
                <FaSearch id="seach-icon"></FaSearch>
                <FormControl
                  placeholder="Buscar"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  onChange={this.editSearchTerm}
                  id="search-userStories"
                />
              </InputGroup>
            </div>
          </div>
          <div class="overflow-analyst">
            <this.Test UserStories={this.state.userStoriesShowed}></this.Test>
          </div>
        </div>

        <Modal
          show={this.state.modalApprove}
          onHide={this.hanldeApprove}
          id="settings-info-user"
        >
          <Modal.Header>
            <Modal.Title>Aprobar historia de usuario</Modal.Title>
            <AiFillCloseCircle
              id="btn-close"
              onClick={this.hanldeApprove}
            ></AiFillCloseCircle>
          </Modal.Header>
          <Modal.Body>
            <div>
              <b>Como</b>
              <InputGroup className="mb-3 login-input">
                <FormControl
                  aria-label="Apellido"
                  aria-describedby="basic-addon1"
                  defaultValue={this.state.selectedUserStoryRol}
                  name="selectedUserStoryRol"
                  onChange={this.handleChange}
                />
              </InputGroup>
            </div>
            <div>
              <b>Quiero</b>
              <InputGroup className="mb-3 login-input">
                <FormControl
                  aria-label="Apellido"
                  aria-describedby="basic-addon1"
                  defaultValue={this.state.selectedUserStoryFuncionalidad}
                  name="selectedUserStoryFuncionalidad"
                  onChange={this.handleChange}
                />
              </InputGroup>
            </div>
            <div>
              <b>Para que</b>
              <InputGroup className="mb-3 login-input">
                <FormControl
                  aria-label="Apellido"
                  aria-describedby="basic-addon1"
                  defaultValue={this.state.selectedUserStoryResultado}
                  name="selectedUserStoryResultado"
                  onChange={this.handleChange}
                />
              </InputGroup>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={this.hanldeApprove}
              id="boton-cerrar-modal"
            >
              Cancelar
            </Button>
            <Button
              variant="primary"
              onClick={this.approveUserStory}
              id="boton-guardar-modal"
            >
              Aprobar
            </Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}

export default UserStoriesAnalyst;
