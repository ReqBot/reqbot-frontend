import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "@progress/kendo-theme-default/dist/all.css";
import "./App.css";
import Sidebar from "./components/sidebar/sidebar";
import Proyectos from "./components/proyects/proyects";
import TabsProyect from "./components/tabsProyect/tabsProyect";

function App() {
  return (
    <React.Fragment>
      <Router>
        <div class="aside">
          <div class="sidebar-div">
            <Sidebar></Sidebar>
          </div>
          <div class="view">
            <Switch>
              <Route
                exact
                path="/proyects"
                render={(props) => <Proyectos></Proyectos>}
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
