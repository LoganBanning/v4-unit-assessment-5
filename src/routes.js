import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Auth from './Components/Auth/Auth';
import Dash from './Components/Dash/Dash';
import Form from './Components/Form/Form';
import Post from './Components/Post/Post';

export default (
  <Switch>
    <Route exact component={Auth} path='/' />
    <Route exact component={Dash} path='/dash' />
    <Route exact component={Post} path='/post/:id' />
    <Route exact component={Form} path='/form' />
  </Switch>
);
