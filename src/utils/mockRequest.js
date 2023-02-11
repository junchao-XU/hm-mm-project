import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { Message } from 'element-ui'

const request = axios.create({
  baseURL: '/mock',
  timeout: 5000 // request timeout
})

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 加上请求头
    if (store.getters.token) config.headers.Authorization = `Bearer ${store.getters.token}`
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    // token过期
    if (error.response && error.response.data && error.response.data.code === 10002) {
      store.dispatch('user/Login_Out')
      router.replace('/login')
      Message.error('请重新登录')
    } else {
      // 其他错误提示
      if (error.message === 'timeout of 5000ms exceeded') Message.error('网络有点慢哦!')
      else if (error.message === 'Network Error') Message.error('网络出问题了!')
      else Message.error(error.message)
    }
    return Promise.reject(error)
  }
)

export default request
