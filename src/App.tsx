import React from 'react';
import { observer } from 'mobx-react';
import { ThemeProvider } from '@material-ui/core/styles';
import Theme from './Theme';
import CssBaseline from '@material-ui/core/CssBaseline';
import Router from './Router';
import { SnackbarProvider } from 'notistack';

const App: React.FC = observer(() => {
  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />

      <SnackbarProvider maxSnack={3}>
        <Router />
      </SnackbarProvider>
    </ThemeProvider>
  );
});

export default App;
