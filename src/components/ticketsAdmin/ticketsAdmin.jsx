import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Card from "react-bootstrap/Card";
import "./ticketsAdmin.css";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import { FaSearch, FaSearchMinus } from "react-icons/fa";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Form from "react-bootstrap/Form";
import { AiFillCloseCircle } from "react-icons/ai";
import { BiMessageAltError } from "react-icons/bi";
import Alert from "react-bootstrap/Alert";

class TicketsAdmin extends Component {
  state = {
    ticketsNoFilter: [],
    ticketsFilter: [],
    ticketsShowed: [],

    modalFilterOrder: false,
    checkBoxOne: false,
    checkBoxTwo: true,
    checkBoxThree: false,
    checkBoxFour: false,

    emptyTickets: false,
    emptyTicketsSearch: false,

    modalApprove: false,
    modalReject: false,

    topModalMessage: "",
    botModalMessage: "",
    buttonModalMessage: "",
    selectedTicket: undefined,
    newTicketState: "",

    alertHidden: false,
  };

  searchBarInput = "";
  flagSearchBar = false;
  flagFilter = false;

  constructor(props) {
    super(props);
    console.log(props);
  }
  componentDidMount() {
    this.getTickets();
  }

  getTickets = () => {
    axios
      .get(
        sessionStorage.getItem("api") +
          "api/ticket/organizacion/" +
          sessionStorage.getItem("idOrganizacion")
      )
      .then((resonse) => {
        this.setState(
          {
            ticketsShowed: resonse.data,
            ticketsFilter: resonse.data,
            ticketsNoFilter: resonse.data,
          },
          () => {
            if (this.state.ticketsFilter.length == 0) {
              this.setState({
                emptyTickets: true,
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
            ticketsShowed: this.mockTickets,
            ticketsFilter: this.mockTickets,
            ticketsNoFilter: this.mockTickets,
          },
          () => {
            if (this.state.ticketsFilter.length == 0) {
              this.setState({
                emptyTickets: true,
              });
            } else {
              this.flagFilter = true;
              this.applyAllFilters();
            }
          }
        );
      });
  };

  setPagination() {
    if (this.state.ticketsFilter.length > 0) {
      this.setState(
        {
          emptyTickets: false,
          emptyTicketsSearch: false,
        },
        () => {
          this.setState({
            ticketsShowed: this.state.ticketsFilter,
          });
        }
      );
    } else {
      if (this.flagFilter || this.flagSearchBar) {
        this.setState({
          emptyTickets: false,
          emptyTicketsSearch: true,
        });
      } else {
        this.setState({
          emptyTickets: true,
          emptyTicketsSearch: false,
        });
      }
    }
  }

  mockTickets = [];

  ticketsRow = ({ HUS }) => (
    <div class="flex-div-tickets">
      {HUS.map((userstory) => (
        <Card className="tickets-card">
          <Card.Body id="tickets-card-body">
            <div className="flex-div-tickets-text">
              <div class="ticket-text-block-1">
                <b>{userstory.titulo}</b>
                <br></br>
                <div className="bottom-text-tickets">
                  <b>Creación: </b>
                  {userstory.fecha}
                </div>
              </div>
              <div class="ticket-text-block-2-admin">
                <p>{userstory.descripcion}</p>
              </div>

              <div class="ticket-text-block-3-admin">{userstory.tipo}</div>

              <div class="ticket-text-block-4-buttons">
                <Button
                  id="aprobar-ticket"
                  onClick={this.openAndSetApprove.bind(
                    this,
                    userstory,
                    "resolver"
                  )}
                >
                  Resolver
                </Button>
              </div>
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );

  filterFunction = (objects, value) => {
    var filteredObjects = [];
    var lowerCaseName = "";
    for (const i in objects) {
      lowerCaseName = objects[i].titulo.toLowerCase();
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

  handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };

  handleFilterOrder = () => {
    this.setState({
      modalFilterOrder: !this.state.modalFilterOrder,
    });
  };

  deleteFilters = () => {
    this.flagFilter = false;
    this.setState(
      {
        modalFilterOrder: !this.state.modalFilterOrder,
        checkBoxOne: false,
        checkBoxTwo: false,
        checkBoxThree: false,
        checkBoxFour: false,
      },
      () => {
        this.applyAllFilters();
      }
    );
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
    if (name == "checkBoxThree") {
      this.setState({
        checkBoxThree: !this.state.checkBoxThree,
      });
    }
    if (name == "checkBoxFour") {
      this.setState({
        checkBoxFour: !this.state.checkBoxFour,
      });
    }
  };

  applyFilters = () => {
    if (
      this.state.checkBoxOne ||
      this.state.checkBoxTwo ||
      this.state.checkBoxThree ||
      this.state.checkBoxFour
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
    var ticketsAux = [];
    var ticketsReturn = [];
    if (this.state.checkBoxOne) {
      toGetFiltered = this.filterByCondition(
        "Resuelto",
        "estado",
        toGetFiltered
      );
      //ticketsReturn.push(...ticketsAux);
    }
    if (this.state.checkBoxTwo) {
      toGetFiltered = this.filterByCondition(
        "Pendiente",
        "estado",
        toGetFiltered
      );
      //ticketsReturn.push(...ticketsAux);
    }
    if (this.state.checkBoxThree) {
      toGetFiltered = this.filterByCondition("Tecnico", "tipo", toGetFiltered);
      //ticketsReturn.push(...ticketsAux);
    }
    if (this.state.checkBoxFour) {
      toGetFiltered = this.filterByCondition(
        "Entrenamiento",
        "tipo",
        toGetFiltered
      );
      //ticketsReturn.push(...ticketsAux);
    }

    return toGetFiltered;
  };

  applyAllFilters = () => {
    var toGetFiltered = this.state.ticketsNoFilter;

    if (this.flagSearchBar) {
      toGetFiltered = this.filterFunction(toGetFiltered, this.searchBarInput);
    }
    if (this.flagFilter) {
      toGetFiltered = this.applyFiltersFunc(toGetFiltered);
    }

    this.setState(
      {
        ticketsFilter: toGetFiltered,
      },
      () => {
        this.setPagination();
      }
    );
  };

  filterByCondition = (condition, type, toGetFiltered) => {
    var filteredObjects = [];
    if (type == "estado") {
      for (const i in toGetFiltered) {
        if (toGetFiltered[i].estado == condition) {
          filteredObjects.push(toGetFiltered[i]);
        }
      }
    }
    if (type == "tipo") {
      for (const i in toGetFiltered) {
        if (toGetFiltered[i].tipo == condition) {
          filteredObjects.push(toGetFiltered[i]);
        }
      }
    }

    return filteredObjects;
  };

  hanldeApprove = () => {
    this.setState({
      modalApprove: !this.state.modalApprove,
    });
  };

  openAndSetApprove = (ticketIndex, type) => {
    this.setState({
      selectedTicket: ticketIndex,
      modalApprove: !this.state.modalApprove,
      topModalMessage: "Resolver ticket",
      botModalMessage: "¿Estas seguro que deseas resolver este ticket?",
      buttonModalMessage: "Resolver",
    });
  };

  editTicket = () => {
    const headers = {};

    let jsonSent = {
      titulo: this.state.selectedTicket.titulo,
      fecha: new Date().toLocaleString(),
      tipo: this.state.selectedTicket.tipo,
      descripcion: this.state.selectedTicket.descripcion,
      estado: "Resuelto",
      creadoPor: this.state.selectedTicket.creadoPor,
    };
    console.log(jsonSent);
    axios
      .put(
        sessionStorage.getItem("api") +
          "api/ticket/" +
          this.state.selectedTicket.idTicket,
        jsonSent,
        {
          headers: headers,
        }
      )
      .then((response) => {
        console.log(response);

        this.hanldeApprove();
        this.getAlert();
        this.getUserStories();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getAlert() {
    this.setState({
      alertHidden: !this.state.alertHidden,
    });

    this.useEffect();
  }

  useEffect() {
    const timeId = setTimeout(() => {
      this.setState({
        alertHidden: !this.state.alertHidden,
      });
    }, 3000);

    return () => {
      clearTimeout(timeId);
    };
  }

  render() {
    return (
      <React.Fragment>
        <Alert variant={"success"} show={this.state.alertHidden}>
          {" "}
          Se aprobó la historia de usuario exitosamente.{" "}
        </Alert>
        <div class="organization-titleDiv">
          <h1>Tickets</h1>
        </div>
        <div class="top-search-div">
          {" "}
          <Button
            id="filtrar-ordenar-button-userStory"
            onClick={this.handleFilterOrder}
          >
            Filtrar/Ordenar
          </Button>
          <InputGroup id="input-tickets" className="mb-3">
            <FaSearch id="seach-icon"></FaSearch>
            <FormControl
              placeholder="Buscar"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              id="search-userStories"
              onChange={this.editSearchTerm}
            />
          </InputGroup>
        </div>

        {this.state.emptyTicketsSearch && !this.state.emptyTickets ? (
          <div class="no-proyects">
            <div class="inner-message-no-proyects">
              {" "}
              <FaSearchMinus className="inner-message-no-proyects-icon"></FaSearchMinus>
              <p>No existe ningún ticket con esos parámetros</p>
            </div>
          </div>
        ) : null}

        {this.state.emptyTickets && !this.state.emptyTicketsSearch ? (
          <div class="no-proyects">
            <div class="inner-message-no-proyects">
              {" "}
              <BiMessageAltError className="inner-message-no-proyects-icon"></BiMessageAltError>
              <p>No se ha creado ningún ticket todavía</p>
            </div>
          </div>
        ) : null}

        {!this.state.emptyTickets && !this.state.emptyTicketsSearch ? (
          <div class="div-tickets">
            <this.ticketsRow HUS={this.state.ticketsShowed}></this.ticketsRow>
          </div>
        ) : null}

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
                    label="Resuelto"
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
              <div className="check-line">
                <Form.Group className="mb-3" controlId="formBasicCheckbox3">
                  <Form.Check
                    type="checkbox"
                    label="Tecnico"
                    name="checkBoxThree"
                    onClick={this.handleClick}
                    checked={this.state.checkBoxThree}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCheckbox4">
                  <Form.Check
                    type="checkbox"
                    label="Entrenamiento"
                    name="checkBoxFour"
                    onClick={this.handleClick}
                    checked={this.state.checkBoxFour}
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

        <Modal
          show={this.state.modalApprove}
          onHide={this.hanldeApprove}
          id="settings-info-user"
        >
          <Modal.Header>
            <Modal.Title>{this.state.topModalMessage}</Modal.Title>
            <AiFillCloseCircle
              id="btn-close"
              onClick={this.hanldeApprove}
            ></AiFillCloseCircle>
          </Modal.Header>
          <Modal.Body>
            <div class="modal-t-body">{this.state.botModalMessage}</div>
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
              onClick={this.editTicket}
              id="boton-guardar-modal"
            >
              {this.state.buttonModalMessage}
            </Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}

export default withRouter(TicketsAdmin);
