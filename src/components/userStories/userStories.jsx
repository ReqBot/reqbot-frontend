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
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { saveAs } from "file-saver";
import JSZip from "jszip";

class UserStories extends Component {
  state = {
    useStoriesNoFilter: [],
    useStories: [],
    userStoriesShowed: [],
    modalFilterOrder: false,
    modalDelete: false,

    ordernarPor: "",
    checkBoxOne: false,
    checkBoxTwo: false,
    rol: "",

    modalDetail: false,
    userStorySelected: [],

    emptyUserStories: false,
    emptyUserStoriesSearch: false,

    userStoriesOrdered: [],

    modalEdit: false,
    selectedUserStoryId: "",
    selectedUserStoryNombre: "",
    selectedUserStoryRol: "",
    selectedUserStoryFuncionalidad: "",
    selectedUserStoryResultado: "",
    selectedUserStoryFecha: "",
    selectedUserStoryModPor: "",
    selectedUserStoryIdProyecto: "",
    selectedUserStoryEstado: "",
    selectedUserStoryPrioridad: "",
    selectedUserStoryPuntaje: "",

    evos: [],
  };

  searchBarInput = "";
  flagSearchBar = false;
  flagFilter = false;
  index = 0;

  componentDidMount() {
    this.getUserStories();
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }

  getUserStories = () => {
    axios
      .get(
        sessionStorage.getItem("api") +
          "api/historiausuario/project/" +
          this.props.proyect.idProyecto
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
    if (!this.state.modalDetail) {
      axios
        .get(
          sessionStorage.getItem("api") +
            "api/historiausuario/identificador/" +
            this.state.userStorySelected.identificador
        )
        .then((resonse) => {
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
            sessionStorage.getItem("api") +
              "api/historiausuario/ascendente/" +
              this.props.proyect.idProyecto
          )
          .then((response) => {
            console.log(response);
            this.setState(
              {
                userStoriesOrdered: response.data,
              },
              () => {
                this.applyAllFilters();
                this.setState({
                  modalFilterOrder: !this.state.modalFilterOrder,
                });

                console.log(this.state.userStoriesOrdered);
              }
            );
          })
          .catch((error) => {});
      }
      if (this.state.ordernarPor == "nombre-d") {
        axios
          .get(
            sessionStorage.getItem("api") +
              "api/historiausuario/ascendente/" +
              this.props.proyect.idProyecto
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
          .catch((error) => {});
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
    if (this.state.userStoriesOrdered.length == 0) {
      var toGetFiltered = this.state.useStoriesNoFilter;
    } else {
      var toGetFiltered = this.state.userStoriesOrdered;
    }

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

  getBase64ForOne = (data) => {
    var pdf = pdfMake.createPdf(data);

    return new Promise(async (resolve, reject) => {
      pdf.getBase64((content) => {
        resolve(content);
      });
    });
  };

  exportStories = () => {
    axios
      .get(
        sessionStorage.getItem("api") +
          "api/historiausuario/download/project/" +
          this.props.proyect.idProyecto
      )
      .then((response) => {
        console.log(response.data);
        var zip = new JSZip();
        var pdf = pdfMake.createPdf(response.data);
        var dataFormat64 = [];
        //Create folder
        var folderUh = zip.folder("pdfHistories");
        for (let uh in response.data) {
          let pdffile = this.getBase64ForOne(response.data[uh]);
          dataFormat64.push(pdffile);
          folderUh.file(`pdf0${uh}.pdf`, pdffile, { base64: true });
        }
        var nombreArchivo = "HU-" + this.props.proyect.nombre;
        //Zip generate the file comprim
        zip.generateAsync({ type: "blob" }).then(function (data) {
          saveAs(data, nombreArchivo + "zip");
        });

        console.log(dataFormat64);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  hanldeSettings = () => {
    this.setState({
      modalDelete: !this.state.modalDelete,
    });
  };

  handleDeleteAndMore = () => {
    this.setState({
      modalDelete: !this.state.modalDelete,
      modalDetail: !this.state.modalDetail,
    });
  };

  handleEditAndMore = () => {
    this.setState({
      modalEdit: !this.state.modalEdit,
      modalDetail: !this.state.modalDetail,

      selectedUserStoryId: this.state.userStorySelected.idHistoriaUsuario,
      selectedUserStoryNombre: this.state.userStorySelected.nombre,
      selectedUserStoryRol: this.state.userStorySelected.rol,
      selectedUserStoryFuncionalidad:
        this.state.userStorySelected.funcionalidad,
      selectedUserStoryResultado: this.state.userStorySelected.resultado,
      selectedUserStoryFecha: this.state.userStorySelected.fechaModificacion,
      selectedUserStoryModPor: this.state.userStorySelected.modificadoPor,
      selectedUserStoryIdProyecto: this.state.userStorySelected.idProyecto,
      selectedUserStoryEstado: this.state.userStorySelected.estado,
      selectedUserStoryPrioridad: this.state.userStorySelected.prioridad,
      selectedUserStoryPuntaje: this.state.userStorySelected.puntaje,
    });
  };

  hanldeApprove = () => {
    this.setState({
      modalEdit: !this.state.modalEdit,
    });
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
              <Button
                id="filtrar-ordenar-button-userStory"
                onClick={this.exportStories}
              >
                Exportar
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
              <Form.Select
                aria-label="Estado"
                id="proyect-info-select-filter"
                onClick={this.handleChange}
                name="ordernarPor"
              >
                <option>Eliga</option>
                <option value="nombre-a">Nombre ascendente</option>
                <option value="nombre-d">Nombre descendente</option>
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
            <div class="closing-button-div">
              <AiFillCloseCircle
                id="btn-close"
                onClick={this.handleDetail}
              ></AiFillCloseCircle>
            </div>
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

            {this.state.userStorySelected.estado == "Aprobado" ? (
              <div class="body-modal-us-detail-middle">
                <Button
                  id="edit-delete-detail"
                  onClick={this.handleEditAndMore}
                >
                  Editar
                </Button>
                <Button
                  id="edit-delete-detail"
                  onClick={this.handleDeleteAndMore}
                >
                  Eliminar
                </Button>
              </div>
            ) : null}

            <div class="footer-modal-us-detail">
              <h3>Evolucion</h3>
              <this.evolutionRows
                evolutions={this.state.evos}
              ></this.evolutionRows>
            </div>
          </div>
        </Modal>

        <Modal
          show={this.state.modalDelete}
          onHide={this.hanldeSettings}
          id="settings-info-user"
        >
          <Modal.Header>
            <Modal.Title>Eliminar Historia de usuario</Modal.Title>
            <AiFillCloseCircle
              id="btn-close"
              onClick={this.hanldeSettings}
            ></AiFillCloseCircle>
          </Modal.Header>
          <Modal.Body>
            ¿Esta seguro que desea eliminar esta historia de usuario?
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

        <Modal
          show={this.state.modalEdit}
          onHide={this.hanldeApprove}
          id="settings-info-user"
        >
          <Modal.Header>
            <Modal.Title>Editar historia de usuario</Modal.Title>
            <AiFillCloseCircle
              id="btn-close"
              onClick={this.hanldeApprove}
            ></AiFillCloseCircle>
          </Modal.Header>
          <Modal.Body>
            <div>
              <b>Nombre</b>
              <InputGroup className="mb-3 login-input">
                <FormControl
                  aria-label="Apellido"
                  aria-describedby="basic-addon1"
                  defaultValue={this.state.selectedUserStoryNombre}
                  name="selectedUserStoryNombre"
                  onChange={this.handleChange}
                />
              </InputGroup>
            </div>
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

            <div class="prioridad-puntaje-div">
              <div class="prioridad-inside">
                <b>Prioridad</b>
                <InputGroup className="mb-3 login-input">
                  <FormControl
                    aria-label="Apellido"
                    aria-describedby="basic-addon1"
                    defaultValue={this.state.selectedUserStoryPrioridad}
                    name="selectedUserStoryPrioridad"
                    onChange={this.handleChange}
                  />
                </InputGroup>
              </div>{" "}
              <div class="prioridad-inside">
                <b>Puntaje</b>
                <InputGroup className="mb-3 login-input">
                  <FormControl
                    aria-label="Apellido"
                    aria-describedby="basic-addon1"
                    defaultValue={this.state.selectedUserStoryPuntaje}
                    name="selectedUserStoryPuntaje"
                    onChange={this.handleChange}
                  />
                </InputGroup>
              </div>
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
              Guardar
            </Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}

export default UserStories;
