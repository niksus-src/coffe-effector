import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./app.scss";

import NavBar from "./navBar/NavBar";
import Footer from "./footer/Footer";

import Main from "../pages/main";
import ItemCoffe from "./itemCoffe/ItemCoffe";

const App = () => {
  return (
    <Router>
      <NavBar />

      <Switch>
        <Route path="/">
          <ItemCoffe />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
