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
  }

  loggin = (loggedIn, userName, rol) => {
    localStorage.setItem("loggedIn", loggedIn);
    localStorage.setItem("userName", userName);
    localStorage.setItem("rol", rol);
  };

  render() {
    return (
      <React.Fragment>
        <Router>
          <Switch>
            <Route
              path="/dashboard"
              render={(props) =>
                localStorage.getItem("loggedIn") ? (
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
                !localStorage.getItem("loggedIn") ? (
                  <Login changeParentLogin={this.loggin}></Login>
                ) : (
                  <Redirect to="/dashboard/proyects" />
                )
              }
            />

            <Route
              exact
              path="/"
              render={(props) =>
                !localStorage.getItem("loggedIn") ? (
                  <Register></Register>
                ) : (
                  <Redirect to="/dashboard/proyects" />
                )
              }
            />

            <Route
              exact
              path="/"
              render={(props) =>
                !localStorage.getItem("loggedIn") ? (
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
