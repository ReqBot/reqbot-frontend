import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import "@progress/kendo-theme-default/dist/all.css";
import "./App.css";
import Dashboard from "./components/dashboard/dashboard";
import Login from "./components/login/login";
import Register from "./components/register/register";
import ForgotPassword from "./components/forgotPassword/forgotPassword";

class App extends Component {
  state = {
    loggedIn: false,
  };

  constructor(props) {
    super(props);

    //https://reqbot-backend.herokuapp.com/
    sessionStorage.setItem("api", "http://localhost:5000/");
  }

  loggin = (loggedIn, userName, rol, token, idOrganizacion, idUsuario) => {
    sessionStorage.setItem("loggedIn", loggedIn);
    sessionStorage.setItem("userName", userName);
    sessionStorage.setItem("rol", rol);
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("idOrganizacion", idOrganizacion);
    sessionStorage.setItem("idUsuario", idUsuario);
  };

  render() {
    return (
      <React.Fragment>
        <Router>
          <Switch>
            <Route
              path="/dashboard"
              render={(props) =>
                sessionStorage.getItem("loggedIn") ? (
                  <Dashboard></Dashboard>
                ) : (
                  <Redirect to="/" />
                )
              }
            />

            <Route
              exact
              path="/"
              render={(props) =>
                !sessionStorage.getItem("loggedIn") ? (
                  <Login changeParentLogin={this.loggin}></Login>
                ) : (
                  <Redirect to="/dashboard/proyects" />
                )
              }
            />

            <Route
              exact
              path="/register"
              render={(props) =>
                !sessionStorage.getItem("loggedIn") ? (
                  <Register></Register>
                ) : (
                  <Redirect to="/dashboard/proyects" />
                )
              }
            />

            <Route
              exact
              path="/forgotPassword"
              render={(props) =>
                !sessionStorage.getItem("loggedIn") ? (
                  <ForgotPassword></ForgotPassword>
                ) : (
                  <Redirect to="/dashboard/proyects" />
                )
              }
            />
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
