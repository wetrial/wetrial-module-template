import React from 'react';
import { Link, history } from 'umi';
import { stringify } from 'qs';
import { ILayoutRuntimeConfig, IBestAFSRoute } from '@umijs/plugin-layout';
import { BasicLayoutProps, DefaultFooter } from '@ant-design/pro-layout';
// import { omit } from 'lodash';
// import { UnAuthorizedException } from '@wetrial/core/exception';
import { configUseFormTableFormatResult } from '@wetrial/hooks';
import { Routes as TemplateRoutes } from '@wetrial/sample';
import { configIconUrl } from '@/components/IconFont';
import defaultSettings from '@config/defaultSettings';
import { getCurrentUser } from '@/services/account';
import { ICurrentUser } from '@/models/account';
import { getToken, clearToken } from '@wetrial/core/authority';
import { configApiPreFix } from '@wetrial/core/constants';
import {
  addRequestInterceptor,
  addResponseInterceptor,
  commonRequestInterceptor,
  commonResponseInterceptor,
} from '@wetrial/core/request';
import logo from './assets/logo.png';
// import 'dayjs/locale/zh-cn';
// import { notification } from 'antd';

configIconUrl(defaultSettings.iconfontUrl);
configUseFormTableFormatResult(data => {
  return {
    total: data.totalCount,
    list: data.items,
  };
});
addRequestInterceptor(...commonRequestInterceptor);
addResponseInterceptor(...commonResponseInterceptor);
configApiPreFix('/api/');

export function render(oldRender) {
  oldRender();
}

const requireLoadRoute = (route: any) => {
  if (route.component) {
    debugger;
    // eslint-disable-next-line
    route.component = require(route.component).default;
  }
  if (route.routes && route.routes.length > 0) {
    // eslint-disable-next-line no-param-reassign
    route.routes = route.routes.map(item => requireLoadRoute(item));
  }
  return route;
};

export function patchRoutes({ routes }: { routes: any[] }) {
  const subAppRoutes = [...TemplateRoutes];

  // routes[0].routes.unshift({
  //   path: '/sample',
  //   name: 'sample',
  //   // exact: true,
  //   routes: [
  //     {
  //       path: '/sample/list',
  //       name: '列表',
  //       exact: true,
  //       component: require('@wetrial/sample/lib/pages/dashboard/index').default,
  //     },
  //     {
  //       path: '/sample/list/edit/:id?',
  //       exact: true,
  //       component: require('@wetrial/sample/lib/pages/dashboard/index').default,
  //     },
  //   ],
  // });

  subAppRoutes.forEach(item => {
    const newRoute = requireLoadRoute(item);
    routes[0].routes.unshift(newRoute);
  });
  console.log(routes);
}

export async function getInitialState() {
  const token = getToken();
  const {
    // @ts-ignore
    location: { pathname },
  } = history;
  const loginPathName = '/account/login';
  // 未登录的情况
  if (!token) {
    if (pathname !== loginPathName) {
      // @ts-ignore
      history.push({
        pathname: loginPathName,
        query: {
          redirect: pathname,
        },
      });
    }
    return {};
  } else {
    return (await getCurrentUser()) as ICurrentUser;
  }
}

export const dva = {
  config: {
    onError(err) {
      console.error(err);
      // if (err instanceof UnAuthorizedException) {
      //   const unAuthorizedErr = err as UnAuthorizedException;
      //   notification.info({
      //     message: unAuthorizedErr.message,
      //   });

      //   // eslint-disable-next-line no-console
      //   console.log(unAuthorizedErr.message);
      // } else {
      //   // eslint-disable-next-line no-console
      //   console.error(err);
      // }
      err.preventDefault();
    },
  },
};

export const layout: ILayoutRuntimeConfig & BasicLayoutProps = {
  logout: () => {
    clearToken();
    const {
      location: { pathname },
    } = history;

    if (pathname !== '/account/login') {
      history.push({
        pathname: '/account/login',
        search: stringify({
          redirect: pathname,
        }),
      });
    }
  },
  navTheme: 'light',
  errorBoundary: {
    /** 发生错误后的回调（可做一些错误日志上报，打点等） */
    onError: (error, info) => {
      console.error(error, info);
    },
    /** 发生错误后展示的组件，接受 error */
    ErrorComponent: error => {
      return <div>{error}</div>;
    },
  },
  logo,
  iconfontUrl: defaultSettings.iconfontUrl,
  menuHeaderRender: (logoDom, titleDom) => {
    return (
      <Link to="/">
        {logoDom}
        {titleDom}
      </Link>
    );
  },
  // siderWidth: 200,
  contentStyle: {
    padding: '10px 10px 0 10px',
    minHeight: 'calc(100vh - 84px)',
  },
  menuItemRender: (menuItemProps, defaultDom) => {
    if (menuItemProps.isUrl || menuItemProps.children || !menuItemProps.path) {
      return defaultDom;
    }

    return <Link to={menuItemProps.path}>{defaultDom}</Link>;
  },
  breadcrumbRender: (routers = []) => [
    {
      path: '/',
      breadcrumbName: '首页',
    },
    ...routers,
  ],
  itemRender: (route, params, routes, paths) => {
    const first = routes.indexOf(route) === 0;
    return first ? (
      <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
    ) : (
      <span>{route.breadcrumbName}</span>
    );
  },
  footerRender: () => <DefaultFooter links={[]} copyright="2020 湖南微试云技术团队" />,
  // rightContentRender: RightContent,
};
