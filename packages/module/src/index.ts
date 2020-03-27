import { IBestAFSRoute } from '@umijs/plugin-layout';

const name = '@wetrial/template';

function dgPatchRoute(route: IBestAFSRoute) {
  const tmpRoute = route;
  if (Array.isArray(route.routes)) {
    tmpRoute.routes = route.routes.map(item => dgPatchRoute(item));
  } else if (tmpRoute.component) {
    // @ 相对于src目录,其他相对于pages
    if (tmpRoute.component.startsWith('@')) {
      // exp:'@/pages/account/login' ==> '@wetrial/blogs/pages/account/login'
      tmpRoute.component = tmpRoute.component?.replace(/^@/, name);
    } else {
      // 只支持下面两种形式
      // exp:'account/login' ==> '@wetrial/blogs/pages/account/login'
      // exp:'../account/login' ==> '@wetrial/blogs/pages/account/login'
      tmpRoute.component = tmpRoute.component?.replace(/^()/, name);
      if (/^\w/.test(tmpRoute.component)) {
        tmpRoute.component = `${name}/${tmpRoute.component}`;
      } else {
        tmpRoute.component = tmpRoute.component?.replace(/^\.\./, name);
      }
    }
  }
  return tmpRoute;
}

/**
 * 将路由转换成模块化路由
 * @param routes 路由|路由列表
 */
function patchRoutePath(routes: IBestAFSRoute[]): IBestAFSRoute[] {
  let patchedRoutes;
  if (Array.isArray(routes)) {
    patchedRoutes = routes.map(route => dgPatchRoute(route));
  } else {
    patchedRoutes = [dgPatchRoute(routes)];
  }
  return patchedRoutes;
}

/**
 * 权限定义
 */
const Permissions = {
  template: {
    dashboard: {
      index: 'template.dashboard',
    },
    sample: {
      index: 'template.sample',
      list: {
        index: 'template.sample.list',
        edit: 'template.sample.list.edit',
        delete: 'template.sample.list.delete',
      },
    },
  },
};

// umi routes: https://umijs.org/zh/guide/router.html
const routes: IBestAFSRoute[] = [
  {
    path: '/template',
    menu: {
      name: '欢迎', // 兼容此写法
      // hideChildren:false,
      flatMenu: true,
    },
    routes: [
      {
        path: '/template',
        redirect: 'dashboard',
      },
      {
        path: 'dashboard',
        name: '看板',
        // icon: 'dashboard',
        access: Permissions.template.dashboard.index,
        component: '@/pages/template/dashboard/index',
      },
      {
        path: 'sample',
        name: '案例',
        access: Permissions.template.sample.index,
        // icon: 'smile',
        routes: [
          {
            path: '/template/sample',
            redirect: 'list',
          },
          {
            path: 'list',
            name: '列表',
            access: Permissions.template.sample.list.index,
            component: '@/pages/template/sample/list/index',
            exact: true,
          },
          {
            path: 'list/edit/:id?',
            component: '@/pages/template/sample/list/edit',
            access: Permissions.template.sample.list.edit,
            exact: true,
          },
        ],
      },
    ],
  },
];

export default Permissions;

export const Routes = patchRoutePath(routes);
