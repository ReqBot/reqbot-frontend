import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import "./userStoriesAnalyst.css";
import { FaSearch } from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";
import Modal from "react-bootstrap/Modal";

class UserStoriesAnalyst extends Component {
  state = {
    userStoriesShowed: [],
    modalApprove: false,
    selectedUserStory: {
      nombre: "",
      rol: "",
      funcionalidad: "",
      resultado: "",
    },
  };

  constructor(props) {
    super(props);
    this.openAndSetApprove = this.openAndSetApprove.bind(this);
  }

  componentDidMount() {
    this.setState({
      userStoriesShowed: this.userStories,
    });
  }

  userStories = [
    {
      nombre: "Historia 1",
      rol: "Admin",
      funcionalidad: "Logearme via gmail",
      resultado: "por facilidad de logeo",
    },
    {
      nombre: "Historia 1",
      rol: "Admin",
      funcionalidad: "Logearme via gmail",
      resultado: "por facilidad de logeo",
    },
    {
      nombre: "Historia 1",
      rol: "Admin",
      funcionalidad: "Logearme via gmail",
      resultado: "por facilidad de logeo",
    },
    {
      nombre: "Historia 1",
      rol: "Admin",
      funcionalidad: "Logearme via gmail",
      resultado: "por facilidad de logeo",
    },
    {
      nombre: "Historia 1",
      rol: "Admin",
      funcionalidad: "Logearme via gmail",
      resultado: "por facilidad de logeo",
    },
    {
      nombre: "Historia 1",
      rol: "Admin",
      funcionalidad: "Logearme via gmail",
      resultado: "por facilidad de logeo",
    },
  ];

  filterFunction = (objects, value) => {
    var filteredObjects = [];
    for (const i in objects) {
      if (objects[i].call.includes(value)) {
        filteredObjects.push(objects[i]);
      }
    }

    return filteredObjects;
  };

  editSearchTerm = (e) => {
    if (e.target.value != null) {
      this.setState({
        userStoriesShowed: this.filterFunction(
          this.userStories,
          e.target.value
        ),
      });
    } else {
      this.setState({
        userStoriesShowed: this.userStories,
      });
    }
  };

  openAndSetApprove = (HUIndexed) => {
    this.setState({
      modalApprove: !this.state.modalApprove,
      selectedUserStory: HUIndexed,
    });
  };

  hanldeApprove = () => {
    this.setState({
      modalApprove: !this.state.modalApprove,
    });
  };

  getAlert() {
    this.props.handleAlert();

    this.useEffect();
  }

  useEffect() {
    const timeId = setTimeout(() => {
      this.props.handleAlert();
    }, 3000);

    return () => {
      clearTimeout(timeId);
    };
  }

  approveUserStory = () => {
    //EDIT STORY
    this.hanldeApprove();
    this.getAlert();
  };

  Test = ({ UserStories }) => (
    <div class="flex-div-userStories-analyst">
      {UserStories.map((USRTORY) => (
        <div>
          <Card className="userCard-analyst">
            <Card.Body id="card-body-analyst">
              <div class="left-part-card-analyst">
                <Card.Title className="title">{USRTORY.nombre}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Como {USRTORY.rol}
                </Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">
                  Quiero {USRTORY.funcionalidad}
                </Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">
                  Para {USRTORY.resultado}
                </Card.Subtitle>
              </div>
              <div class="right-part-card-analyst">
                <Button
                  id="aprobar-button"
                  onClick={this.openAndSetApprove.bind(this, USRTORY)}
                >
                  Aprobar
                </Button>
              </div>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );

  render() {
    return (
      <React.Fragment>
        <div>
          <div class="header-proyectos-analyst">
            <div class="searchbar-div-userStories-analyst">
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
          <div>
            <this.Test UserStories={this.state.userStoriesShowed}></this.Test>
          </div>
        </div>

        <Modal
          show={this.state.modalApprove}
          onHide={this.hanldeApprove}
          id="settings-info-user"
        >
          <Modal.Header>
            <Modal.Title>Aprobar historia de usuario</Modal.Title>
            <AiFillCloseCircle
              id="btn-close"
              onClick={this.hanldeApprove}
            ></AiFillCloseCircle>
          </Modal.Header>
          <Modal.Body>
            <div>
              <b>Como</b>
              <InputGroup className="mb-3 login-input">
                <FormControl
                  aria-label="Apellido"
                  aria-describedby="basic-addon1"
                  defaultValue={this.state.selectedUserStory.rol}
                />
              </InputGroup>
            </div>
            <div>
              <b>Quiero</b>
              <InputGroup className="mb-3 login-input">
                <FormControl
                  aria-label="Apellido"
                  aria-describedby="basic-addon1"
                  defaultValue={this.state.selectedUserStory.funcionalidad}
                />
              </InputGroup>
            </div>
            <div>
              <b>Para que</b>
              <InputGroup className="mb-3 login-input">
                <FormControl
                  aria-label="Apellido"
                  aria-describedby="basic-addon1"
                  defaultValue={this.state.selectedUserStory.resultado}
                />
              </InputGroup>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={this.hanldeApprove}
              id="boton-cerrar-modal"
            >
              Cancelar
            </Button>
            <Button
              variant="primary"
              onClick={this.approveUserStory}
              id="boton-guardar-modal"
            >
              Aprobar
            </Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}

export default UserStoriesAnalyst;
