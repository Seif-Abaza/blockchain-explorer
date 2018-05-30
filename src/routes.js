// @flow
import type { ComponentType } from 'react';

import LatestBlocksPage from './pages/latestBlocks/LatestBlocksPage';
import BlockPage from './pages/block/BlockPage';

export type RouteConfig = {
  component: ComponentType<any>,
  path: string,
};

export type Routes = Array<RouteConfig>;

const routes: Routes = [
  {
    component: BlockPage,
    path: '/block/:id',
    exact: true,
  },
  {
    component: LatestBlocksPage,
    path: '/',
    exact: true,
  },
];

export default routes;
