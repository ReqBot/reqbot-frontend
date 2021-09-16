import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Card from "react-bootstrap/Card";
import "./tickets.css";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import { FaSearch } from "react-icons/fa";

class Tickets extends Component {
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
      creadoPor: "Luis",
    },
    {
      titulo: "Ticket 2",
      fecha: "2021-07-09",
      tipo: "Tecnico",
      descripcion:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla congue congue nulla, sed ultricies lacus tincidunt sit amet. Vivamus semper eros lorem.",
      estado: "Pendiente",
      creadoPor: "Cesar",
    },
    {
      titulo: "Ticket 3",
      fecha: "2021-07-09",
      tipo: "Entrenamiento",
      descripcion:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla congue congue nulla, sed ultricies lacus tincidunt sit amet. Vivamus semper eros lorem.",
      estado: "Aprobado",
      creadoPor: "Luis",
    },
    {
      titulo: "Ticket 4",
      fecha: "2021-07-09",
      tipo: "Tecnico",
      descripcion:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla congue congue nulla, sed ultricies lacus tincidunt sit amet. Vivamus semper eros lorem.",
      estado: "Aprobado",
      creadoPor: "Cesar",
    },
    {
      titulo: "Ticket 3",
      fecha: "2021-07-09",
      tipo: "Entrenamiento",
      descripcion:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla congue congue nulla, sed ultricies lacus tincidunt sit amet. Vivamus semper eros lorem.",
      estado: "Aprobado",
      creadoPor: "Luis",
    },
    {
      titulo: "Ticket 4",
      fecha: "2021-07-09",
      tipo: "Tecnico",
      descripcion:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla congue congue nulla, sed ultricies lacus tincidunt sit amet. Vivamus semper eros lorem.",
      estado: "Aprobado",
      creadoPor: "Cesar",
    },
    {
      titulo: "Ticket 4",
      fecha: "2021-07-09",
      tipo: "Tecnico",
      descripcion:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla congue congue nulla, sed ultricies lacus tincidunt sit amet. Vivamus semper eros lorem.",
      estado: "Aprobado",
      creadoPor: "Cesar",
    },
    {
      titulo: "Ticket 4",
      fecha: "2021-07-09",
      tipo: "Tecnico",
      descripcion:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla congue congue nulla, sed ultricies lacus tincidunt sit amet. Vivamus semper eros lorem.",
      estado: "Aprobado",
      creadoPor: "Cesar",
    },
    {
      titulo: "Ticket 4",
      fecha: "2021-07-09",
      tipo: "Tecnico",
      descripcion:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla congue congue nulla, sed ultricies lacus tincidunt sit amet. Vivamus semper eros lorem.",
      estado: "Aprobado",
      creadoPor: "Cesar",
    },
    {
      titulo: "Ticket 4",
      fecha: "2021-07-09",
      tipo: "Tecnico",
      descripcion:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla congue congue nulla, sed ultricies lacus tincidunt sit amet. Vivamus semper eros lorem.",
      estado: "Aprobado",
      creadoPor: "Cesar",
    },
  ];

  ticketsRow = ({ HUS }) => (
    <div class="flex-div-tickets">
      {HUS.map((userstory) => (
        <Card className="tickets-card">
          <Card.Body id="tickets-card-body">
            <Card.Title className="title">{userstory.nombre}</Card.Title>

            <Card.Text className="text">
              <div>
                <b>{userstory.titulo}</b>
                {userstory.fecha}
                {userstory.tipo}
                {userstory.descripcion}
                {userstory.estado}
                {userstory.creadoPor}
              </div>
            </Card.Text>
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

export default withRouter(Tickets);
