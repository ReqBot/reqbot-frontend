import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./infoProyect.css";
import UserInfoProyect from "./usersInfoProyect/usersInfoProyect";
import Alert from "react-bootstrap/Alert";

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
          <div class="descripcion-title">Descripción</div>
          <div class="descripcion">{this.props.proyect.descripcion}</div>

          <div class="info-users">
            {sessionStorage.getItem("rol") == "Administrador" ||
            sessionStorage.getItem("rol") == "Analista" ? (
              <UserInfoProyect
                proyect={this.props.proyect}
                makeAlert={this.props.makeAlert}
              ></UserInfoProyect>
            ) : null}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(InfoProyect);
