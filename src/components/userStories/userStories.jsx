import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import "./userStories.css";
import { FaSearch, FaSearchMinus } from "react-icons/fa";
import axios from "axios";
import { FiMoreVertical } from "react-icons/fi";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { AiFillCloseCircle } from "react-icons/ai";
import Form from "react-bootstrap/Form";
import Pagination from "react-bootstrap/Pagination";
import { BiMessageAltError } from "react-icons/bi";

class UserStories extends Component {
  state = {
    useStoriesNoFilter: [],
    useStories: [],
    userStoriesShowed: [],
    modalFilterOrder: false,

    checkBoxOne: true,
    checkBoxTwo: false,
    rol: "",

    modalDetail: false,
    userStorySelected: [],

    emptyUserStories: false,
    emptyUserStoriesSearch: false,

    evos: [
      {
        idHistoriaUsuario: 4,
        nombre: "Historia 4",
        rol: "Cliente",
      },
      {
        idHistoriaUsuario: 5,
        nombre: "Historia 4",
        rol: "Cliente",
      },
      {
        idHistoriaUsuario: 5,
        nombre: "Historia 4",
        rol: "Cliente",
      },
      {
        idHistoriaUsuario: 5,
        nombre: "Historia 4",
        rol: "Cliente",
      },
      {
        idHistoriaUsuario: 5,
        nombre: "Historia 4",
        rol: "Cliente",
      },
    ],
  };

  searchBarInput = "";
  flagSearchBar = false;
  flagFilter = false;
  index = 0;

  componentDidMount() {
    this.getUserStories();
  }

  getUserStories = () => {
    axios
      .get(
        sessionStorage.getItem("api") +
          "api/proyecto/organizacion/" +
          sessionStorage.getItem("idOrganizacion")
      )
      .then((resonse) => {
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
              this.flagFilter = true;
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
              this.flagFilter = true;
              this.applyAllFilters();
            }
          }
        );
        console.log(error);
      });
  };

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

  handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };

  userStories = [];

  HU = ({ HUS }) => (
    <div class="flex-div-userStories">
      {HUS.map((userstory) => (
        <div>
          <Card
            className="userCard"
            onClick={this.handleDetailSendUserStory.bind(this, userstory)}
          >
            <Card.Body>
              <div className="card-top-div">
                <div className="card-top-div-left">
                  <Card.Title className="title">{userstory.nombre}</Card.Title>
                </div>
                <div className="card-top-div-right">
                  <FiMoreVertical id="more-icon"></FiMoreVertical>
                </div>
              </div>
              <Card.Text className="text">
                <div>
                  <b>Como &nbsp;</b>
                  {userstory.rol}
                  <b>&nbsp;quiero &nbsp;</b>
                  {userstory.funcionalidad}
                  <b>&nbsp;para &nbsp;</b>
                  {userstory.resultado}
                </div>
              </Card.Text>
            </Card.Body>
            <Card.Body>
              <div className="card-footer-div">
                <div className="card-footer-div-left">
                  <p>
                    <b>Estado: &nbsp;</b> {userstory.estado}
                  </p>
                </div>
                <div className="card-footer-div-right">
                  <p>
                    <b>Ultima Modificación: &nbsp;</b>{" "}
                    {userstory.fechaModificacion}
                  </p>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );

  previosPage = () => {
    if (this.index - 4 >= 0) {
      this.index = this.index - 4;
      this.setState({
        userStoriesShowed: this.state.useStories.slice(
          this.index,
          this.index + 4
        ),
      });
    }
  };

  nextPage = () => {
    if (this.index + 4 < this.state.useStories.length) {
      this.index = this.index + 4;
      if (this.index + 4 > this.state.useStories.length) {
        this.setState({
          userStoriesShowed: this.state.useStories.slice(
            this.index,
            this.state.useStories.length
          ),
        });
      } else {
        this.setState({
          userStoriesShowed: this.state.useStories.slice(
            this.index,
            this.index + 4
          ),
        });
      }
    }
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

  handleDetailSendUserStory = (UserStoryIndex) => {
    this.setState(
      {
        userStorySelected: UserStoryIndex,
      },
      () => {
        this.handleDetail();
      }
    );
  };

  evolutionRows = ({ evolutions }) => (
    <div class="evolution-div">
      {evolutions.map((evo) => (
        <div class="version">
          <div class="version-element-1">
            <b>Como&nbsp; </b> {evo.rol} <b>quiero &nbsp;</b>
            {evo.funcionalidad} <b>para que&nbsp;</b> {evo.resultado}{" "}
          </div>
          <div class="version-element-2">{evo.puntaje}</div>
          <div class="version-element-3">{evo.prioridad}</div>
          <div class="version-element-4">{evo.version}</div>
        </div>
      ))}
    </div>
  );

  handleDetail = () => {
    console.log(this.state.userStorySelected);
    if (!this.state.modalDetail) {
      axios
        .get(
          sessionStorage.getItem("api") +
            "api/historiausuario/identificador/" +
            this.state.userStorySelected.identificador
        )
        .then((resonse) => {
          console.log("REEE");
          console.log(resonse);
          this.setState({
            evos: resonse.data,
          });
        })
        .catch((error) => {
          console.log(error);
        });

      this.setState({
        modalDetail: !this.state.modalDetail,
      });
    } else {
      this.setState({
        modalDetail: !this.state.modalDetail,
      });
    }
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
    this.setState(
      {
        useStories: this.state.useStoriesNoFilter,
      },
      () => {
        this.setPagination();
        this.setState({
          modalFilterOrder: !this.state.modalFilterOrder,
          checkBoxOne: false,
          checkBoxTwo: false,
          rol: "",
        });
      }
    );
  };

  deleteFilters = () => {
    this.flagFilter = false;
    this.setState(
      {
        modalFilterOrder: !this.state.modalFilterOrder,
        checkBoxOne: false,
        checkBoxTwo: false,
        rol: "",
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

    this.applyAllFilters();
    this.setState({
      modalFilterOrder: !this.state.modalFilterOrder,
    });
  };

  applyFiltersFunc = (toGetFiltered) => {
    var userStoriesAux = [];
    var userStoriesReturn = [];

    if (this.state.checkBoxOne) {
      userStoriesAux = this.filterByCondition(
        "Aprobado",
        "estado",
        toGetFiltered
      );
      userStoriesReturn.push(...userStoriesAux);
    }
    if (this.state.checkBoxTwo) {
      userStoriesAux = this.filterByCondition(
        "Pendiente",
        "estado",
        toGetFiltered
      );
      userStoriesReturn.push(...userStoriesAux);
    }
    if (this.state.rol != "") {
      userStoriesAux = this.filterByCondition(
        this.state.rol,
        "tipo",
        toGetFiltered
      );
      userStoriesReturn.push(...userStoriesAux);
    }
    return userStoriesReturn;
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
          <div class="header-proyectos">
            <div class="searchbar-div-userStories">
              <Button
                id="filtrar-ordenar-button-userStory"
                onClick={this.handleFilterOrder}
              >
                Filtrar/Ordenar
              </Button>
              <Button id="filtrar-ordenar-button-userStory">Exportar</Button>
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

              <Pagination>
                <Pagination.Prev onClick={this.previosPage} />
                <Pagination.Next onClick={this.nextPage} />
              </Pagination>
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
            <this.HU HUS={this.state.userStoriesShowed}></this.HU>
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

        <Modal
          show={this.state.modalDetail}
          onHide={this.handleDetail}
          contentClassName="user-story-detail-modal"
          keyboard={true}
          centered={true}
          size="xl"
        >
          <div class="user-story-detail-div">
            <div class="header-modal-us-detail">
              <h3>{this.state.userStorySelected.nombre}</h3>
              <h4>{this.state.userStorySelected.version} &nbsp;v</h4>
            </div>
            <div class="body-modal-us-detail-1">
              <p>
                <b>Como</b> {this.state.userStorySelected.rol} <b>quiero</b>{" "}
                {this.state.userStorySelected.funcionalidad} <br />
                <b>para</b> {this.state.userStorySelected.resultado}
              </p>
            </div>
            <div class="body-modal-us-detail-2">
              <p>
                <b>Ultima Modificación: </b>
                <br /> {this.state.userStorySelected.fechaModificacion}
                <br />
                Por {this.state.userStorySelected.modificadoPor}
              </p>
            </div>

            <div class="body-modal-us-detail-middle">
              <Button id="edit-delete-detail">Editar</Button>
              <Button id="edit-delete-detail">Eliminar</Button>
            </div>

            <div class="footer-modal-us-detail">
              <h3>Evolucion</h3>
              <this.evolutionRows
                evolutions={this.state.evos}
              ></this.evolutionRows>
            </div>
          </div>
        </Modal>
      </React.Fragment>
    );
  }
}

export default UserStories;
