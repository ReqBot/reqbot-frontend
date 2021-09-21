import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./logys.css";
import { AiFillCloseCircle } from "react-icons/ai";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import { FaSearch } from "react-icons/fa";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

class Logys extends Component {
  state = {
    logsNoFilter: [],
    logsFilter: [],
    logsShowed: [],

    modalFilterOrder: false,
    checkBoxOne: false,
    checkBoxTwo: false,
    checkBoxThree: false,
    checkBoxFour: false,
  };

  constructor(props) {
    super(props);
    console.log(props);
  }

  componentDidMount() {
    this.getLogs();
  }

  getLogs = () => {
    axios
      .get("http://localhost:5000/api/historiausuario/pendientes/" + "1")
      .then((resonse) => {
        this.setState({
          logsShowed: resonse.data,
          logsFilter: resonse.data,
          logsNoFilter: resonse.data,
        });
      })
      .catch((error) => {
        this.setState({
          logsShowed: this.mockLogs,
          logsFilter: this.mockLogs,
          logsNoFilter: this.mockLogs,
        });
      });
  };

  mockLogs = [
    {
      titulo: "Ticket 1",
      fecha: "2021-07-09",
      tipo: "Entrenamiento",
      descripcion:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla congue congue nulla, sed ultricies lacus tincidunt sit amet. Vivamus semper eros lorem.",
      estado: "Pendiente",
      creadoPor: "Luis Doe",
    },
    {
      titulo: "Ticket 2",
      fecha: "2021-07-09",
      tipo: "Tecnico",
      descripcion:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla congue congue nulla, sed ultricies lacus tincidunt sit amet. Vivamus semper eros lorem.",
      estado: "Pendiente",
      creadoPor: "Cesar Lopez",
    },
    {
      titulo: "Ticket 3",
      fecha: "2021-07-09",
      tipo: "Entrenamiento",
      descripcion:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla congue congue nulla, sed ultricies lacus tincidunt sit amet. Vivamus semper eros lorem.",
      estado: "Aprobado",
      creadoPor: "Luis Doe",
    },
    {
      titulo: "Ticket 4",
      fecha: "2021-07-09",
      tipo: "Tecnico",
      descripcion:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla congue congue nulla, sed ultricies lacus tincidunt sit amet. Vivamus semper eros lorem.",
      estado: "Aprobado",
      creadoPor: "Cesar Doe",
    },
    {
      titulo: "Ticket 3",
      fecha: "2021-07-09",
      tipo: "Entrenamiento",
      descripcion:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla congue congue nulla, sed ultricies lacus tincidunt sit amet. Vivamus semper eros lorem.",
      estado: "Aprobado",
      creadoPor: "Luis Doe",
    },
    {
      titulo: "Ticket 4",
      fecha: "2021-07-09",
      tipo: "Tecnico",
      descripcion:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla congue congue nulla, sed ultricies lacus tincidunt sit amet. Vivamus semper eros lorem.",
      estado: "Aprobado",
      creadoPor: "Cesar Doe",
    },
    {
      titulo: "Ticket 4",
      fecha: "2021-07-09",
      tipo: "Tecnico",
      descripcion:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla congue congue nulla, sed ultricies lacus tincidunt sit amet. Vivamus semper eros lorem.",
      estado: "Aprobado",
      creadoPor: "Cesar Doe",
    },
    {
      titulo: "Ticket 4",
      fecha: "2021-07-09",
      tipo: "Tecnico",
      descripcion:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla congue congue nulla, sed ultricies lacus tincidunt sit amet. Vivamus semper eros lorem.",
      estado: "Aprobado",
      creadoPor: "Cesar Doe",
    },
    {
      titulo: "Ticket 4",
      fecha: "2021-07-09",
      tipo: "Tecnico",
      descripcion:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla congue congue nulla, sed ultricies lacus tincidunt sit amet. Vivamus semper eros lorem.",
      estado: "Aprobado",
      creadoPor: "Cesar Doe",
    },
    {
      titulo: "Ticket 4",
      fecha: "2021-07-09",
      tipo: "Tecnico",
      descripcion:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla congue congue nulla, sed ultricies lacus tincidunt sit amet. Vivamus semper eros lorem.",
      estado: "Aprobado",
      creadoPor: "Cesar Doe",
    },
  ];

  logsRow = ({ HUS }) => (
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
              <div class="ticket-text-block-2">{userstory.descripcion}</div>

              <div class="ticket-text-block-3">
                {" "}
                {userstory.tipo}
                <br></br>
                <div className="bottom-text-tickets">
                  <b>Enviado por: </b>

                  {userstory.creadoPor}
                </div>
              </div>

              <div class="ticket-text-block-4">{userstory.estado}</div>
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );

  render() {
    return (
      <React.Fragment>
        <div class="header-proyect-admin">
          <h1>Logs</h1>
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
            />
          </InputGroup>
          <Button id="crear-ticket" onClick={this.newTicket}>
            Nuevo
          </Button>
        </div>
        <div class="div-tickets">
          <this.logsRow HUS={this.state.logsShowed}></this.logsRow>
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
      </React.Fragment>
    );
  }
}

export default withRouter(Logys);
