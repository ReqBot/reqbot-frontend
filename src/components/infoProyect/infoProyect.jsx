import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./infoProyect.css";
import Button from "react-bootstrap/Button";
import UserInfoProyect from "./usersInfoProyect/usersInfoProyect";

class InfoProyect extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }
  componentDidMount() {}

  render() {
    return (
      <React.Fragment>
        <div class="contenedor-info">
          <div class="fecha">
            <p class="sub-title">Fecha de modificación: &nbsp;</p>
            <p> {this.props.proyect.fechaModificacion}</p>
          </div>
          <div class="etiqueta">
            <p class="sub-title">Etiqueta: &nbsp;</p>
            <p> {this.props.proyect.etiqueta}</p>
          </div>
          <div class="estado">
            <p class="sub-title">Estado: &nbsp;</p>
            <p> {this.props.proyect.estado}</p>
          </div>

          <div class="descripcion">{this.props.proyect.descripcion}</div>
          <div class="button-div">
            <Button id="button-info">Editar</Button>
          </div>

          <div class="info-users">
            {" "}
            <UserInfoProyect></UserInfoProyect>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(InfoProyect);
