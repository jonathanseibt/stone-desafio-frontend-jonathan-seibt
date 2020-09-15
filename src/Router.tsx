import { observer } from 'mobx-react';
import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import BrowserStore from './Browser.store';
import AuthLayout from './Layouts/Auth/Auth.layout';
import DashboardLayout from './Layouts/Dashboard/Dashboard.layout';
import SessionStore from './Session.store';
import ForgotPasswordView, { TITLE as FORGOT_PASSWORD_VIEW_TITLE, URL as FORGOT_PASSWORD_VIEW_URL } from './Views/ForgotPassword/ForgotPassword.view';
import HistoryView, { TITLE as HISTORY_VIEW_TITLE, URL as HISTORY_VIEW_URL } from './Views/History/History.view';
import LoginView, { TITLE as LOGIN_VIEW_TITLE, URL as LOGIN_VIEW_URL } from './Views/Login/Login.view';
import RegisterView, { TITLE as REGISTER_VIEW_TITLE, URL as REGISTER_VIEW_URL } from './Views/Register/Register.view';
import TradeView, { TITLE as TRADE_VIEW_TITLE, URL as TRADE_VIEW_URL } from './Views/Trade/Trade.view';
import WalletView, { TITLE as WALLET_VIEW_TITLE, URL as WALLET_VIEW_URL } from './Views/Wallet/Wallet.view';

const Router: React.FC = observer(() => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      {BrowserStore.hydrated && (
        <Switch>
          <Route exact path='/'>
            {SessionStore.isAuthenticated() ? <Redirect to={WALLET_VIEW_URL} /> : <Redirect to={LOGIN_VIEW_URL} />}
          </Route>

          <Route path={WALLET_VIEW_URL}>
            {SessionStore.isAuthenticated() ? (
              <DashboardLayout title={WALLET_VIEW_TITLE} menu={0}>
                <WalletView />
              </DashboardLayout>
            ) : (
              <Redirect to={LOGIN_VIEW_URL} />
            )}
          </Route>

          <Route path={TRADE_VIEW_URL}>
            {SessionStore.isAuthenticated() ? (
              <DashboardLayout title={TRADE_VIEW_TITLE} menu={1}>
                <TradeView />
              </DashboardLayout>
            ) : (
              <Redirect to={LOGIN_VIEW_URL} />
            )}
          </Route>

          <Route path={HISTORY_VIEW_URL}>
            {SessionStore.isAuthenticated() ? (
              <DashboardLayout title={HISTORY_VIEW_TITLE} menu={2}>
                <HistoryView />
              </DashboardLayout>
            ) : (
              <Redirect to={LOGIN_VIEW_URL} />
            )}
          </Route>

          <Route path={LOGIN_VIEW_URL}>
            {!SessionStore.isAuthenticated() ? (
              <AuthLayout title={LOGIN_VIEW_TITLE}>
                <LoginView />
              </AuthLayout>
            ) : (
              <Redirect to={WALLET_VIEW_URL} />
            )}
          </Route>

          <Route path={REGISTER_VIEW_URL}>
            {!SessionStore.isAuthenticated() ? (
              <AuthLayout title={REGISTER_VIEW_TITLE}>
                <RegisterView />
              </AuthLayout>
            ) : (
              <Redirect to={WALLET_VIEW_URL} />
            )}
          </Route>

          <Route path={FORGOT_PASSWORD_VIEW_URL}>
            {!SessionStore.isAuthenticated() ? (
              <AuthLayout title={FORGOT_PASSWORD_VIEW_TITLE}>
                <ForgotPasswordView />
              </AuthLayout>
            ) : (
              <Redirect to={WALLET_VIEW_URL} />
            )}
          </Route>

          <Route>
            <Redirect to='/' />
          </Route>
        </Switch>
      )}
    </BrowserRouter>
  );
});

export default Router;
