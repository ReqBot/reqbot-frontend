import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Tab, Tabs } from "react-bootstrap";
import "./organizationProfile.css";
import Button from "react-bootstrap/Button";

class OrganizationProfile extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }
  componentDidMount() {
    if (this.props.location.megastate) {
      if (this.props.location.megastate.alert == "alert") {
        this.props.applyTime("Se edito la información correctamente");
      }
    } else {
      console.log("Entro acacc");
    }
  }

  goToInfoEdit = () => {
    this.props.history.push({
      pathname: "/dashboard/organization/edit/info",
    });
  };

  render() {
    return (
      <React.Fragment>
        <div class="top-buttons-account">
          <div class="account-top-button">
            <div class="left-side"></div>
            <div class="inside-account-info">
              <h5>Información de cuenta</h5>
              <p>Nombre</p>
              <p>Idioma</p>
              <p>Color Primario</p>
              <p>Color Secundario</p>

              <Button id="edit-account-info" onClick={this.goToInfoEdit}>
                Editar
              </Button>
            </div>
          </div>
          <div class="account-top-button">
            <div class="left-side"></div>
            <div class="inside-account-info">
              <h5>Plan contratado</h5>
              <p>Nombre</p>
              <p>Descripción</p>
              <p>Costo</p>
              <p>Fecha de caducidad</p>
            </div>
          </div>
        </div>
        <div class="bot-buttons-account">
          {" "}
          <div class="account-bottom-button">
            <div class="left-side"></div>
            <div class="inside-account-info">
              <h5>Información de organización</h5>
              <p>Número de proyectos:</p>
              <p>Número de Historias de usuarios:</p>
              <p>Número de Clientes:</p>
              <p>Número de Analistas:</p>

              <Button id="edit-account-info" onClick={this.goToInfoEdit}>
                Editar
              </Button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(OrganizationProfile);
