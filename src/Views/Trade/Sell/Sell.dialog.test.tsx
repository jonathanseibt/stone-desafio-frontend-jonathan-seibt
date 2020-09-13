import { createMount } from '@material-ui/core/test-utils';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import SellDialog from './Sell.dialog';

describe('<SellDialog />', () => {
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
        <SellDialog />
      </SnackbarProvider>,
    );
  });
});
