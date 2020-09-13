import { observer } from 'mobx-react';
import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import AuthLayout from './Layouts/Auth/Auth.layout';
import DashboardLayout from './Layouts/Dashboard/Dashboard.layout';
import ForgotPasswordView, { TITLE as FORGOT_PASSWORD_VIEW_TITLE, URL as FORGOT_PASSWORD_VIEW_URL } from './Views/ForgotPassword/ForgotPassword.view';
import HistoryView, { TITLE as HISTORY_VIEW_TITLE, URL as HISTORY_VIEW_URL } from './Views/History/History.view';
import LoginView, { TITLE as LOGIN_VIEW_TITLE, URL as LOGIN_VIEW_URL } from './Views/Login/Login.view';
import RegisterView, { TITLE as REGISTER_VIEW_TITLE, URL as REGISTER_VIEW_URL } from './Views/Register/Register.view';
import TradeView, { TITLE as TRADE_VIEW_TITLE, URL as TRADE_VIEW_URL } from './Views/Trade/Trade.view';
import WalletView, { TITLE as WALLET_VIEW_TITLE, URL as WALLET_VIEW_URL } from './Views/Wallet/Wallet.view';

const Router: React.FC = observer(() => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/'>
          <Redirect to={LOGIN_VIEW_URL} />
        </Route>

        <Route path={WALLET_VIEW_URL}>
          <DashboardLayout title={WALLET_VIEW_TITLE} menu={0}>
            <WalletView />
          </DashboardLayout>
        </Route>

        <Route path={TRADE_VIEW_URL}>
          <DashboardLayout title={TRADE_VIEW_TITLE} menu={1}>
            <TradeView />
          </DashboardLayout>
        </Route>

        <Route path={HISTORY_VIEW_URL}>
          <DashboardLayout title={HISTORY_VIEW_TITLE} menu={2}>
            <HistoryView />
          </DashboardLayout>
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
