import React, { lazy } from 'react';

const routes = [
  {
    path: '/playground',
    component: lazy(() => import('../pages/playground')),
  },
];

export default routes;
