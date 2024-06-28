import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./logys.css";
import { AiFillCloseCircle } from "react-icons/ai";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import { FaSearch } from "react-icons/fa";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { FaSearchMinus } from "react-icons/fa";
import { BiMessageAltError } from "react-icons/bi";
class Logys extends Component {
  state = {
    logsNoFilter: [],
    logsFilter: [],
    logsShowed: [],

    modalFilterOrder: false,
    nombreProyect: "",

    emptyLogs: false,
    emptyLogsSearch: false,
  };

  searchBarInput = "";
  flagSearchBar = false;
  flagFilter = false;

  constructor(props) {
    super(props);
    console.log(props);
  }

  componentDidMount() {
    this.getLogs();
  }

  getLogs = () => {
    axios
      .get(
        sessionStorage.getItem("api") +
          "api/logs/organizacion/" +
          sessionStorage.getItem("idOrganizacion")
      )
      .then((resonse) => {
        console.log(resonse);
        this.setState(
          {
            logsShowed: resonse.data,
            logsFilter: resonse.data,
            logsNoFilter: resonse.data,
          },
          () => {
            if (this.state.logsFilter.length == 0) {
              this.setState({
                emptyLogs: true,
              });
            }
          }
        );
      })
      .catch((error) => {
        this.setState(
          {
            logsShowed: this.mockLogs,
            logsFilter: this.mockLogs,
            logsNoFilter: this.mockLogs,
          },
          () => {
            if (this.state.logsFilter.length == 0) {
              this.setState({
                emptyLogs: true,
              });
            }
          }
        );
      });
  };

  setPagination() {
    if (this.state.logsFilter.length > 0) {
      this.setState(
        {
          emptyLogs: false,
          emptyLogsSearch: false,
        },
        () => {
          this.setState({
            logsShowed: this.state.logsFilter,
          });
        }
      );
    } else {
      if (this.flagFilter || this.flagSearchBar) {
        this.setState({
          emptyLogs: false,
          emptyLogsSearch: true,
        });
      } else {
        this.setState({
          emptyLogs: true,
          emptyLogsSearch: false,
        });
      }
    }
  }

  mockLogs = [];

  logsRow = ({ HUS }) => (
    <div class="flex-div-logs">
      {HUS.map((userstory) => (
        <Card className="logs-card">
          <Card.Body id="logs-card-body">
            <div className="flex-div-logs-text">
              <div class="log-text-block-1">{userstory.nombre}</div>
              <div class="log-text-block-2">
                <div className="bottom-text-logs">
                  <b>Creación: </b>
                  <br />
                  {userstory.fecha}
                </div>
              </div>

              <div class="log-text-block-3">
                {" "}
                <b>Nombre Proyecto: &nbsp;</b>
                <br />
                {userstory.nombreProyecto}
              </div>
            </div>
            <div className="flex-div-logs-text-2">
              <div class="log-text-block-4">
                {" "}
                <Button
                  id="download-log"
                  onClick={this.tryDownload.bind(this, userstory)}
                >
                  Descargar
                </Button>
              </div>
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );

  tryDownload = (logIndex) => {
    var sampleBytes = new Int8Array(4096);

    var saveByteArray = (function () {
      var a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      return function (data, name) {
        var blob = new Blob(data, { type: "octet/stream" }),
          url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = name;
        a.click();
        window.URL.revokeObjectURL(url);
      };
    })();

    var sampleBytes = this.base64ToArrayBuffer(logIndex.archivo);
    saveByteArray([sampleBytes], logIndex.nombre + ".txt");
  };

  base64ToArrayBuffer = (base64) => {
    var binaryString = window.atob(base64);
    var binaryLen = binaryString.length;
    var bytes = new Uint8Array(binaryLen);
    for (var i = 0; i < binaryLen; i++) {
      var ascii = binaryString.charCodeAt(i);
      bytes[i] = ascii;
    }
    return bytes;
  };

  filterFunction = (objects, value) => {
    var filteredObjects = [];
    var lowerCaseName = "";
    for (const i in objects) {
      lowerCaseName = objects[i].nombre.toLowerCase();
      if (lowerCaseName.includes(value.toLowerCase())) {
        filteredObjects.push(objects[i]);
      }
    }
    return filteredObjects;
  };

  editSearchTerm = (e) => {
    this.searchBarInput = e.target.value;
    if (e.target.value != "") {
      this.flagSearchBar = true;
      this.applyAllFilters();
    } else {
      this.flagSearchBar = false;
      this.applyAllFilters();
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

  handleFilterOrder = () => {
    this.setState({
      modalFilterOrder: !this.state.modalFilterOrder,
    });
  };

  deleteFilters = () => {
    this.flagFilter = false;
    this.setState(
      {
        modalFilterOrder: !this.state.modalFilterOrder,
        nombreProyect: "",
      },
      () => {
        this.applyAllFilters();
      }
    );
  };

  applyFilters = () => {
    if (this.state.nombreProyect != "") {
      this.flagFilter = true;
    } else {
      this.flagFilter = false;
    }

    this.applyAllFilters();
    this.setState({
      modalFilterOrder: !this.state.modalFilterOrder,
    });
  };

  applyFiltersFunc = (toGetFiltered) => {
    var proyectsAux = [];
    var logsReturn = [];

    if (this.state.nombreProyect != "") {
      proyectsAux = this.filterByCondition(
        this.state.nombreProyect,
        "tipo",
        toGetFiltered
      );
      logsReturn.push(...proyectsAux);
    }

    return logsReturn;
  };

  applyAllFilters = () => {
    var toGetFiltered = this.state.logsNoFilter;

    if (this.flagSearchBar) {
      toGetFiltered = this.filterFunction(toGetFiltered, this.searchBarInput);
    }
    if (this.flagFilter) {
      toGetFiltered = this.applyFiltersFunc(toGetFiltered);
    }

    this.setState(
      {
        logsFilter: toGetFiltered,
      },
      () => {
        this.setPagination();
      }
    );
  };

  filterByCondition = (condition, type, toGetFiltered) => {
    var filteredObjects = [];
    var auxLowerCase = "";
    if (type == "tipo") {
      for (const i in toGetFiltered) {
        auxLowerCase = toGetFiltered[i].nombreProyecto.toLowerCase();
        if (auxLowerCase.includes(condition.toLowerCase())) {
          filteredObjects.push(toGetFiltered[i]);
        }
      }
    }

    return filteredObjects;
  };

  render() {
    return (
      <React.Fragment>
        <div class="page-container">
          <div class="header-proyectos">
            <div class="page-main-title">Logs</div>{" "}
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
            <Button
              className="secondary-button-color secondary-button-size filter-sort-button-size"
              onClick={this.handleFilterOrder}
            >
              Filtrar/Ordenar
            </Button>
          </div>

          {this.state.emptyLogsSearch && !this.state.emptyLogs ? (
            <div class="no-proyects">
              <div class="inner-message-no-items">
                {" "}
                <FaSearchMinus className="inner-message-no-items-icon"></FaSearchMinus>
                <p>No existe ningún log de chat con esos parámetros</p>
              </div>
            </div>
          ) : null}

          {this.state.emptyLogs && !this.state.emptyLogsSearch ? (
            <div class="no-proyects">
              <div class="inner-message-no-items">
                {" "}
                <BiMessageAltError className="inner-message-no-items-icon"></BiMessageAltError>
                <p>No se ha creado un log de chat todavía</p>
              </div>
            </div>
          ) : null}

          {!this.state.emptyLogs && !this.state.emptyLogsSearch ? (
            <div class="div-tickets">
              <this.logsRow HUS={this.state.logsShowed}></this.logsRow>
            </div>
          ) : null}
        </div>
        <Modal
          show={this.state.modalFilterOrder}
          onHide={this.handleFilterOrder}
        >
          <Modal.Header>
            <Modal.Title>Filtrar/Ordenar</Modal.Title>
            <AiFillCloseCircle
              id="btn-close"
              onClick={this.handleFilterOrder}
            ></AiFillCloseCircle>
          </Modal.Header>
          <Modal.Body>
            <div>
              <b>Filtrar por</b>
              <div className="input-line-logs">
                <p>Nombre:</p>
                <InputGroup className="mb-3 login-input">
                  <FormControl
                    type="text"
                    name="nombreProyect"
                    value={this.state.nombreProyect}
                    onChange={this.handleChange}
                  />
                </InputGroup>
              </div>
            </div>
            <div>
              <b>Ordenar Por</b>
              <Form.Select aria-label="Estado" id="proyect-info-select-filter">
                <option></option>
                <option value="1">Id</option>
                <option value="1">Fecha de Modificación</option>
                <option value="2">Nombre</option>
              </Form.Select>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              className="secondary-button-color secondary-button-size"
              onClick={this.deleteFilters}
            >
              Limpiar
            </Button>
            <Button
              variant="primary"
              className="primary-button-color primary-button-size"
              onClick={this.applyFilters}
            >
              Aplicar
            </Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}

export default withRouter(Logys);
