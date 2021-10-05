import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./createUser.css";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import axios from "axios";

class CreateUser extends Component {
  state = {
    nombre: "",
    apellido: "",
    correo: "",
    contrasenia: "",
    concontrasenia: "",
    rol: "",

    incompleteFields: false,
    notEqualPasswords: false,
  };

  constructor(props) {
    super(props);
    console.log(props);
  }

  componentDidMount() {}

  goBack = () => {
    this.props.history.push({
      pathname: "/dashboard/organization/",
    });
  };

  saveUser = () => {
    if (
      this.state.nombre == "" ||
      this.state.apellido == "" ||
      this.state.contrasenia == "" ||
      this.state.concontrasenia == "" ||
      this.state.rol == ""
    ) {
      this.setState({
        incompleteFields: true,
      });
    } else {
      if (this.state.contrasenia != this.state.concontrasenia) {
        this.setState({
          notEqualPasswords: true,
        });
      } else {
        const headers = {};

        let jsonSent = {
          nombre: this.state.nombre,
          apellido: this.state.apellido,
          correo: this.state.correo,
          contrasenia: this.state.contrasenia,
          rol: this.state.rol,
          estado: "Activo",
          idOrganizacion: sessionStorage.getItem("idOrganizacion"),
        };

        axios
          .post(sessionStorage.getItem("api") + "api/usuario/", jsonSent, {
            headers: headers,
          })
          .then((response) => {
            this.props.history.push({
              pathname: "/dashboard/organization/",
              megastate: { alert: "createUser" },
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };

  handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <React.Fragment>
        <div class="header-proyect-admin">
          <h1>Crear Usuario</h1>
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
                    placeholder="Nombre"
                    onChange={this.handleChange}
                    name="nombre"
                  />
                </InputGroup>
              </div>
              <div style={{ width: "45%" }}>
                <h5>Apellidos:</h5>
                <InputGroup className="mb-3 login-input">
                  <FormControl
                    aria-label="Apellido"
                    aria-describedby="basic-addon1"
                    placeholder="Nombre"
                    onChange={this.handleChange}
                    name="apellido"
                  />
                </InputGroup>
              </div>
            </div>

            <h5>Correo:</h5>
            <InputGroup className="mb-3 login-input">
              <FormControl
                aria-label="Correo"
                aria-describedby="basic-addon1"
                placeholder="Correo"
                onChange={this.handleChange}
                name="correo"
              />
            </InputGroup>

            <div class="line-flex">
              <div style={{ width: "45%" }}>
                <h5>Contraseña:</h5>
                <InputGroup className="mb-3 login-input">
                  <FormControl
                    type="password"
                    aria-label="Contraseña"
                    aria-describedby="passwordHelpBlock"
                    onChange={this.handleChange}
                    name="contrasenia"
                  />
                </InputGroup>
              </div>
              <div style={{ width: "45%" }}>
                <h5>Confirmar Contraseña:</h5>
                <InputGroup className="mb-3 login-input">
                  <FormControl
                    type="password"
                    aria-label="ConfirmarContraseña"
                    aria-describedby="passwordHelpBlock"
                    onChange={this.handleChange}
                    name="concontrasenia"
                  />
                </InputGroup>
              </div>
            </div>

            <h5>Rol:</h5>
            <Form.Select
              aria-label="Estado"
              id="proyect-info-select"
              onClick={this.handleChange}
              name="rol"
            >
              <option>Eliga un rol</option>
              <option value="Cliente">Cliente</option>
              <option value="Analista">Analista</option>
            </Form.Select>

            <h5>Estado:</h5>
            <Form.Select aria-label="Estado" id="proyect-info-select" disabled>
              <option>Activo</option>
            </Form.Select>

            {this.state.incompleteFields ? (
              <div class="empty-fields-create">
                *Por favor, complete todos los campos
              </div>
            ) : null}

            {this.state.notEqualPasswords ? (
              <div class="empty-fields-create">
                *Las contraseñas no coinciden
              </div>
            ) : null}

            <div class="create-user-buttons-div">
              <Button id="save-button" onClick={this.saveUser}>
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

export default withRouter(CreateUser);
