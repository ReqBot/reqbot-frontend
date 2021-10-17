import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./createProyect.css";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import { BsPlusSquareFill } from "react-icons/bs";
import { MdRemoveCircle } from "react-icons/md";
import axios from "axios";

class CreateProyect extends Component {
  state = {
    nombre: "",
    etiquetas: [],
    descripcion: "",
    etiquetaIndi: "",

    incompleteFields: false,
  };

  constructor(props) {
    super(props);
    console.log(new Date().toLocaleString());
  }

  componentDidMount() {}

  etiquetasRows = ({ etiquetas }) => (
    <div class="etiquetas-list">
      {etiquetas.map((etiqueta) => (
        <div class="etiquetas-row">
          <p>{etiqueta} </p>
          <MdRemoveCircle
            class="etiqueta-delete"
            onClick={this.removeEtiqueta.bind(
              this,
              etiquetas.indexOf(etiqueta)
            )}
          >
            {" "}
          </MdRemoveCircle>
        </div>
      ))}
    </div>
  );

  goBack = () => {
    this.props.history.push({
      pathname: "/dashboard/organization/",
    });
  };

  saveProyect = () => {
    if (
      this.state.nombre == "" ||
      this.state.descripcion == "" ||
      this.state.etiquetas.length <= 0
    ) {
      this.setState({
        incompleteFields: true,
      });
    } else {
      const headers = {};

      let jsonSent = {
        nombre: this.state.nombre,
        fechaModificacion: new Date().toLocaleString(),
        etiqueta: this.transformSemiColonsToArray(this.state.etiquetas),
        descripcion: this.state.descripcion,
        estado: "Activo",
        numeroHistorias: "0",
        numeroUsuarios: "0",
        idOrganizacion: sessionStorage.getItem("idOrganizacion"),
      };

      axios
        .post(sessionStorage.getItem("api") + "api/proyecto/", jsonSent, {
          headers: headers,
        })
        .then((response) => {
          this.props.history.push({
            pathname: "/dashboard/organization/",
            megastate: { alert: "createProyect" },
          });
        })
        .catch((error) => {
          console.log(error);
        });
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

  addEtiqueta = () => {
    if (this.state.etiquetaIndi != "") {
      let newArr = this.state.etiquetas;
      newArr.push(this.state.etiquetaIndi);
      this.setState(
        {
          etiquetas: newArr,
        },
        () => {
          this.setState({
            etiquetaIndi: "",
          });
        }
      );
    }
  };

  removeEtiqueta = (index) => {
    let newArr = this.state.etiquetas;
    newArr.splice(index, 1);
    this.setState({
      etiquetas: newArr,
    });
  };

  transformSemiColonsToArray = (input) => {
    var stringOfEtiquetas = "";
    for (const i in input) {
      if (i != input.length - 1) {
        stringOfEtiquetas = stringOfEtiquetas + input[i] + ";";
      } else {
        stringOfEtiquetas = stringOfEtiquetas + input[i];
      }
    }
    return stringOfEtiquetas;
  };

  render() {
    return (
      <React.Fragment>
        <div class="header-proyect-admin">
          <h1>Crear Proyecto</h1>
        </div>
        <div class="contenedor-proyect-admin">
          <div class="proyect-admin-center">
            <h5>Nombre:</h5>
            <InputGroup className="mb-3 login-input">
              <FormControl
                placeholder="Nombre"
                aria-describedby="basic-addon1"
                name="nombre"
                onChange={this.handleChange}
              />
            </InputGroup>

            <h5>Etiquetas:</h5>
            <div class="etiqueta-div">
              <InputGroup className="mb-3 login-input">
                <FormControl
                  aria-label="Etiqueta"
                  aria-describedby="basic-addon1"
                  value={this.state.etiquetaIndi}
                  name="etiquetaIndi"
                  onChange={this.handleChange}
                />
              </InputGroup>
              <BsPlusSquareFill
                class="etiqueta-add"
                onClick={this.addEtiqueta}
              ></BsPlusSquareFill>
            </div>
            <this.etiquetasRows etiquetas={this.state.etiquetas}>
              {" "}
            </this.etiquetasRows>

            <h5>Descripción:</h5>
            <Form.Control
              as="textarea"
              aria-label="Descripcion"
              placeholder="Redactar descripción aquí"
              style={{ height: "100px" }}
              name="descripcion"
              onChange={this.handleChange}
            />

            <h5>Estado:</h5>
            <Form.Select aria-label="Estado" id="proyect-info-select" disabled>
              <option>Activo</option>
            </Form.Select>

            {this.state.incompleteFields ? (
              <div class="empty-fields-create">
                *Por favor, complete todos los campos
              </div>
            ) : null}

            <div class="login-buttons-div">
              <Button id="save-button" onClick={this.saveProyect}>
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

export default withRouter(CreateProyect);
