import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import "./userStories.css";
import { FaSearch } from "react-icons/fa";
import axios from "axios";

class UserStories extends Component {
  state = {
    useStories: [],
    userStoriesShowed: [],
  };

  componentDidMount() {
    this.getUserStories();
  }

  getUserStories = () => {
    axios
      .get("http://localhost:5000/api/historiausuario/")
      .then((resonse) => {
        console.log(resonse.data);
        this.setState({
          useStories: this.userStories,
          userStoriesShowed: this.userStories,
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
    { call: "Historia 1", frequency: "000" },
    { call: "Historia 1", frequency: "001" },
    { call: "Historia 2", frequency: "001" },
    { call: "Historia 3", frequency: "001" },
  ];

  HU = ({ HUS }) => (
    <div class="flex-div-userStories">
      {HUS.map((userstory) => (
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
          <this.HU HUS={this.state.userStoriesShowed}></this.HU>
        </div>
      </React.Fragment>
    );
  }
}

export default UserStories;
