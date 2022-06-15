import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./app.scss";

import NavBar from "./navBar/NavBar";
import Footer from "./footer/Footer";

import Main from "../pages/main";
import ItemCoffe from "./itemCoffe/ItemCoffe";
import Layout from "./layout";
import Contacts from "./contacts/contacts";
import Catalog from "../pages/catalog";

const App = () => {
  return (
    <Router>
      <NavBar />
      <Layout>
      <Switch>
        <Route path="/catalog">
          <Catalog/>
        </Route>
        <Route path="/contacts">
          <Contacts/>
        </Route>
        <Route path="/">
          <Main/>
        </Route>
      </Switch>
      </Layout>
      
      <Footer />
    </Router>
  );
};

export default App;
