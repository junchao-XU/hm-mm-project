import store from './store'
import router from './router'
// ==> 白名单
const whiteList = ['/login', '/404']

// 前置守卫
router.beforeEach(async(to, from, next) => {
  // 获取token
  const token = store.getters.token
  if (token) {
    if (to.path === '/login') {
      next('/')
    } else {
      if (!store.getters.name) {
        await store.dispatch('user/getuserInfo')
        next({ ...to, replace: true })
      }
      next()
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})
