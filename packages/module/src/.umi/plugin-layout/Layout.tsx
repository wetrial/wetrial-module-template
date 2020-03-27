import React from 'react';
import { ApplyPluginsType } from 'umi';
import { plugin } from '../core/umiExports';

export default (props) => {
  const runtimeConfig = plugin.applyPlugins({
    key: 'layout',
    type: ApplyPluginsType.modify,
    initialValue: {},
  }) || {};
  const userConfig = {
    ...{'name':'@wetrial/template','theme':'light','locale':false,'showBreadcrumb':true,'title':'Wetrial'},
    ...runtimeConfig
  };
  return React.createElement(require('D:/Work/Project/wetrial-module-template/node_modules/@umijs/plugin-layout/lib/layout/index.js').default, {
    userConfig,
    ...props
  })
}
