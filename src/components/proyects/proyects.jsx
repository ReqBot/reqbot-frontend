import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Pagination from "react-bootstrap/Pagination";
import "./proyects.css";
import Alert from "react-bootstrap/Alert";
import { FaHandsHelping, FaSearchMinus, FaUserAlt } from "react-icons/fa";
import { withRouter } from "react-router-dom";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { AiFillCloseCircle } from "react-icons/ai";
import { BiMessageAltError } from "react-icons/bi";
import { RiFileHistoryFill } from "react-icons/ri";
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
    tipo: "",

    emptyProyects: false,
    emptyProyectsSearch: false,
  };

  searchBarInput = "";
  flagSearchBar = false;
  flagFilter = false;
  index = 0;

  dummyText =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla congue congue nulla, sed ultricies lacus tincidunt sit amet. Vivamus semper eros lorem. Sed facilisis vulputate massa, quis elementum leo sagittis non. Aliquam  facilisis mollis dolor id ullamcorper. Phasellus cursus nunc ut eros rutrum vulputate. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum libero justo, ornare quis cursus ut, luctus sed diam.";

  constructor(props) {
    super(props);
    this.getAlert = this.getAlert.bind(this);
    console.log(sessionStorage.getItem("idOrganizacion"));
  }

  componentDidMount() {
    this.props.setClick(this.getAlert);
    this.getProyects();
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };

  getProyects = () => {
    if (sessionStorage.getItem("rol") == "Administrador") {
      axios
        .get(
          sessionStorage.getItem("api") +
            "api/proyecto/organizacion/" +
            sessionStorage.getItem("idOrganizacion")
        )
        .then((resonse) => {
          console.log(resonse);
          this.setState(
            {
              proyectsReal: resonse.data,
              proyectsNoFilters: resonse.data,
            },
            () => {
              if (this.state.proyectsReal != null) {
                if (this.state.proyectsReal.length == 0) {
                  this.setState({
                    emptyProyects: true,
                  });
                }
              }
            }
          );

          this.setPagination();
        })
        .catch((error) => {
          this.setState(
            {
              proyectsReal: this.proyects,
              proyectsNoFilters: this.proyects,
            },
            () => {
              if (this.state.proyectsReal != null) {
                if (this.state.proyectsReal.length == 0) {
                  this.setState({
                    emptyProyects: true,
                  });
                }
              }
            }
          );
          this.setPagination();
        });
    } else {
      axios
        .get(
          sessionStorage.getItem("api") +
            "api/proyecto/usuarios/" +
            sessionStorage.getItem("idUsuario")
        )
        .then((resonse) => {
          console.log(resonse);
          this.setState(
            {
              proyectsReal: resonse.data,
              proyectsNoFilters: resonse.data,
            },
            () => {
              if (this.state.proyectsReal != null) {
                if (this.state.proyectsReal.length == 0) {
                  this.setState({
                    emptyProyects: true,
                  });
                }
              }
            }
          );

          this.setPagination();
        })
        .catch((error) => {
          this.setState(
            {
              proyectsReal: this.proyects,
              proyectsNoFilters: this.proyects,
            },
            () => {
              if (this.state.proyectsReal != null) {
                if (this.state.proyectsReal.length == 0) {
                  this.setState({
                    emptyProyects: true,
                  });
                }
              }
            }
          );
          this.setPagination();
        });
    }
  };

  setPagination() {
    if (this.state.proyectsReal.length > 0) {
      this.setState({
        emptyProyects: false,
        emptyProyectsSearch: false,
      });
      if (this.state.proyectsReal.length > 4) {
        this.setState({
          proyectsShowed: this.state.proyectsReal.slice(0, 4),
        });
      } else {
        this.setState({
          proyectsShowed: this.state.proyectsReal,
        });
      }
    } else {
      if (this.flagFilter || this.flagSearchBar) {
        this.setState({
          emptyProyects: false,
          emptyProyectsSearch: true,
        });
      } else {
        this.setState({
          emptyProyects: true,
          emptyProyectsSearch: false,
        });
      }
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
    if (sessionStorage.getItem("rol") == "Cliente") {
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

  proyects = [];

  filterFunction = (objects, value) => {
    var filteredObjects = [];
    var lowerCaseName = "";
    for (const i in objects) {
      lowerCaseName = objects[i].nombre.toLowerCase();
      if (lowerCaseName.includes(value.toLowerCase())) {
        filteredObjects.push(objects[i]);
      }
    }
    return filteredObjects;
  };

  editSearchTerm = (e) => {
    this.searchBarInput = e.target.value;
    if (e.target.value != "") {
      this.flagSearchBar = true;
      this.applyAllFilters();
    } else {
      this.flagSearchBar = false;
      this.applyAllFilters();
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

  etiquetasCols = ({ etiquetas }) => (
    <div class="etiqueta-div">
      {etiquetas.map((etiqueta) => (
        <p>etiqueta</p>
      ))}
    </div>
  );

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
                {proyect.fechaModificacion.slice(0, 10)}
              </Card.Subtitle>
              <Card.Text>
                <div className="tag-proyects">
                  <p>
                    <b>
                      {" "}
                      Tipo: <br />
                    </b>
                    {proyect.etiqueta}
                  </p>
                </div>
              </Card.Text>
            </Card.Body>
            <Card.Body>
              <div class="pi-div">
                <div class="pi-div-element">
                  {" "}
                  <RiFileHistoryFill class="pi-div-icon"></RiFileHistoryFill>
                  <p>
                    <b> Historias de usuario: &nbsp;</b>
                    {proyect.numeroDeHistorias}
                  </p>
                </div>
                <div class="pi-div-element">
                  {" "}
                  <FaUserAlt class="pi-div-icon"></FaUserAlt>
                  <p>
                    <b> Usuarios: &nbsp;</b>
                    {proyect.numeroUsuarios}
                  </p>
                </div>
              </div>
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
      this.setState({
        checkBoxOne: !this.state.checkBoxOne,
      });
    }
    if (name == "checkBoxTwo") {
      this.setState({
        checkBoxTwo: !this.state.checkBoxTwo,
      });
    }
  };

  deleteFilters = () => {
    this.flagFilter = false;
    this.setState(
      {
        modalFilterOrder: !this.state.modalFilterOrder,
        checkBoxOne: false,
        checkBoxTwo: false,
        tipo: "",
      },
      () => {
        this.applyAllFilters();
      }
    );
  };

  applyFilters = () => {
    if (
      this.state.checkBoxOne ||
      this.state.checkBoxTwo ||
      this.state.tipo != ""
    ) {
      this.flagFilter = true;
    } else {
      this.flagFilter = false;
    }

    this.applyAllFilters();
    this.setState({
      modalFilterOrder: !this.state.modalFilterOrder,
    });
  };

  applyFiltersFunc = (toGetFiltered) => {
    var proyectsAux = [];
    var proyectsReturn = [];

    if (this.state.checkBoxOne) {
      toGetFiltered = this.filterByCondition("Activo", "estado", toGetFiltered);
      //proyectsReturn.push(...proyectsAux);
    }
    if (this.state.checkBoxTwo) {
      toGetFiltered = this.filterByCondition(
        "Inactivo",
        "estado",
        toGetFiltered
      );
      //proyectsReturn.push(...proyectsAux);
    }
    if (this.state.tipo != "") {
      toGetFiltered = this.filterByCondition(
        this.state.tipo,
        "tipo",
        toGetFiltered
      );
      //proyectsReturn.push(...proyectsAux);
    }

    return toGetFiltered;
  };

  applyAllFilters = () => {
    var toGetFiltered = this.state.proyectsNoFilters;

    if (this.flagSearchBar) {
      toGetFiltered = this.filterFunction(toGetFiltered, this.searchBarInput);
    }
    if (this.flagFilter) {
      toGetFiltered = this.applyFiltersFunc(toGetFiltered);
    }

    this.setState(
      {
        proyectsReal: toGetFiltered,
      },
      () => {
        this.setPagination();
      }
    );
  };

  filterByCondition = (condition, type, toGetFiltered) => {
    var filteredObjects = [];
    var auxLowerCase = "";
    if (type == "estado") {
      for (const i in toGetFiltered) {
        if (toGetFiltered[i].estado == condition) {
          filteredObjects.push(toGetFiltered[i]);
        }
      }
    }
    if (type == "tipo") {
      console.log(this.state.tipo);
      console.log(toGetFiltered);
      for (const i in toGetFiltered) {
        auxLowerCase = toGetFiltered[i].etiqueta.toLowerCase();
        console.log(auxLowerCase);
        if (auxLowerCase.includes(condition.toLowerCase())) {
          filteredObjects.push(toGetFiltered[i]);
        }
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

          {this.state.emptyProyectsSearch && !this.state.emptyProyects ? (
            <div class="no-proyects">
              <div class="inner-message-no-proyects">
                {" "}
                <FaSearchMinus className="inner-message-no-proyects-icon"></FaSearchMinus>
                <p>No existe ningún proyecto con esos parámetros</p>
              </div>
            </div>
          ) : null}

          {this.state.emptyProyects && !this.state.emptyProyectsSearch ? (
            <div class="no-proyects">
              <div class="inner-message-no-proyects">
                {" "}
                <BiMessageAltError className="inner-message-no-proyects-icon"></BiMessageAltError>
                <p>No se ha creado ningún proyecto todavía</p>
              </div>
            </div>
          ) : null}

          {!this.state.emptyProyects && !this.state.emptyProyectsSearch ? (
            <this.CardProyect
              proyectsEntry={this.state.proyectsShowed}
            ></this.CardProyect>
          ) : null}
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

                <Form.Group className="mb-3" controlId="formBasicCheckbox2">
                  <Form.Check
                    type="checkbox"
                    label="Inactivo"
                    name="checkBoxTwo"
                    onClick={this.handleClick}
                    checked={this.state.checkBoxTwo}
                  />
                </Form.Group>
              </div>
              <div class="proyect-input-filter">
                <p>Tipo:</p>
                <InputGroup className="mb-3 login-input">
                  <FormControl
                    type="text"
                    name="tipo"
                    value={this.state.tipo}
                    onChange={this.handleChange}
                  />
                </InputGroup>
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
