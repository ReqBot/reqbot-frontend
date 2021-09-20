import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import "./userStories.css";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { FiMoreVertical } from "react-icons/fi";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { AiFillCloseCircle } from "react-icons/ai";
import Form from "react-bootstrap/Form";
class UserStories extends Component {
  state = {
    useStories: [],
    userStoriesShowed: [],
    modalFilterOrder: false,
  };

  componentDidMount() {
    this.getUserStories();
  }

  getUserStories = () => {
    axios
      .get(
        "http://localhost:5000/api/historiausuario/aprobados/" +
          this.props.proyect.idProyecto
      )
      .then((resonse) => {
        console.log(resonse);
        this.setState({
          useStories: resonse.data,
          userStoriesShowed: resonse.data,
        });
      })
      .catch((error) => {
        this.setState({
          userStoriesShowed: this.userStories,
        });
        console.log(error);
      });
  };

  userStories = [
    {
      idHistoriaUsuario: 2,
      nombre: "Historia 2",
      rol: "Cliente",
      funcionalidad: "Loguearse con Apple",
      resultado: "Para tener facilidad de loguearse",
      fechaModificacion: "2021-07-09T05:00:00.000Z",
      modificadoPor: 1,
      idProyecto: 1,
      estado: "Aprobado",
    },
    {
      idHistoriaUsuario: 2,
      nombre: "Historia 2",
      rol: "Cliente",
      funcionalidad: "Loguearse con Apple",
      resultado: "Para tener facilidad de loguearse",
      fechaModificacion: "2021-07-09T05:00:00.000Z",
      modificadoPor: 1,
      idProyecto: 1,
      estado: "Aprobado",
    },
    {
      idHistoriaUsuario: 2,
      nombre: "Historia 2",
      rol: "Cliente",
      funcionalidad: "Loguearse con Apple",
      resultado: "Para tener facilidad de loguearse",
      fechaModificacion: "2021-07-09T05:00:00.000Z",
      modificadoPor: 1,
      idProyecto: 1,
      estado: "Aprobado",
    },
  ];

  HU = ({ HUS }) => (
    <div class="flex-div-userStories">
      {HUS.map((userstory) => (
        <div>
          <Card className="userCard">
            <Card.Body>
              <div className="card-top-div">
                <div className="card-top-div-left">
                  <Card.Title className="title">{userstory.nombre}</Card.Title>
                </div>
                <div className="card-top-div-right">
                  <FiMoreVertical id="more-icon"></FiMoreVertical>
                </div>
              </div>
              <Card.Text className="text">
                <div>
                  <b>Como &nbsp;</b>
                  {userstory.rol}
                  <b>&nbsp;quiero &nbsp;</b>
                  {userstory.funcionalidad}
                  <b>&nbsp;para &nbsp;</b>
                  {userstory.resultado}
                </div>
              </Card.Text>
            </Card.Body>
            <Card.Body>
              <div className="card-footer-div">
                <div className="card-footer-div-left">
                  <p>
                    <b>Estado: &nbsp;</b> {userstory.estado}
                  </p>
                </div>
                <div className="card-footer-div-right">
                  <p>
                    <b>Ultima Modificación: &nbsp;</b>{" "}
                    {userstory.fechaModificacion}
                  </p>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );

  handleFilterOrder = () => {
    this.setState({
      modalFilterOrder: !this.state.modalFilterOrder,
    });
  };

  render() {
    return (
      <React.Fragment>
        <div>
          <div class="header-proyectos">
            <div class="searchbar-div-userStories">
              <Button
                id="filtrar-ordenar-button"
                onClick={this.handleFilterOrder}
              >
                Filtrar/Ordenar
              </Button>
              <InputGroup id="input-userStories" className="mb-3">
                <FaSearch id="seach-icon"></FaSearch>
                <FormControl
                  placeholder="Buscar"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  onChange={this.editSearchTerm}
                  id="search-userStories"
                />
              </InputGroup>
            </div>
          </div>
          <this.HU HUS={this.state.userStoriesShowed}></this.HU>
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
              <div className="check-line">
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    label="Activo"
                    name="checkBoxOne"
                    onClick={this.handleClick}
                    checked={this.state.checkBoxOne}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    label="Inactivo"
                    name="checkBoxTwo"
                    onClick={this.handleClick}
                    checked={this.state.checkBoxTwo}
                  />
                </Form.Group>
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

export default UserStories;
