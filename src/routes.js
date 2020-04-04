import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import MovieList from 'components/MovieList';
import MovieDescription from 'components/MovieDescription';

const AppRouter = () => (
  <Switch>
    <Route exact path="/:category" render={(props) => <MovieList {...props} />} />
    <Route exact path="/:category/:id" render={(props) => <MovieDescription {...props} />} />
    <Redirect exact from="/" to="/action" />
  </Switch>
);

export default AppRouter;
