import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import "./proyects.css";

class Proyects extends Component {
  stations = [
    { call: "station one", frequency: "000" },
    { call: "station two", frequency: "001" },
    { call: "station two", frequency: "001" },
    { call: "station two", frequency: "001" },
  ];

  Test = ({ stations }) => (
    <div class="flex-div">
      {stations.map((station) => (
        <div>
          <Card className="proyectCard">
            <Card.Body>
              <Card.Title className="title">Card Title</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Ultima Modificacion:
              </Card.Subtitle>
              <Card.Subtitle className="subtitle">12:30 am</Card.Subtitle>
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
        <div>
          <div class="header-proyectos">
            <h1>Proyectos</h1>
            <div class="searchbar-div">
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Buscar"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                />
                <Button id="button-search">Buscar</Button>
              </InputGroup>
            </div>
          </div>
          <div>
            <this.Test stations={this.stations}></this.Test>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Proyects;
