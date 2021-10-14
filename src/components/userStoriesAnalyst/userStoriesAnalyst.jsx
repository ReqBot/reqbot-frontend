import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import "./userStoriesAnalyst.css";
import { FaSearch, FaSearchMinus } from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Form from "react-bootstrap/Form";
import { BiMessageAltError } from "react-icons/bi";

class UserStoriesAnalyst extends Component {
  state = {
    useStoriesNoFilter: [],
    useStories: [],
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

    modalFilterOrder: false,

    ordernarPor: "",
    checkBoxOne: false,
    checkBoxTwo: false,
    rol: "",

    emptyUserStories: false,
    emptyUserStoriesSearch: false,

    userStoriesOrdered: [],
  };

  searchBarInput = "";
  flagSearchBar = false;
  flagFilter = false;

  constructor(props) {
    super(props);
    this.openAndSetApprove = this.openAndSetApprove.bind(this);
  }

  componentDidMount() {
    this.getUserStories();
  }

  setPagination() {
    if (this.state.useStories.length > 0) {
      this.setState({
        emptyUserStories: false,
        emptyUserStoriesSearch: false,
      });
      if (this.state.useStories.length > 4) {
        this.setState({
          userStoriesShowed: this.state.useStories.slice(0, 4),
        });
      } else {
        this.setState({
          userStoriesShowed: this.state.useStories,
        });
      }
    } else {
      if (this.flagFilter || this.flagSearchBar) {
        this.setState({
          emptyUserStories: false,
          emptyUserStoriesSearch: true,
        });
      } else {
        this.setState({
          emptyUserStories: true,
          emptyUserStoriesSearch: false,
        });
      }
    }
  }
  getUserStories = () => {
    axios
      .get(
        sessionStorage.getItem("api") +
          "api/historiausuario/project/" +
          this.props.proyect.idProyecto
      )
      .then((resonse) => {
        console.log(resonse);
        this.setState(
          {
            useStories: resonse.data,
            useStoriesNoFilter: resonse.data,
          },
          () => {
            if (this.state.useStories.length == 0) {
              this.setState({
                emptyUserStories: true,
              });
            } else {
              //this.flagFilter = true;
              this.applyAllFilters();
            }
          }
        );
      })
      .catch((error) => {
        this.setState(
          {
            useStories: this.userStories,
            useStoriesNoFilter: this.userStories,
          },
          () => {
            if (this.state.useStories.length == 0) {
              this.setState({
                emptyUserStories: true,
              });
            } else {
              //this.flagFilter = true;
              this.applyAllFilters();
            }
          }
        );
        console.log(error);
      });
  };

  userStories = [];

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
        sessionStorage.getItem("api") +
          "api/historiausuario/" +
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

  handleFilterOrder = () => {
    this.setState({
      modalFilterOrder: !this.state.modalFilterOrder,
    });
  };

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
        rol: "",
        ordernarPor: "",
        userStoriesOrdered: [],
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
      this.state.rol != ""
    ) {
      this.flagFilter = true;
    } else {
      this.flagFilter = false;
    }

    if (this.state.ordernarPor != "") {
      if (this.state.ordernarPor == "nombre-a") {
        axios
          .get(
            sessionStorage.getItem("api") + "api/historiausuario/ascendente"
            //sessionStorage.getItem("idOrganizacion"))
          )
          .then((response) => {
            this.setState(
              {
                userStoriesOrdered: response.data,
              },
              () => {
                this.applyAllFilters();
                this.setState({
                  modalFilterOrder: !this.state.modalFilterOrder,
                });
              }
            );
          })
          .catch((error) => {
            console.log("Error en obtener Logs ordenados");
          });
      }
      if (this.state.ordernarPor == "nombre-d") {
        axios
          .get(
            sessionStorage.getItem("api") + "api/historiausuario/descendente"
            //sessionStorage.getItem("idOrganizacion"))
          )
          .then((response) => {
            this.setState(
              {
                userStoriesOrdered: response.data,
              },
              () => {
                this.applyAllFilters();
                this.setState({
                  modalFilterOrder: !this.state.modalFilterOrder,
                });
              }
            );
          })
          .catch((error) => {
            console.log("Error en obtener Logs ordenados");
          });
      }
    } else {
      this.applyAllFilters();
      this.setState({
        modalFilterOrder: !this.state.modalFilterOrder,
      });
    }
  };

  applyFiltersFunc = (toGetFiltered) => {
    var userStoriesAux = [];
    var userStoriesReturn = [];

    if (this.state.checkBoxOne) {
      toGetFiltered = this.filterByCondition(
        "Aprobado",
        "estado",
        toGetFiltered
      );
      //userStoriesReturn.push(...userStoriesAux);
    }
    if (this.state.checkBoxTwo) {
      toGetFiltered = this.filterByCondition(
        "Pendiente",
        "estado",
        toGetFiltered
      );
      //userStoriesReturn.push(...userStoriesAux);
    }
    if (this.state.rol != "") {
      toGetFiltered = this.filterByCondition(
        this.state.rol,
        "tipo",
        toGetFiltered
      );
      //userStoriesReturn.push(...userStoriesAux);
    }
    return toGetFiltered;
  };

  applyAllFilters = () => {
    var toGetFiltered = this.state.useStoriesNoFilter;

    if (this.flagSearchBar) {
      toGetFiltered = this.filterFunction(toGetFiltered, this.searchBarInput);
      console.log(toGetFiltered);
    }
    if (this.flagFilter) {
      toGetFiltered = this.applyFiltersFunc(toGetFiltered);
      console.log(toGetFiltered);
    }

    this.setState(
      {
        useStories: toGetFiltered,
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
      for (const i in toGetFiltered) {
        auxLowerCase = toGetFiltered[i].rol.toLowerCase();
        if (auxLowerCase.includes(condition)) {
          filteredObjects.push(toGetFiltered[i]);
        }
      }
    }

    return filteredObjects;
  };

  render() {
    return (
      <React.Fragment>
        <div>
          <div class="header-proyectos-analyst">
            <div class="searchbar-div-userStories">
              <Button
                id="filtrar-ordenar-button-userStory"
                onClick={this.handleFilterOrder}
              >
                Filtrar/Ordenar
              </Button>
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

          {this.state.emptyUserStoriesSearch && !this.state.emptyUserStories ? (
            <div class="no-proyects">
              <div class="inner-message-no-proyects">
                {" "}
                <FaSearchMinus className="inner-message-no-proyects-icon"></FaSearchMinus>
                <p>No existe ninguna historia de usuario con esos parámetros</p>
              </div>
            </div>
          ) : null}

          {this.state.emptyUserStories && !this.state.emptyUserStoriesSearch ? (
            <div class="no-proyects">
              <div class="inner-message-no-proyects">
                {" "}
                <BiMessageAltError className="inner-message-no-proyects-icon"></BiMessageAltError>
                <p>Todavía no existen Historias de Usuario</p>
              </div>
            </div>
          ) : null}

          {!this.state.emptyUserStories &&
          !this.state.emptyUserStoriesSearch ? (
            <div class="overflow-analyst">
              <this.Test UserStories={this.state.userStoriesShowed}></this.Test>
            </div>
          ) : null}
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
                    label="Aprobado"
                    name="checkBoxOne"
                    onClick={this.handleClick}
                    checked={this.state.checkBoxOne}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCheckbox2">
                  <Form.Check
                    type="checkbox"
                    label="Pendiente"
                    name="checkBoxTwo"
                    onClick={this.handleClick}
                    checked={this.state.checkBoxTwo}
                  />
                </Form.Group>
              </div>
              <div class="proyect-input-filter">
                <p>Rol:</p>
                <InputGroup className="mb-3 login-input">
                  <FormControl
                    type="text"
                    name="rol"
                    value={this.state.rol}
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

export default UserStoriesAnalyst;
