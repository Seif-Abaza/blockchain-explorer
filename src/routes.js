// @flow
import type { ComponentType } from 'react';

import BlocksPage from './pages/blocks/BlocksPage';

export type RouteConfig = {
  component: ComponentType<any>,
  path: string,
};

export type Routes = Array<RouteConfig>;

const routes: Routes = [
  {
    component: BlocksPage,
    path: '/',
  },
];

export default routes;
