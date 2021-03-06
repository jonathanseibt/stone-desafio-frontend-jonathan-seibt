import { createMount } from '@material-ui/core/test-utils';
import React from 'react';
import App from './App';

describe('<App />', () => {
  let mount: any;

  beforeEach(() => {
    mount = createMount();
  });

  afterEach(() => {
    mount.cleanUp();
  });

  it('should render correctly', () => {
    mount(<App />);
  });
});
