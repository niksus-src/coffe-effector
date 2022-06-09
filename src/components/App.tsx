import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './app.scss'

import NavBar from './navBar/NavBar';

const App = () => {
  return (
    <Router>
      <NavBar/>

      <Switch>
       <Route path='/catalog'></Route>
      </Switch>
    </Router>

  );
}

export default App;
