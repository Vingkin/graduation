import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: '主页',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  }
]

export default new Router({
  routes: constantRouterMap
})
// export default new Router({
//   // mode: 'history', //后端支持可开
//   scrollBehavior: () => ({ y: 0 }),
//   routes: constantRouterMap
// })

export const asyncRouterMap = [
  {
    path: '/system',
    component: Layout,
    // redirect: '/users/table',
    name: 'system',
    meta: { title: '智慧系统', icon: 'example', role: ['admin', 'member'] },
    children: [
      {
        path: 'detection',
        name: 'detection',
        component: () => import('@/views/system/detection'),
        meta: { title: '垃圾检测', icon: 'table', role: ['admin', 'member'] }
      },
      {
        path: 'medical1',
        name: 'medical1',
        component: () => import('@/views/system/medical'),
        meta: { title: '肺部分割', icon: 'table', role: ['admin', 'member'] }
      },
      {
        path: 'medical2',
        name: 'medical2',
        component: () => import('@/views/system/medical'),
        meta: { title: '病灶分割', icon: 'table', role: ['admin', 'member'] }
      }
    ]
  },
  {
    path: '/users',
    component: Layout,
    // redirect: '/users/table',
    name: 'users',
    meta: { title: '账号管理', icon: 'user', role: ['admin', 'member'] },
    children: [
      {
        path: 'info',
        name: 'info',
        component: () => import('@/views/user/info'),
        meta: { title: '个人信息', icon: 'user', role: ['admin', 'member'] }
      },
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/test/test'),
        meta: { title: '修改密码', icon: 'table', role: ['admin', 'member'] }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/user/list'),
        meta: { title: '管理用户', icon: 'tree', role: ['admin'] }
      }
    ]
  },
  { path: '/404', component: () => import('@/views/404'), hidden: true }
]

// {
//   path: '/hospitalSet',
//   component: Layout,
//   redirect: '/hospitalSet/table',
//   name: '医院设置管理',
//   alwaysShow: true,
//   meta: { title: '医院设置管理', icon: 'example' },
//   children: [
//     {
//       path: 'list',
//       name: '医院设置列表',
//       component: () => import('@/views/hospitalset/list'),
//       meta: { title: '医院设置列表', icon: 'table' }
//     }
//   ]
// },
// {
//   path: '/hospital',
//   component: Layout,
//   redirect: '/hospital/table',
//   name: '医院管理',
//   alwaysShow: true,
//   meta: { title: '医院管理', icon: 'example' },
//   children: [
//     {
//       path: 'list',
//       name: '医院列表',
//       component: () => import('@/views/hospital/list'),
//       meta: { title: '医院列表', icon: 'table' }
//     },
//     {
//       path: 'show/:id',
//       name: '查看',
//       component: () => import('@/views/hospital/show'),
//       meta: { title: '查看', noCache: true },
//       hidden: true
//     },
//     {
//       path: 'schedule/:hoscode',
//       name: '排班',
//       component: () => import('@/views/hospital/schedule'),
//       meta: { title: '排班', noCache: true },
//       hidden: true
//     }
//   ]
// },
// {
//   path: '/cmn',
//   component: Layout,
//   redirect: '/cmn/list',
//   name: '数据管理',
//   alwaysShow: true,
//   meta: { title: '数据管理', icon: 'example' },
//   children: [
//     {
//       path: 'list',
//       name: '数据字典',
//       component: () => import('@/views/dict/list'),
//       meta: { title: '数据字典', icon: 'table' }
//     }
//   ]
// },




