import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Pagination from "react-bootstrap/Pagination";
import "./proyects.css";

class Proyects extends Component {
  state = {
    proyectsShowed: [],
  };

  componentDidMount() {
    if (this.proyects.length > 4) {
      this.setState({
        proyectsShowed: this.proyects.slice(0, 4),
      });
    } else {
      this.setState({
        proyectsShowed: this.proyects,
      });
    }
  }

  index = 0;

  proyects = [
    {
      nombre: "carritOS",
      fechaModificacion: "8/14/2021",
      etiqueta: "Movil",
      estado: "En Progreso",
      numeroDeHistorias: "5",
      numeroUsuarios: "4",
    },
    {
      nombre: "Cubi Pools",
      fechaModificacion: "5/10/2020",
      etiqueta: "Web",
      estado: "En Progreso",
      numeroDeHistorias: "4",
      numeroUsuarios: "5",
    },
    {
      nombre: "MF DOOM",
      fechaModificacion: "2/11/2020",
      etiqueta: "Movil",
      estado: "En Progreso",
      numeroDeHistorias: "8",
      numeroUsuarios: "6",
    },
    {
      nombre: "Proyect Manhattan",
      fechaModificacion: "9/16/2019",
      etiqueta: "Web",
      estado: "Finalizado",
      numeroDeHistorias: "10",
      numeroUsuarios: "3",
    },
    {
      nombre: "Americas Most Blunted",
      fechaModificacion: "12/24/2018",
      etiqueta: "Movil",
      estado: "Finalizado",
      numeroDeHistorias: "15",
      numeroUsuarios: "4",
    },
    {
      nombre: "carritOS 2",
      fechaModificacion: "11/29/2018",
      etiqueta: "Movil",
      estado: "Finalizado",
      numeroDeHistorias: "14",
      numeroUsuarios: "5",
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
        proyectsShowed: this.filterFunction(this.proyects, e.target.value),
      });
    } else {
      this.setState({
        proyectsShowed: this.proyects,
      });
    }
  };

  previosPage = () => {
    if (this.index - 4 >= 0) {
      this.index = this.index - 4;
      console.log(this.index);
      this.setState({
        proyectsShowed: this.proyects.slice(this.index, this.index + 4),
      });
    }
  };

  nextPage = () => {
    if (this.index + 4 < this.proyects.length) {
      this.index = this.index + 4;
      if (this.index + 4 > this.proyects.length) {
        this.setState({
          proyectsShowed: this.proyects.slice(this.index, this.proyects.length),
        });
      } else {
        this.setState({
          proyectsShowed: this.proyects.slice(this.index, this.index + 4),
        });
      }
    }
  };

  CardProyect = ({ proyectsEntry }) => (
    <div class="flex-div">
      {proyectsEntry.map((proyect) => (
        <div>
          <Card className="proyectCard">
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

  render() {
    return (
      <React.Fragment>
        <div class="proyects-div">
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
      </React.Fragment>
    );
  }
}

export default Proyects;
