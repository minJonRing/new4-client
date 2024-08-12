import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

// system


import { route as UserRoute, component as UserComponent } from '@/modules/user/router'
// system


// 本地路由数据信息
export const routeAll = [
  UserRoute,
]

// 路由数据对应信息
export const devComponent = {
  ...UserComponent,
}

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * 基础路由
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  // 登录
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
  },
  // 注册
  {
    path: '/register',
    component: () => import('@/views/register/index'),
    hidden: true
  },
  // 忘记密码
  {
    path: '/forget',
    component: () => import('@/views/login/components/forget'),
    hidden: true
  },
  // 授权登录
  {
    path: '/authorization',
    component: () => import('@/views/authorization/index'),
    hidden: true
  },
  {
    path: '/404',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '',
        component: () => import('@/views/error-page/404'),
      }
    ]
  },
  {
    path: '/401',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '',
        component: () => import('@/views/error-page/401'),
      }
    ]
  },
  // 正式信息
  {
    path: '/',
    component: () => import('@/modules/home/views/index'),
    name: 'Home',
    meta: { title: '主页' }
  },
  {
    path: '/profile',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: '我的信息', icon: 'user', noCache: true }
      }
    ]
  },
  // 搜索列表
  {
    path: '/searchResult',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/searchResult/index'),
        name: 'SearchResult',
        meta: { title: '查询结果' }
      }
    ]
  },
  // 图书详情
  {
    path: '/file',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/books/detail'),
        name: 'FileDetail',
        meta: { title: '查询结果' }
      }
    ]
  },
  // 图书查看
  {
    path: '/mirador',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/read/index'),
        name: 'Mirador',
        meta: { title: '内容查看' }
      }
    ]
  },
  // 专题库
  {
    path: '/topic-library',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/searchResultTopicLibrary/index'),
        name: 'searchResultTopicLibrary',
        meta: { title: '查询结果' }
      }
    ]
  },
  {
    path: '/topic',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/topicLibrary/index'),
        name: 'TopicLibrary',
        meta: { title: '专题库' }
      }
    ]
  },
]

/**
 * 基础路由
 */
export const asyncRoutes = [
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

// 创建路由方法
const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

// 路由
const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
