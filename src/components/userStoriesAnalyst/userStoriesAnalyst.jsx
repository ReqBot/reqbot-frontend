import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import "./userStoriesAnalyst.css";
import { FaSearch } from "react-icons/fa";

class UserStoriesAnalyst extends Component {
  state = {
    userStoriesShowed: [],
  };

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

  Test = ({ UserStories }) => (
    <div class="flex-div-userStories-analyst">
      {UserStories.map((USRTORY) => (
        <div>
          <Card className="userCard-analyst">
            <Card.Body id="card-body-analyst">
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
      </React.Fragment>
    );
  }
}

export default UserStoriesAnalyst;
