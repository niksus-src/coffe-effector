import React, { useEffect } from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { isLogin } from "../services/app/appService";

import "./app.scss";

import NavBar from "./navBar/NavBar";
import Footer from "./footer/Footer";

import Main from "../pages/main";
import ItemCoffe from "./itemCoffe/ItemCoffe";
import Layout from "./layout";
import Contacts from "./contacts/contacts";
import Catalog from "../pages/catalog";
import Basket from "./basket/Basket";
import Account from "./account/Account";
import { useStore } from "effector-react";
import Popup from "./popup/popup";

const App = () => {
  const login = useStore(isLogin.$isLogin);

  useEffect(() => {
    isLogin.setIsLogin(Boolean(sessionStorage.getItem("isLogin")));
  }, []);

  return (
    <Router>
      <NavBar />
      <Layout>
        <Switch>
          <Route path="/account" component={Account}>
            {!login && <Popup />}
          </Route>
          <Route path="/basket" component={Basket} />
          <Route path="/itemCard" component={ItemCoffe} />
          <Route path="/catalog" component={Catalog} />
          <Route path="/contacts" component={Contacts} />
          <Route path="/" component={Main} />
        </Switch>
      </Layout>
      <Footer />
    </Router>
  );
};

export default App;
