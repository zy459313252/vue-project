import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'

export const constantRoutes = [
  { path: '/redirect', component: Layout, hidden: true, children: [
    {
      path: '/redirect/:path(.*)',
      component: () => import('@/views/redirect/index')
    }
  ]
  },
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/auth-redirect', component: () => import('@/views/login/auth-redirect'), hidden: true },
  { path: '/404', component: () => import('@/views/error-page/404'), hidden: true },
  { path: '/401', component: () => import('@/views/error-page/401'), hidden: true },
  { path: '/', component: Layout, redirect: '/dashboard',
    children: [
      {
        path: 'dashboard', name: 'Dashboard', component: () => import('@/views/dashboard/index'),
        meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
      },
      {
        path: 'baseData', name: 'BaseData', component: () => import('@/views/baseData/index'),
        meta: { title: '基础数据', icon: 'dashboard', affix: false }
      }
    ]
  }
]

/**
 * asyncRoutes
 * 需要根据角色加载路由
 */
export const asyncRoutes = [

  /** when your routing map is too long, you can split it into small modules **/

  // {
  //   path: '/error', component: Layout, redirect: 'noRedirect', name: 'ErrorPages',
  //   meta: { title: 'Error Pages', icon: '404' },
  //   children: [
  //     { path: '401', component: () => import('@/views/error-page/401'), name: 'Page401', meta: { title: '401', noCache: true }},
  //     { path: '404', component: () => import('@/views/error-page/404'), name: 'Page404', meta: { title: '404', noCache: true }}
  //   ]
  // },
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
