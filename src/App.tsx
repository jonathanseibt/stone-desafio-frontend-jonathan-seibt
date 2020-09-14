import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import Router from './Router';
import Theme from './Theme';

const App: React.FC = observer(() => {
  return (
    <HelmetProvider>
      <ThemeProvider theme={Theme}>
        <CssBaseline />

        <SnackbarProvider maxSnack={3}>
          <Router />
        </SnackbarProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
});

export default App;
