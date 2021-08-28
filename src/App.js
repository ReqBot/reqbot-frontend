import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "@progress/kendo-theme-default/dist/all.css";
import "./App.css";
import Dashboard from "./components/dashboard/dashboard";
import Login from "./components/login/login";
import Register from "./components/register/register";

function App() {
  let loggedIn = false;

  let sideBarParent = () => {
    proyectsShowAlert();
  };

  let proyectsShowAlert = () => {};

  let loggin = (number) => {
    console.log(number);
  };

  return (
    <React.Fragment>
      <Router>
        <Switch>
          {loggedIn ? (
            <Route exact path="/" render={(props) => <Dashboard></Dashboard>} />
          ) : null}

          {!loggedIn ? (
            <Route
              exact
              path="/"
              render={(props) => <Login changeParentLogin={loggin}></Login>}
            />
          ) : null}

          <Route
            exact
            path="/register"
            render={(props) => <Register></Register>}
          />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
