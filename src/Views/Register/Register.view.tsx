import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { TextField, Box, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { URL as LOGIN_VIEW_URL } from '../Login/Login.view';
import RegisterStore from './Register.store';
import { useSnackbar } from 'notistack';

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
      enqueueSnackbar('Em desenvolvimento...');
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
        autoComplete='first-name'
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
