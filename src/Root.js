// @flow

import React from 'react';
import type { Node } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import type { Routes } from './routes';

type Props = {
  routes: Routes,
};

const Root = ({ routes }: Props) => <Router>{renderRoutes(routes)}</Router>;

export default Root;
