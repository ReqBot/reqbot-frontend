import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
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

  loggin = (condition) => {
    this.setState({
      loggedIn: condition,
    });
  };

  render() {
    return (
      <React.Fragment>
        <Router>
          <Switch>
            {this.state.loggedIn ? (
              <Route
                path="/dashboard"
                render={(props) => <Dashboard></Dashboard>}
              />
            ) : null}

            {!this.state.loggedIn ? (
              <Route
                exact
                path="/"
                render={(props) => (
                  <Login changeParentLogin={this.loggin}></Login>
                )}
              />
            ) : null}

            <Route
              exact
              path="/register"
              render={(props) => <Register></Register>}
            />

            <Route
              exact
              path="/forgot-password"
              render={(props) => <ForgotPassword></ForgotPassword>}
            />
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
