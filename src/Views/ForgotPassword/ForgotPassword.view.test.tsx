import React from 'react';
import { createMount } from '@material-ui/core/test-utils';
import ForgotPasswordView from './ForgotPassword.view';
import { SnackbarProvider } from 'notistack';

describe('<ForgotPasswordView />', () => {
  let mount: any;

  beforeEach(() => {
    mount = createMount();
  });

  afterEach(() => {
    mount.cleanUp();
  });

  it('should render correctly', () => {
    mount(
      <SnackbarProvider maxSnack={3}>
        <ForgotPasswordView />
      </SnackbarProvider>,
    );
  });
});
