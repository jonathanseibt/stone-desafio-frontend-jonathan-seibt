import React from 'react';
import { observer } from 'mobx-react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import AuthLayout from './Layouts/Auth/Auth.layout';
import LoginView, { URL as LOGIN_VIEW_URL, TITLE as LOGIN_VIEW_TITLE } from './Views/Login/Login.view';

const Router: React.FC = observer(() => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/'>
          <Redirect to={LOGIN_VIEW_URL} />
        </Route>

        <Route path={LOGIN_VIEW_URL}>
          <AuthLayout title={LOGIN_VIEW_TITLE}>
            <LoginView />
          </AuthLayout>
        </Route>

        <Route>
          <Redirect to='/' />
        </Route>
      </Switch>
    </BrowserRouter>
  );
});

export default Router;
