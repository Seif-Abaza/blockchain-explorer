// @flow
import React from 'react';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import CssBaseline from 'material-ui/CssBaseline';
import { ConnectedRouter } from 'connected-react-router';
import { renderRoutes } from 'react-router-config';
import store, { history } from './stores/store';

import type { Routes } from './routes';

const theme: {} = createMuiTheme({});

type Props = {
  routes: Routes,
};

const Root = ({ routes }: Props) => (
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <ConnectedRouter history={history}>
        {renderRoutes(routes)}
      </ConnectedRouter>
    </MuiThemeProvider>
  </Provider>
);

export default Root;
