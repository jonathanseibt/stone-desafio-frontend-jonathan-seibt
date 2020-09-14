import { Box, Button, TextField } from '@material-ui/core';
import { observer } from 'mobx-react';
import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import SessionStore from '../../Session.store';
import LoginStore from '../Login/Login.store';
import { URL as LOGIN_VIEW_URL } from '../Login/Login.view';
import { URL as WALLET_VIEW_URL } from '../Wallet/Wallet.view';
import RegisterStore from './Register.store';

export const URL = '/register';
export const TITLE = 'Nova conta';

const RegisterView: React.FC = observer(() => {
  useEffect(() => RegisterStore.load());

  return <View />;
});

const View: React.FC = observer(() => {
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const onClickRegister = (event: React.MouseEvent) => {
    event.preventDefault();

    if (RegisterStore.validateForm()) {
      const result = RegisterStore.register();

      if (result) {
        LoginStore.inputEmail = RegisterStore.inputEmail;
        LoginStore.inputPassword = RegisterStore.inputPassword;

        if (LoginStore.login()) {
          const balance = SessionStore.getUser().wallet.balance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 });

          enqueueSnackbar(`Seja muito bem-vindo! Como presente de boas-vindas, você já inicia com ${balance}`, { variant: 'success' });

          history.push(WALLET_VIEW_URL);
        }
      }
    }
  };

  const onClickLogin = () => {
    history.push(LOGIN_VIEW_URL);
  };

  return (
    <form noValidate>
      <TextField
        {...RegisterStore.inputName}
        onChange={(event) => RegisterStore.onChangeInputName(event.target.value)}
        label='Nome'
        name='name'
        variant='outlined'
        margin='normal'
        required
        fullWidth
        autoComplete='name'
        autoFocus
      />

      <TextField
        {...RegisterStore.inputEmail}
        onChange={(event) => RegisterStore.onChangeInputEmail(event.target.value)}
        label='E-mail'
        name='email'
        variant='outlined'
        margin='normal'
        required
        fullWidth
        autoComplete='username'
      />

      <TextField
        {...RegisterStore.inputPassword}
        onChange={(event) => RegisterStore.onChangeInputPassword(event.target.value)}
        label='Senha'
        name='password'
        variant='outlined'
        margin='normal'
        required
        fullWidth
        type='password'
        autoComplete='new-password'
      />

      <TextField
        {...RegisterStore.inputConfirmPassword}
        onChange={(event) => RegisterStore.onChangeInputConfirmPassword(event.target.value)}
        label='Confirme a sua senha'
        name='password'
        variant='outlined'
        margin='normal'
        required
        fullWidth
        type='password'
        autoComplete='new-password'
      />

      <Box marginY={2}>
        <Button id='btnRegister' type='submit' fullWidth variant='contained' color='primary' size='large' onClick={onClickRegister}>
          Cadastrar
        </Button>
      </Box>

      <Button id='login' fullWidth color='primary' size='small' onClick={onClickLogin}>
        Eu já tenho uma conta
      </Button>
    </form>
  );
});

export default RegisterView;
