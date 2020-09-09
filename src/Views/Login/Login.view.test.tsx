import React from 'react';
import { createMount } from '@material-ui/core/test-utils';
import LoginView from './Login.view';
import { SnackbarProvider } from 'notistack';

describe('<LoginView />', () => {
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
        <LoginView />
      </SnackbarProvider>,
    );
  });
});
