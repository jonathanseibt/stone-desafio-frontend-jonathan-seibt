import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { TextField, Box, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { URL as REGISTER_VIEW_URL } from '../Register/Register.view';
import { URL as FORGOT_PASSWORD_VIEW_URL } from '../ForgotPassword/ForgotPassword.view';
import LoginStore from './Login.store';
import { useSnackbar } from 'notistack';

export const URL = '/login';
export const TITLE = 'Acessar';

const LoginView: React.FC = observer(() => {
  useEffect(() => LoginStore.load());

  return <View />;
});

const View: React.FC = observer(() => {
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const onClickLogin = (event: React.MouseEvent) => {
    event.preventDefault();

    if (LoginStore.validateForm()) {
      enqueueSnackbar('Em desenvolvimento...');
    }
  };

  const onClickForgotPassword = () => {
    history.push(FORGOT_PASSWORD_VIEW_URL);
  };

  const onClickRegister = () => {
    history.push(REGISTER_VIEW_URL);
  };

  return (
    <form noValidate>
      <TextField
        {...LoginStore.inputEmail}
        onChange={(event) => LoginStore.onChangeInputEmail(event.target.value)}
        label='E-mail'
        name='email'
        variant='outlined'
        margin='normal'
        required
        fullWidth
        autoComplete='username'
        autoFocus
      />

      <TextField
        {...LoginStore.inputPassword}
        onChange={(event) => LoginStore.onChangeInputPassword(event.target.value)}
        label='Senha'
        name='password'
        variant='outlined'
        margin='normal'
        required
        fullWidth
        type='password'
        autoComplete='current-password'
      />

      <Button color='secondary' size='small' onClick={onClickForgotPassword}>
        Esqueci a senha
      </Button>

      <Box marginY={2}>
        <Button type='submit' fullWidth variant='contained' color='primary' size='large' onClick={onClickLogin}>
          Acessar
        </Button>
      </Box>

      <Button fullWidth color='primary' size='small' onClick={onClickRegister}>
        Criar uma nova conta
      </Button>
    </form>
  );
});

export default LoginView;
