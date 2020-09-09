import React from 'react';
import { createMount } from '@material-ui/core/test-utils';
import RegisterView from './Register.view';
import { SnackbarProvider } from 'notistack';

describe('<RegisterView />', () => {
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
        <RegisterView />
      </SnackbarProvider>,
    );
  });
});
