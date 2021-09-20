import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Pagination from "react-bootstrap/Pagination";
import "./proyects.css";
import Alert from "react-bootstrap/Alert";
import { FaHandsHelping } from "react-icons/fa";
import { withRouter } from "react-router-dom";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { AiFillCloseCircle } from "react-icons/ai";
import Form from "react-bootstrap/Form";

class Proyects extends Component {
  state = {
    proyectsNoFilters: [],
    proyectsReal: [],
    proyectsShowed: [],
    isHidden: false,
    modalFilterOrder: false,

    checkBoxOne: false,
    checkBoxTwo: false,
  };

  index = 0;

  dummyText =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla congue congue nulla, sed ultricies lacus tincidunt sit amet. Vivamus semper eros lorem. Sed facilisis vulputate massa, quis elementum leo sagittis non. Aliquam  facilisis mollis dolor id ullamcorper. Phasellus cursus nunc ut eros rutrum vulputate. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum libero justo, ornare quis cursus ut, luctus sed diam.";

  constructor(props) {
    super(props);
    this.getAlert = this.getAlert.bind(this);
  }

  componentDidMount() {
    this.props.setClick(this.getAlert);
    this.getProyects();
  }

  getProyects = () => {
    axios
      .get("http://localhost:5000/api/proyecto/organizacion/" + "1")
      .then((resonse) => {
        this.setState({
          proyectsReal: resonse.data,
          proyectsNoFilters: resonse.data,
        });

        this.setPagination();
      })
      .catch((error) => {
        this.setState({
          proyectsReal: this.proyects,
          proyectsNoFilters: this.proyects,
        });
        this.setPagination();
      });
  };

  setPagination() {
    if (this.state.proyectsReal.length > 4) {
      this.setState({
        proyectsShowed: this.state.proyectsReal.slice(0, 4),
      });
    } else {
      this.setState({
        proyectsShowed: this.state.proyectsReal,
      });
    }
  }

  getAlert() {
    this.setState({
      isHidden: true,
    });

    this.useEffect();
  }

  useEffect() {
    const timeId = setTimeout(() => {
      // After 3 seconds set the show value to false
      this.setState({
        isHidden: false,
      });
    }, 3000);

    return () => {
      clearTimeout(timeId);
    };
  }

  goDetailProject = (proyectIndex) => {
    if (sessionStorage.getItem("rol") == "client") {
      this.props.history.push({
        pathname: "/dashboard/redactar",
        megastate: { proyect: proyectIndex },
      });
    } else {
      this.props.history.push({
        pathname: "/dashboard/analyst",
        megastate: { proyect: proyectIndex },
      });
    }
  };

  proyects = [
    {
      idProyecto: 1,
      nombre: "CarritOS",
      fechaModificacion: "2021-07-09T05:00:00.000Z",
      etiqueta: "Web",
      estado: "Activo",
      numeroDeHistorias: 0,
      numeroUsuarios: 0,
      idOrganizacion: 1,
    },
    {
      idProyecto: 1,
      nombre: "CarritOS2",
      fechaModificacion: "2021-07-09T05:00:00.000Z",
      etiqueta: "Web",
      estado: "Activo",
      numeroDeHistorias: 0,
      numeroUsuarios: 0,
      idOrganizacion: 1,
    },
    {
      idProyecto: 1,
      nombre: "CarritOS3",
      fechaModificacion: "2021-07-09T05:00:00.000Z",
      etiqueta: "Web",
      estado: "Inactivo",
      numeroDeHistorias: 0,
      numeroUsuarios: 0,
      idOrganizacion: 1,
    },
  ];

  filterFunction = (objects, value) => {
    var filteredObjects = [];
    for (const i in objects) {
      if (objects[i].nombre.includes(value)) {
        filteredObjects.push(objects[i]);
      }
    }
    filteredObjects = filteredObjects.slice(0, 4);
    return filteredObjects;
  };

  editSearchTerm = (e) => {
    if (e.target.value != null) {
      this.setState({
        proyectsShowed: this.filterFunction(
          this.state.proyectsReal,
          e.target.value
        ),
      });
    } else {
      this.setState({
        proyectsShowed: this.state.proyectsReal,
      });
    }
  };

  previosPage = () => {
    if (this.index - 4 >= 0) {
      this.index = this.index - 4;
      console.log(this.index);
      this.setState({
        proyectsShowed: this.state.proyectsReal.slice(
          this.index,
          this.index + 4
        ),
      });
    }
  };

  nextPage = () => {
    if (this.index + 4 < this.state.proyectsReal.length) {
      this.index = this.index + 4;
      if (this.index + 4 > this.state.proyectsReal.length) {
        this.setState({
          proyectsShowed: this.state.proyectsReal.slice(
            this.index,
            this.state.proyectsReal.length
          ),
        });
      } else {
        this.setState({
          proyectsShowed: this.state.proyectsReal.slice(
            this.index,
            this.index + 4
          ),
        });
      }
    }
  };

  handleFilterOrder = () => {
    this.setState({
      modalFilterOrder: !this.state.modalFilterOrder,
    });
  };

  CardProyect = ({ proyectsEntry }) => (
    <div class="flex-div">
      {proyectsEntry.map((proyect) => (
        <div>
          <Card
            className="proyectCard"
            onClick={this.goDetailProject.bind(this, proyect)}
          >
            <Card.Body>
              <Card.Title className="title">{proyect.nombre}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Ultima Modificacion:
              </Card.Subtitle>
              <Card.Subtitle className="subtitle">
                {proyect.fechaModificacion}
              </Card.Subtitle>
              <Card.Text>
                <div>
                  <b>eti1</b>
                  <b>eti2</b>
                </div>
              </Card.Text>
            </Card.Body>
            <Card.Body>
              <Card.Link href="#">Historias</Card.Link>
              <Card.Link href="#">Usuarios</Card.Link>
              <Card.Link href="#">Estado</Card.Link>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );

  handleClick = (event) => {
    const target = event.target;
    const name = target.name;

    if (name == "checkBoxOne") {
      console.log(1);
      this.setState({
        checkBoxOne: !this.state.checkBoxOne,
      });
    }
    if (name == "checkBoxTwo") {
      console.log(2);
      this.setState({
        checkBoxTwo: !this.state.checkBoxTwo,
      });
    }
  };

  deleteFilters = () => {
    this.setState(
      {
        proyectsReal: this.state.proyectsNoFilters,
      },
      () => {
        this.setPagination();
        this.setState({
          modalFilterOrder: !this.state.modalFilterOrder,
        });
      }
    );
  };

  applyFilters = () => {
    this.setState(
      {
        proyectsReal: [],
      },
      () => {
        if (this.state.checkBoxOne) {
          this.state.proyectsReal.push(this.filterByCondition("Activo"));
        }
        if (this.state.checkBoxTwo) {
          this.state.proyectsReal.push(this.filterByCondition("Inactivo"));
        }
        this.setPagination();
        this.setState({
          modalFilterOrder: !this.state.modalFilterOrder,
        });
      }
    );
  };

  filterByCondition = (condition) => {
    var filteredObjects = [];

    for (const i in this.state.proyectsNoFilters) {
      if (this.state.proyectsNoFilters[i].estado == condition) {
        filteredObjects.push(this.state.proyectsNoFilters[i]);
      }
    }
    return filteredObjects;
  };

  render() {
    return (
      <React.Fragment>
        <div class="proyects-div">
          <Alert variant={"danger"} show={this.state.isHidden}>
            {" "}
            <FaHandsHelping id="helpingHandIcon"></FaHandsHelping>
            Debe elegir un proyecto para continuar.{" "}
          </Alert>
          <div class="header-proyectos">
            <h1>Proyectos</h1>
            <div class="searchbar-div">
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Buscar"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  onChange={this.editSearchTerm}
                />
                <Button id="button-search">Buscar</Button>
              </InputGroup>
            </div>
          </div>

          <div class="div-pagination">
            <Button
              id="filtrar-ordenar-button"
              onClick={this.handleFilterOrder}
            >
              Filtrar/Ordenar
            </Button>
            <Pagination>
              <Pagination.Prev onClick={this.previosPage} />
              <Pagination.Next onClick={this.nextPage} />
            </Pagination>
          </div>
          <div>
            <this.CardProyect
              proyectsEntry={this.state.proyectsShowed}
            ></this.CardProyect>
          </div>
        </div>

        <Modal
          show={this.state.modalFilterOrder}
          onHide={this.handleFilterOrder}
          id="settings-info-user"
        >
          <Modal.Header>
            <Modal.Title>Filtrar/Ordenar</Modal.Title>
            <AiFillCloseCircle
              id="btn-close"
              onClick={this.handleFilterOrder}
            ></AiFillCloseCircle>
          </Modal.Header>
          <Modal.Body>
            <div>
              <b>Filtrar por</b>
              <div className="check-line">
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    label="Activo"
                    name="checkBoxOne"
                    onClick={this.handleClick}
                    checked={this.state.checkBoxOne}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    label="Inactivo"
                    name="checkBoxTwo"
                    onClick={this.handleClick}
                    checked={this.state.checkBoxTwo}
                  />
                </Form.Group>
              </div>
            </div>
            <div>
              <b>Ordenar Por</b>
              <Form.Select aria-label="Estado" id="proyect-info-select-filter">
                <option></option>
                <option value="1">Id</option>
                <option value="1">Fecha de Modificación</option>
                <option value="2">Nombre</option>
              </Form.Select>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              id="boton-cerrar-modal"
              onClick={this.deleteFilters}
            >
              Limpiar
            </Button>
            <Button
              variant="primary"
              id="boton-guardar-modal"
              onClick={this.applyFilters}
            >
              Aplicar
            </Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}

export default withRouter(Proyects);
