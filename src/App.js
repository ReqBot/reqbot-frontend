import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "@progress/kendo-theme-default/dist/all.css";
import "./App.css";
import Sidebar from "./components/sidebar/sidebar";

import TabsProyect from "./components/tabsProyect/tabsProyect";

function App() {
  return (
    <React.Fragment>
      <Router>
        <div class="aside">
          <Sidebar></Sidebar>
          <div class="view">
            <Switch>
              <Route
                exact
                path="/proyects"
                render={(props) => <h1>Proyects Render Try</h1>}
              />
              <Route
                exact
                path="/redactar"
                render={(props) => <TabsProyect></TabsProyect>}
              />
            </Switch>
          </div>
        </div>
      </Router>
    </React.Fragment>
  );
}

export default App;
