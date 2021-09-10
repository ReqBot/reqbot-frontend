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
    { call: "Historia 1", frequency: "000" },
    { call: "Historia 1", frequency: "001" },
    { call: "Historia 2", frequency: "001" },
    { call: "Historia 3", frequency: "001" },
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

  Test = ({ stations }) => (
    <div class="flex-div-userStories">
      {stations.map((station) => (
        <div>
          <Card className="userCard">
            <Card.Body>
              <Card.Title className="title">Historia de Usuario 1</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Ultima Modificacion:
              </Card.Subtitle>
              <Card.Subtitle className="subtitle">12:30 am</Card.Subtitle>
              <Card.Text>
                <div>
                  <b>eti1</b>
                  <b>eti2</b>
                </div>
              </Card.Text>
            </Card.Body>
            <Card.Body>
              <Card.Link href="#">Historias</Card.Link>
              <Card.Link href="#">Usuarios</Card.Link>
              <Card.Link href="#">Estado</Card.Link>
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
          <div class="header-proyectos">
            <div class="searchbar-div-userStories">
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
            <this.Test stations={this.state.userStoriesShowed}></this.Test>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default UserStoriesAnalyst;
