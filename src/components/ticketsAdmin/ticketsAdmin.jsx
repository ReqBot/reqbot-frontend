import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Card from "react-bootstrap/Card";
import "./ticketsAdmin.css";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import { FaSearch } from "react-icons/fa";

class TicketsAdmin extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }
  componentDidMount() {}

  mockTickets = [
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
              <div class="ticket-text-block-2">
                {" "}
                {userstory.tipo}
                <br></br>
                {userstory.descripcion}
              </div>

              <div class="ticket-text-block-3">
                {userstory.estado}
                <br></br>
                <div className="bottom-text-tickets">
                  <b>Enviado por: </b>

                  {userstory.creadoPor}
                </div>
              </div>

              <div class="ticket-text-block-4">
                <Button id="aprobar-ticket">Aprobar</Button>
              </div>
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );

  render() {
    return (
      <React.Fragment>
        <div class="organization-titleDiv">
          <h1>Tickets</h1>
        </div>
        <div class="top-search-div">
          <InputGroup id="input-tickets" className="mb-3">
            <FaSearch id="seach-icon"></FaSearch>
            <FormControl
              placeholder="Buscar"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              id="search-userStories"
            />
          </InputGroup>
          <Button id="crear-ticket">Nuevo</Button>
        </div>
        <div class="div-tickets">
          <this.ticketsRow HUS={this.mockTickets}></this.ticketsRow>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(TicketsAdmin);
