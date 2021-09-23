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

class Logys extends Component {
  state = {
    logsNoFilter: [],
    logsFilter: [],
    logsShowed: [],

    modalFilterOrder: false,
    nombreProyect: "",
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
      .get("http://localhost:5000/api/historiausuario/pendientes/" + "1")
      .then((resonse) => {
        this.setState({
          logsShowed: resonse.data,
          logsFilter: resonse.data,
          logsNoFilter: resonse.data,
        });
      })
      .catch((error) => {
        this.setState({
          logsShowed: this.mockLogs,
          logsFilter: this.mockLogs,
          logsNoFilter: this.mockLogs,
        });
      });
  };

  setPagination() {
    this.setState({
      logsShowed: this.state.logsFilter,
    });
  }

  mockLogs = [
    {
      id: "1",
      nombre: "Logs 1",
      fecha: "2021-07-09",
      idProyecto: "1",
      archivo:
        "OS8yMi8yMDIxLCA2OjE2OjQ0IFBNCiBVc2VyOiAxMjM0Cgo5LzIyLzIwMjEsIDY6MTY6NDkgUE0KIENoYXRib3Q6IFBlcmRvbiwgdHV2ZSB1biBwcm9ibGVtYQoK",
      nombreProyecto: "Proyecto 1",
    },
    {
      id: "2",
      nombre: "Logs 2",
      fecha: "2021-07-09",
      idProyecto: "1",
      archivo:
        "OS8yMi8yMDIxLCA2OjE2OjQ0IFBNCiBVc2VyOiAxMjM0Cgo5LzIyLzIwMjEsIDY6MTY6NDkgUE0KIENoYXRib3Q6IFBlcmRvbiwgdHV2ZSB1biBwcm9ibGVtYQoK",
      nombreProyecto: "Proyecto 1",
    },
    {
      id: "3",
      nombre: "Logs 3",
      fecha: "2021-07-09",
      idProyecto: "1",
      archivo:
        "OS8yMi8yMDIxLCA2OjE2OjQ0IFBNCiBVc2VyOiAxMjM0Cgo5LzIyLzIwMjEsIDY6MTY6NDkgUE0KIENoYXRib3Q6IFBlcmRvbiwgdHV2ZSB1biBwcm9ibGVtYQoK",
      nombreProyecto: "Proyecto 2",
    },
    {
      id: "4",
      nombre: "Logs 4",
      fecha: "2021-07-09",
      idProyecto: "1",
      archivo:
        "OS8yMi8yMDIxLCA2OjE2OjQ0IFBNCiBVc2VyOiAxMjM0Cgo5LzIyLzIwMjEsIDY6MTY6NDkgUE0KIENoYXRib3Q6IFBlcmRvbiwgdHV2ZSB1biBwcm9ibGVtYQoK",
      nombreProyecto: "Proyecto 3",
    },
    {
      id: "5",
      nombre: "Logs 5",
      fecha: "2021-07-09",
      idProyecto: "1",
      archivo:
        "SG93IHRvIGNvbnZlcnQgc3RyaW5nIHRvIEJhc2U2NCBvbmxpbmUNClR5cGUgb3IgcGFzdGUgeW91ciB0ZXh0IGluIHRoZSDigJxUZXh04oCdIGZpZWxkLg0KUHJlc3MgdGhlIOKAnEVuY29kZSBUZXh0IHRvIEJhc2U2NOKAnSBidXR0b24uDQpDb3B5IG9yIGRvd25sb2FkIHRoZSByZXN1bHQgZnJvbSB0aGUg4oCcQmFzZTY04oCdIGZpZWxkLg0KSG93IGNhbiBJIGNvbnZlcnQgdGV4dCB0byBCYXNlNjQgZnJvbSBhIERPQyBmaWxlPw0KWW91IGNhbiBjb3B5LXBhc3RlIHRleHQgZnJvbSB5b3VyIERPQyBmaWxlLCBidXQgc2luY2UgdGhpcyB0ZXh0IHRvIEJhc2U2NCBjb252ZXJ0ZXIgYWNjZXB0cyBvbmx5IHBsYWluIHRleHQgeW91IHdpbGwgbG9zZSBhbnkgdGV4dCBmb3JtYXR0aW5nLiBNb3Jlb3ZlciwgYXQgZGVjb2RpbmcgeW91IHdpbGwgZ2V0IGEgVFhUIGZpbGUgaW5zdGVhZCBvZiBET0MgZmlsZS4gSWYgdGhpcyBpcyBvayBmb3IgeW91LCBqdXN0IHBhc3RlIHlvdXIgdGV4dCBpbnRvIHRoZSDigJxUZXh04oCdIGZpZWxkIGFuZCBwcmVzcyB0aGUg4oCcbWFnaWPigJ0gYnV0dG9uLiBPdGhlcndpc2UsIGlmIHlvdSB3YW50IHRvIGtlZXAgdGhlIG9yaWdpbmFsIERPQyBmaWxlLCBlbmNvZGUgaXQgdG8gQmFzZTY0IHVzaW5nIHRoZSBGaWxlIHRvIEJhc2U2NCBjb252ZXRlci4NCg0K",
      nombreProyecto: "Proyecto 4",
    },
    {
      id: "6",
      nombre: "Logs 6",
      fecha: "2021-07-09",
      idProyecto: "1",
      archivo:
        "OS8yMi8yMDIxLCA2OjE2OjQ0IFBNCiBVc2VyOiAxMjM0Cgo5LzIyLzIwMjEsIDY6MTY6NDkgUE0KIENoYXRib3Q6IFBlcmRvbiwgdHV2ZSB1biBwcm9ibGVtYQoK",
      nombreProyecto: "Proyecto 5",
    },
    {
      id: "7",
      nombre: "Logs 7",
      fecha: "2021-07-09",
      idProyecto: "1",
      archivo:
        "OS8yMi8yMDIxLCA2OjE2OjQ0IFBNCiBVc2VyOiAxMjM0Cgo5LzIyLzIwMjEsIDY6MTY6NDkgUE0KIENoYXRib3Q6IFBlcmRvbiwgdHV2ZSB1biBwcm9ibGVtYQoK",
      nombreProyecto: "Proyecto6",
    },
  ];

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
    filteredObjects = filteredObjects.slice(0, 4);
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
    this.setState(
      {
        logsFilter: this.state.logsNoFilter,
        logsShowed: this.state.logsNoFilter,
      },
      () => {
        this.setState({
          modalFilterOrder: !this.state.modalFilterOrder,
          nombreProyect: "",
        });
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
    var proyectsReturn = [];

    if (this.state.nombreProyect != "") {
      proyectsAux = this.filterByCondition(
        this.state.nombreProyect,
        "tipo",
        toGetFiltered
      );
      proyectsReturn.push(...proyectsAux);
    }

    return proyectsReturn;
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
        console.log(toGetFiltered[i]);
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
        <div class="header-proyect-admin">
          <h1>Logs</h1>
        </div>
        <div class="top-search-div">
          {" "}
          <Button
            id="filtrar-ordenar-button-userStory"
            onClick={this.handleFilterOrder}
          >
            Filtrar/Ordenar
          </Button>
          <InputGroup id="input-tickets" className="mb-3">
            <FaSearch id="seach-icon"></FaSearch>
            <FormControl
              placeholder="Buscar"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              id="search-userStories"
              onChange={this.editSearchTerm}
            />
          </InputGroup>
        </div>
        <div class="div-tickets">
          <this.logsRow HUS={this.state.logsShowed}></this.logsRow>
        </div>

        <Modal
          show={this.state.modalFilterOrder}
          onHide={this.handleFilterOrder}
          id="settings-info-user"
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
              id="boton-cerrar-modal"
              onClick={this.deleteFilters}
            >
              Limpiar
            </Button>
            <Button
              variant="primary"
              id="boton-guardar-modal"
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
