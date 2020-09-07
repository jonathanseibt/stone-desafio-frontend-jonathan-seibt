import React from 'react';
import { observer } from 'mobx-react';
import { ThemeProvider } from '@material-ui/core/styles';
import Theme from './Theme';
import CssBaseline from '@material-ui/core/CssBaseline';

const App: React.FC = observer(() => {
  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      <>Hello Stone</>
    </ThemeProvider>
  );
});

export default App;
