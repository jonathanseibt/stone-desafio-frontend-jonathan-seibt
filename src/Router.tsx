import { observer } from 'mobx-react';
import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import AuthLayout from './Layouts/Auth/Auth.layout';
import ForgotPasswordView, { TITLE as FORGOT_PASSWORD_VIEW_TITLE, URL as FORGOT_PASSWORD_VIEW_URL } from './Views/ForgotPassword/ForgotPassword.view';
import LoginView, { TITLE as LOGIN_VIEW_TITLE, URL as LOGIN_VIEW_URL } from './Views/Login/Login.view';
import RegisterView, { TITLE as REGISTER_VIEW_TITLE, URL as REGISTER_VIEW_URL } from './Views/Register/Register.view';

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

        <Route path={REGISTER_VIEW_URL}>
          <AuthLayout title={REGISTER_VIEW_TITLE}>
            <RegisterView />
          </AuthLayout>
        </Route>

        <Route path={FORGOT_PASSWORD_VIEW_URL}>
          <AuthLayout title={FORGOT_PASSWORD_VIEW_TITLE}>
            <ForgotPasswordView />
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
