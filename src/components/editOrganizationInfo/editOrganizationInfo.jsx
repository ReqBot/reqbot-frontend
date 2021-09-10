import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./editOrganizationInfo.css";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import { BlockPicker } from "react-color";

class EditOrganizationInfo extends Component {
  state = {
    color1: "#545871",
    color2: "#f7eceb",
    color3: "#FFFFFF",
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

  handleChangeComplete = (color) => {
    this.setState({ color1: color.hex });
  };

  handleChangeComplete2 = (color) => {
    this.setState({ color2: color.hex });
  };

  handleChangeComplete3 = (color) => {
    this.setState({ color3: color.hex });
  };

  render() {
    return (
      <React.Fragment>
        <div class="header-proyect-admin">
          <h1>Editar Información</h1>
        </div>
        <div class="contenedor-proyect-admin">
          <div class="proyect-admin-center">
            <h5>Nombre:</h5>
            <InputGroup className="mb-3 login-input">
              <FormControl
                aria-label="Correo"
                aria-describedby="basic-addon1"
                defaultValue="{this.props.location.megastate.user.correo}"
              />
            </InputGroup>

            <h5>Idioma:</h5>
            <Form.Select aria-label="Rol" id="proyect-info-select">
              <option>Eliga un idioma</option>
              <option value="1">English</option>
              <option value="2">Español</option>
            </Form.Select>

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
                <h5>Color de texto:</h5>
                <BlockPicker
                  color={this.state.color3}
                  onChangeComplete={this.handleChangeComplete3}
                />
              </div>
            </div>
            <div class="login-buttons-div">
              <Button id="save-button" onClick={this.goLogin}>
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
