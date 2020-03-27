import { ApplyPluginsType } from 'D:/Work/Project/wetrial-module-template/node_modules/@umijs/runtime/dist/index.js';
import { plugin } from './plugin';

const routes = [
  {
    "path": "/",
    "component": require('D:/Work/Project/wetrial-module-template/packages/module/src/.umi/plugin-layout/Layout.tsx').default,
    "routes": [
      {
        "path": "/dashboard",
        "exact": true,
        "component": require('@/pages/dashboard/index.tsx').default
      },
      {
        "path": "/sample/list/edit",
        "exact": true,
        "component": require('@/pages/sample/list/edit.tsx').default
      },
      {
        "path": "/sample/list",
        "exact": true,
        "component": require('@/pages/sample/list/index.tsx').default
      }
    ]
  }
];

// allow user to extend routes
plugin.applyPlugins({
  key: 'patchRoutes',
  type: ApplyPluginsType.event,
  args: { routes },
});

export { routes };
