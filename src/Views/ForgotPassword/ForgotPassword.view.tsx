import { Box, Button, TextField } from '@material-ui/core';
import { observer } from 'mobx-react';
import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { URL as LOGIN_VIEW_URL } from '../Login/Login.view';
import { URL as REGISTER_VIEW_URL } from '../Register/Register.view';
import ForgotPasswordStore from './ForgotPassword.store';

export const URL = '/recuperar-senha';
export const TITLE = 'Recuperar senha';

const ForgotPasswordView: React.FC = observer(() => {
  useEffect(() => ForgotPasswordStore.load());

  return <View />;
});

const View: React.FC = observer(() => {
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const onClickRecover = (event: React.MouseEvent) => {
    event.preventDefault();

    if (ForgotPasswordStore.validateForm()) {
      const result = ForgotPasswordStore.recover();

      if (result) {
        enqueueSnackbar(`Sua senha é: ${result}`, { variant: 'success' });
      } else {
        enqueueSnackbar('E-mail não cadastrado', { variant: 'error' });
      }
    }
  };

  const onClickLogin = () => {
    history.push(LOGIN_VIEW_URL);
  };

  const onClickRegister = () => {
    history.push(REGISTER_VIEW_URL);
  };

  return (
    <form noValidate>
      <TextField
        {...ForgotPasswordStore.inputEmail}
        onChange={(event) => ForgotPasswordStore.onChangeInputEmail(event.target.value)}
        label='E-mail'
        name='email'
        variant='outlined'
        margin='normal'
        required
        fullWidth
        autoComplete='username'
        autoFocus
      />

      <Button color='secondary' size='small' onClick={onClickLogin}>
        Lembrei a senha
      </Button>

      <Box marginY={2}>
        <Button type='submit' fullWidth variant='contained' color='primary' size='large' onClick={onClickRecover}>
          Recuperar
        </Button>
      </Box>

      <Button fullWidth color='primary' size='small' onClick={onClickRegister}>
        Criar uma nova conta
      </Button>
    </form>
  );
});

export default ForgotPasswordView;
