import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PrivateRouter from './PrivateRouter';

import Login from 'pages/Login';
import Canvass from 'pages/Canvass';
import Home from 'pages/Home';
import Admin from 'pages/Admin';
import CandidateForm from 'pages/CandidateForm';

export default function Routes() {
    return (
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/login" component={Login} />
            <Route path="/apuracao" component={Canvass} />
            <PrivateRouter path="/admin" exact component={Admin} />
            <PrivateRouter path="/admin/candidate" component={CandidateForm} />
            <Route path='*' exact component={() => <h1>Página não encontrada.</h1>} />
          </Switch>
        </BrowserRouter>
      )
}