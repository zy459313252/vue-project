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
        path: 'dashboard', component: () => import('@/views/dashboard/index'), name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', affix: false }
      }
    ]
  },
  {
    path: '/baseData', component: Layout, children: [
      {
        path: 'index',
        component: () => import('@/views/baseData/index'),
        name: 'baseData',
        meta: { title: '基本数据', icon: 'documentation', affix: true }
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
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
