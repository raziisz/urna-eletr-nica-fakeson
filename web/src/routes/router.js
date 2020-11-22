import React from 'react';

import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PrivateRouter from './PrivateRouter';

import Login from '../pages/Login';
import Home from '../pages/Home';

export default function Routes() {
    return (
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/login" component={Login} />
            <Route path='*' exact component={() => <h1>Página não encontrada.</h1>} />
          </Switch>
        </BrowserRouter>
      )
}