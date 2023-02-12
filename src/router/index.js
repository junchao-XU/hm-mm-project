import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '数据概览', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/base',
    component: Layout,
    meta: { title: '后台管理', icon: 'el-icon-user-solid' },
    children: [
      {
        path: 'user',
        name: 'user',
        component: () => import('@/views/background/user.vue'),
        meta: { title: '用户', icon: 'el-icon-menu' }
      },
      {
        path: 'menu',
        name: 'menu',
        component: () => import('@/views/background/menu.vue'),
        meta: { title: '菜单', icon: 'el-icon-menu' }
      },
      {
        path: 'permissions',
        name: 'permissions',
        component: () => import('@/views/background/permissions.vue'),
        meta: { title: '权限', icon: 'el-icon-menu' }
      },
      {
        path: 'logs',
        name: 'logs',
        component: () => import('@/views/background/logs.vue'),
        meta: { title: '日志', icon: 'el-icon-menu' }
      }
    ]
  },
  {
    path: '/companys',
    name: 'companys',
    component: Layout,
    children: [
      {
        path: '',
        name: 'companys',
        component: () => import('@/views/companys'),
        meta: { title: '企业管理', icon: 'el-icon-s-tools' }
      }
    ]
  },
  {
    path: '/questions',
    component: Layout,
    meta: { title: '题库管理', icon: 'el-icon-s-data' },
    children: [
      {
        path: 'list',
        name: 'list',
        component: () => import('@/views/questions/basics.vue'),
        meta: { title: '基础题库', icon: 'el-icon-menu' }
      },
      {
        path: 'choice',
        name: 'choice',
        component: () => import('@/views/questions/select.vue'),
        meta: { title: '精选题库', icon: 'el-icon-menu' }
      },
      {
        path: 'new/:id?',
        name: 'new',
        component: () => import('@/views/questions/input.vue'),
        meta: { title: '试题录入', icon: 'el-icon-menu' }
      },
      {
        path: 'randoms',
        name: 'randoms',
        component: () => import('@/views/questions/list.vue'),
        meta: { title: '组题列表', icon: 'el-icon-menu' }
      }
    ]
  },
  {
    path: '/subjects',
    name: 'subjects',
    component: Layout,
    meta: { title: '学科管理', icon: 'el-icon-s-claim' },
    children: [
      {
        path: 'discipline',
        name: 'discipline',
        component: () => import('@/views/subjects/disc.vue'),
        meta: { title: '学科', icon: 'el-icon-menu' }
      },
      {
        path: 'directorys',
        name: 'directorys',
        component: () => import('@/views/subjects/directorys.vue'),
        meta: { title: '目录', icon: 'el-icon-menu' }
      },
      {
        path: 'tags',
        name: 'tags',
        component: () => import('@/views/subjects/tags.vue'),
        meta: { title: '标签', icon: 'el-icon-menu' }
      }
    ]
  },
  {
    path: '/articles',
    name: 'articles',
    component: Layout,
    children: [
      {
        path: '',
        name: 'articles',
        component: () => import('@/views/articles'),
        meta: { title: '面试技巧', icon: 'el-icon-menu' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () =>
  new Router({
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
