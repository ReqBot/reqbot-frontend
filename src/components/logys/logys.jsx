import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./logys.css";

class Logys extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  componentDidMount() {}

  render() {
    return (
      <React.Fragment>
        <div class="header-proyect-admin">
          <h1>Logs</h1>
        </div>
        <h3>HELLo</h3>
      </React.Fragment>
    );
  }
}

export default withRouter(Logys);
