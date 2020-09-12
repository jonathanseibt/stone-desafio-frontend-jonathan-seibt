import { createMount } from '@material-ui/core/test-utils';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import AuthLayout from './Auth.layout';

describe('<App />', () => {
  let mount: any;

  beforeEach(() => {
    mount = createMount();
  });

  afterEach(() => {
    mount.cleanUp();
  });

  it('should render correctly', () => {
    mount(
      <HelmetProvider>
        <SnackbarProvider maxSnack={3}>
          <AuthLayout title='Testing' />
        </SnackbarProvider>
      </HelmetProvider>,
    );
  });
});
