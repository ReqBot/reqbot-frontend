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

class Proyects extends Component {
  state = {
    proyectsShowed: [],
    isHidden: false,
  };

  dummyText =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla congue congue nulla, sed ultricies lacus tincidunt sit amet. Vivamus semper eros lorem. Sed facilisis vulputate massa, quis elementum leo sagittis non. Aliquam  facilisis mollis dolor id ullamcorper. Phasellus cursus nunc ut eros rutrum vulputate. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum libero justo, ornare quis cursus ut, luctus sed diam.";

  constructor(props) {
    super(props);
    this.getAlert = this.getAlert.bind(this);
  }

  componentDidMount() {
    this.props.setClick(this.getAlert);

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
    }, 5000);

    return () => {
      clearTimeout(timeId);
    };
  }

  goDetailProject = (proyectIndex) => {
    this.props.history.push({
      pathname: "/dashboard/analyst",
      megastate: { proyect: proyectIndex },
    });
  };

  proyects = [
    {
      nombre: "carritOS",
      fechaModificacion: "8/14/2021",
      etiqueta: "Movil",
      estado: "En Progreso",
      numeroDeHistorias: "5",
      numeroUsuarios: "4",
      descripcion: this.dummyText,
    },
    {
      nombre: "Cubi Pools",
      fechaModificacion: "5/10/2020",
      etiqueta: "Web",
      estado: "En Progreso",
      numeroDeHistorias: "4",
      numeroUsuarios: "5",
      descripcion: this.dummyText,
    },
    {
      nombre: "MF DOOM",
      fechaModificacion: "2/11/2020",
      etiqueta: "Movil",
      estado: "En Progreso",
      numeroDeHistorias: "8",
      numeroUsuarios: "6",
      descripcion: "",
    },
    {
      nombre: "Proyect Manhattan",
      fechaModificacion: "9/16/2019",
      etiqueta: "Web",
      estado: "Finalizado",
      numeroDeHistorias: "10",
      numeroUsuarios: "3",
      descripcion: "",
    },
    {
      nombre: "Americas Most Blunted",
      fechaModificacion: "12/24/2018",
      etiqueta: "Movil",
      estado: "Finalizado",
      numeroDeHistorias: "15",
      numeroUsuarios: "4",
      descripcion: this.dummyText,
    },
    {
      nombre: "carritOS 2",
      fechaModificacion: "11/29/2018",
      etiqueta: "Movil",
      estado: "Finalizado",
      numeroDeHistorias: "14",
      numeroUsuarios: "5",
      descripcion: this.dummyText,
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

  render() {
    return (
      <React.Fragment>
        <div class="proyects-div">
          {this.state.isHidden ? (
            <Alert variant={"danger"}>
              {" "}
              <FaHandsHelping id="helpingHandIcon"></FaHandsHelping>
              Debe elegir un proyecto para continuar.{" "}
            </Alert>
          ) : null}
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

export default withRouter(Proyects);
