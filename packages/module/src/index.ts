import { IBestAFSRoute } from '@umijs/plugin-layout';

const name = '@wetrial/sample';

function dgPatchRoute(route: IBestAFSRoute, parentPath: string = '') {
  const tmpRoute = route;
  // 如果不是绝对路由，使用上层路由合并
  if (tmpRoute.path && !tmpRoute.path.startsWith('/')) {
    tmpRoute.path = `${parentPath}/${tmpRoute.path}`;
  }
  if (Array.isArray(route.routes)) {
    tmpRoute.routes = route.routes.map(item => dgPatchRoute(item, route.path));
  } else if (tmpRoute.component) {
    // @ 相对于src目录,其他相对于pages
    if (tmpRoute.component.startsWith('@')) {
      // exp:'@/pages/account/login' ==> '@wetrial/blogs/pages/account/login'
      tmpRoute.component = tmpRoute.component?.replace(/^@/, `${name}/lib`);
    } else {
      // 只支持下面两种形式
      // exp:'account/login' ==> '@wetrial/blogs/pages/account/login'
      // exp:'../account/login' ==> '@wetrial/blogs/pages/account/login'
      // tmpRoute.component = tmpRoute.component?.replace(/^()/, name);

      // eslint-disable-next-line no-lonely-if
      if (/^\w/.test(tmpRoute.component)) {
        tmpRoute.component = `${name}/lib/pages/${tmpRoute.component}`;
      } else {
        tmpRoute.component = tmpRoute.component?.replace(/^(\.\.\/)/, `${name}/lib/pages/`);
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
  return routes.map(route => dgPatchRoute(route));
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
        component: 'dashboard/index',
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
            component: 'sample/list/index',
            exact: true,
          },
          {
            path: 'list/edit/:id?',
            component: 'sample/list/edit',
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
