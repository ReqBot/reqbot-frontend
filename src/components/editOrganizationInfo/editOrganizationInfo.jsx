import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./editOrganizationInfo.css";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import { BlockPicker } from "react-color";
import axios from "axios";

class EditOrganizationInfo extends Component {
  state = {
    color1: "var(--secondary-color)",
    color2: "var(--primary-color)",
    color3: "#FFFFFF",
    color4: "#FFFFFF",

    nombre: "",
    siglas: "",
    descripcion: "",
    idioma: "",

    incompleteFields: false,
    org: "",
  };

  constructor(props) {
    super(props);
    console.log(props);
  }

  componentDidMount() {
    console.log(sessionStorage.getItem("idOrganizacion"));

    axios
      .get(
        sessionStorage.getItem("api") +
          "api/organizacion/" +
          sessionStorage.getItem("idOrganizacion")
      )
      .then((response) => {
        this.setState({
          nombre: response.data[0].nombre,
          siglas: response.data[0].siglas,
          descripcion: response.data[0].descripcion,
          org: response.data[0],
        });
      })
      .catch((error) => {
        console.log("Error en obtener Proyectos ordenados");
      });
  }

  goBack = () => {
    this.props.history.push({
      pathname: "/dashboard/organization/",
    });
  };

  handleChangeComplete = (color) => {
    this.setState({ color1: color.hex });
  };

  handleChangeComplete2 = (color) => {
    this.setState({ color2: color.hex });
  };

  handleChangeComplete3 = (color) => {
    this.setState({ color3: color.hex });
  };

  handleChangeComplete4 = (color) => {
    this.setState({ color4: color.hex });
  };

  handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };

  editOrg = () => {
    if (
      this.state.nombre == "" ||
      this.state.descripcion == "" ||
      this.state.idioma == "" ||
      this.state.siglas == 0
    ) {
      this.setState({
        incompleteFields: true,
      });
    } else {
      const headers = {};

      let jsonSent = {
        nombre: this.state.nombre,
        siglas: this.state.siglas,
        descripcion: this.state.descripcion,
        imagen:
          "https://www.renaultgroup.com/wp-content/uploads/2021/03/nouveau_logo_renault_banner.jpg",
        colorPrimario: this.state.color1,

        colorSecundario: this.state.color2,
        idPlan: "2",
      };

      console.log(this.state.org.idOrganizacion);
      console.log(jsonSent);

      axios
        .put(
          sessionStorage.getItem("api") +
            "api/organizacion/" +
            this.state.org.idOrganizacion,
          jsonSent,
          {
            headers: headers,
          }
        )
        .then((response) => {
          this.props.history.push({
            pathname: "/dashboard/organization/",
            megastate: { alert: "alert" },
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  render() {
    return (
      <React.Fragment>
        <div class="header-proyect-admin">
          <div class="page-main-title">Editar Información</div>
        </div>
        <div class="contenedor-proyect-admin-2">
          <div class="proyect-admin-center">
            <h5>Nombre:</h5>
            <InputGroup className="mb-3 login-input">
              <FormControl
                aria-label="Correo"
                aria-describedby="basic-addon1"
                value={this.state.nombre}
                onChange={this.handleChange}
                name="nombre"
              />
            </InputGroup>

            <div class="line-flex">
              <div style={{ width: "45%" }}>
                <h5>Idioma:</h5>
                <Form.Select
                  aria-label="Rol"
                  id="register-color-select"
                  onClick={this.handleChange}
                  name="idioma"
                >
                  <option>Eliga un idioma</option>
                  <option value="1">English</option>
                  <option value="2">Español</option>
                </Form.Select>
              </div>
              <div style={{ width: "45%" }}>
                <h5>Siglas:</h5>
                <InputGroup className="mb-3 login-input">
                  <FormControl
                    aria-label="Correo"
                    aria-describedby="basic-addon1"
                    value={this.state.siglas}
                    name="siglas"
                    onChange={this.handleChange}
                  />
                </InputGroup>
              </div>
            </div>

            <h5>Descripción:</h5>
            <Form.Control
              aria-label="Descripcion"
              as="textarea"
              placeholder="Leave a comment here"
              style={{ height: "10%" }}
              defaultValue={this.state.descripcion}
              name="descripcion"
              onChange={this.handleChange}
            />

            <div class="line-flex-color">
              <div class="color-picker-div">
                <h5>Color Primario:</h5>
                <BlockPicker
                  color={this.state.color1}
                  onChangeComplete={this.handleChangeComplete}
                />
              </div>
              <div class="color-picker-div">
                <h5>Color Secundario:</h5>
                <BlockPicker
                  color={this.state.color2}
                  onChangeComplete={this.handleChangeComplete2}
                />
              </div>

              <div class="color-picker-div">
                <h5>Color Terciario:</h5>
                <BlockPicker
                  color={this.state.color3}
                  onChangeComplete={this.handleChangeComplete3}
                />
              </div>
              <div class="color-picker-div">
                <h5>Color de texto:</h5>
                <BlockPicker
                  color={this.state.color4}
                  onChangeComplete={this.handleChangeComplete4}
                />
              </div>
            </div>

            {this.state.incompleteFields ? (
              <div class="empty-edit">
                *Por favor, complete todos los campos
              </div>
            ) : null}

            <div class="login-buttons-div">
              <Button id="save-button" onClick={this.editOrg}>
                Editar
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

export default withRouter(EditOrganizationInfo);
