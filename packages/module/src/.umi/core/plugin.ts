import { Plugin } from 'D:/Work/Project/wetrial-module-template/node_modules/@umijs/runtime/dist/index.js';

const plugin = new Plugin({
  validKeys: ['patchRoutes','rootContainer','render','onRouteChange','dva','getInitialState','locale','locale','layout',],
});
plugin.register({
  apply: require('D:/Work/Project/wetrial-module-template/packages/module/src/.umi/plugin-dva/runtime.tsx'),
  path: 'D:/Work/Project/wetrial-module-template/packages/module/src/.umi/plugin-dva/runtime.tsx',
});
plugin.register({
  apply: require('../plugin-initial-state/runtime'),
  path: '../plugin-initial-state/runtime',
});
plugin.register({
  apply: require('D:/Work/Project/wetrial-module-template/packages/module/src/.umi/plugin-locale/runtime.tsx'),
  path: 'D:/Work/Project/wetrial-module-template/packages/module/src/.umi/plugin-locale/runtime.tsx',
});
plugin.register({
  apply: require('@@/plugin-layout/runtime.tsx'),
  path: '@@/plugin-layout/runtime.tsx',
});
plugin.register({
  apply: require('../plugin-model/runtime'),
  path: '../plugin-model/runtime',
});

export { plugin };
