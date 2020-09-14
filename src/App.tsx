import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { observer, Provider } from 'mobx-react';
import { SnackbarProvider } from 'notistack';
import React, { useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import LocalStorage from './LocalStorage';
import Router from './Router';
import Scheduler from './Scheduler/Scheduler';
import Theme from './Theme';

const App: React.FC = observer(() => {
  useEffect(() => {
    Scheduler.execute();
  });

  return (
    <Provider {...LocalStorage}>
      <HelmetProvider>
        <ThemeProvider theme={Theme}>
          <CssBaseline />

          <SnackbarProvider maxSnack={3}>
            <Router />
          </SnackbarProvider>
        </ThemeProvider>
      </HelmetProvider>
    </Provider>
  );
});

export default App;
