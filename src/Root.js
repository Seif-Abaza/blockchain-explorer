// @flow
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import CssBaseline from 'material-ui/CssBaseline';

import type { Routes } from './routes';

const theme: {} = createMuiTheme({});

type Props = {
  routes: Routes,
};

const Root = ({ routes }: Props) => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Router>{renderRoutes(routes)}</Router>
  </MuiThemeProvider>
);

export default Root;
