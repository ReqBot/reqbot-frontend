import React, { Component } from "react";
import {
  withRouter,
  BrowserRouter as Router,
  Route,
  Switch,
  Navigate,
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
    sessionStorage.setItem("api", "https://reqbot-backend.herokuapp.com/");
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
                  <Navigate to="/" />
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
                  <Navigate to="/dashboard/proyects" />
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
                  <Navigate to="/dashboard/proyects" />
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
                  <Navigate to="/dashboard/proyects" />
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
