import React from 'react';
import { Dashboard, Login, PrivateRoute, AuthWrapper, Error } from './pages';
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Switch>
      <Route exact path='/'>
        <Dashboard></Dashboard>
      </Route>
      <Route path='/login'>
        <Login />
      </Route>
      <Route path='*'>
        <Error />
      </Route>
    </Switch>
  );
}

export default App;
