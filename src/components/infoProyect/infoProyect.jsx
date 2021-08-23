import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./infoProyect.css";

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
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(InfoProyect);
