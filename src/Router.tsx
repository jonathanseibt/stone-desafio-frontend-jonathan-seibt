import React from 'react';
import { observer } from 'mobx-react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

const Router: React.FC = observer(() => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/'>
          <>Hello Stone</>
        </Route>

        <Route>
          <Redirect to='/' />
        </Route>
      </Switch>
    </BrowserRouter>
  );
});

export default Router;
