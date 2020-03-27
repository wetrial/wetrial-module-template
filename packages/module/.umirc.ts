import { defineConfig, utils } from 'umi';

export default defineConfig({
  runtimePublicPath: true,
  antd: {},
  request: false,
  layout: {
    title: 'Wetrial',
    theme: 'light',
    locale: false,
  },
  dva: {
    immer: true,
    hmr: true,
    skipModelValidate: true,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: false,
  },
  // dynamicImport: {
  //   loading: '@/components/PageLoading/index',
  // },
  // 暂时关闭
  pwa: false,
  history: {
    type: 'browser',
  },
  hash: true,
  targets: {
    ie: 11,
  },
});
