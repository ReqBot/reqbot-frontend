import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./editUser.css";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import { GrAdd } from "react-icons/gr";

class EditUser extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  componentDidMount() {}

  etiquetas = ["Movil", "Perro", "Carro", "Carro"];

  etiquetasRows = ({ etiquetas }) => (
    <div class="etiqueta-list">
      {etiquetas.map((etiqueta) => (
        <div class="etiqueta-row">{etiqueta} </div>
      ))}
    </div>
  );

  goBack = () => {
    this.props.history.push({
      pathname: "/dashboard/organization/",
    });
  };

  render() {
    return (
      <React.Fragment>
        <div class="header-proyect-admin">
          <h1>Editar Usuario</h1>
        </div>
        <div class="contenedor-proyect-admin">
          <div class="proyect-admin-center">
            <div class="line-flex">
              <div style={{ width: "45%" }}>
                <h5>Nombres:</h5>
                <InputGroup className="mb-3 login-input">
                  <FormControl
                    aria-label="Nombre"
                    aria-describedby="basic-addon1"
                    defaultValue={this.props.location.megastate.user.nombre}
                  />
                </InputGroup>
              </div>
              <div style={{ width: "45%" }}>
                <h5>Apellidos:</h5>
                <InputGroup className="mb-3 login-input">
                  <FormControl
                    aria-label="Apellido"
                    aria-describedby="basic-addon1"
                    defaultValue={this.props.location.megastate.user.apellido}
                  />
                </InputGroup>
              </div>
            </div>

            <h5>Correo:</h5>
            <InputGroup className="mb-3 login-input">
              <FormControl
                aria-label="Correo"
                aria-describedby="basic-addon1"
                defaultValue={this.props.location.megastate.user.correo}
              />
            </InputGroup>

            <h5>Contraseña:</h5>
            <InputGroup className="mb-3 login-input">
              <FormControl
                type="password"
                aria-label="Contraseña"
                aria-describedby="passwordHelpBlock"
              />
            </InputGroup>

            <h5>Confirmar Contraseña:</h5>
            <InputGroup className="mb-3 login-input">
              <FormControl
                type="password"
                aria-label="ConfirmarContraseña"
                aria-describedby="passwordHelpBlock"
              />
            </InputGroup>

            <h5>Rol:</h5>
            <Form.Select aria-label="Rol" id="proyect-info-select">
              <option>Eliga un rol</option>
              <option value="1">Cliente</option>
              <option value="2">Analista</option>
            </Form.Select>

            <h5>Estado:</h5>
            <Form.Select aria-label="Estado" id="proyect-info-select">
              <option>Eliga un Estado</option>
              <option value="1">Activo</option>
              <option value="2">Inactivo</option>
            </Form.Select>

            <div class="login-buttons-div">
              <Button id="save-button" onClick={this.goLogin}>
                Crear
              </Button>

              <Button id="save-button" onClick={this.goBack}>
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(EditUser);
