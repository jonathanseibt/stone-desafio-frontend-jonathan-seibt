import React from 'react';
import { createMount } from '@material-ui/core/test-utils';
import DashboardLayout from './Dashboard.layout';

describe('<App />', () => {
  let mount: any;

  beforeEach(() => {
    mount = createMount();
  });

  afterEach(() => {
    mount.cleanUp();
  });

  it('should render correctly', () => {
    mount(<DashboardLayout title='Testing' menu={0} />);
  });
});
