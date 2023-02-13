import { getToken, setToken, removeToken } from '@/utils/auth'
import { getUserInfoApi } from '@/api/user'

const getDefaultState = () => {
  return {
    token: getToken() || '',
    userInfo: {}
  }
}

const state = getDefaultState()

const mutations = {
  // 设置token
  SET_TOKEN: (state, token) => {
    setToken(token)
    state.token = token
  },
  // 清除token
  REMOVE_TOKEN(state) {
    state.token = ''
    removeToken()
  },
  // 设置个人信息
  SET_USER_INFO(state, userInfo) {
    state.userInfo = userInfo
  },
  // 清除个人信息
  REMOVE_USER_INFO(state) {
    state.userInfo = {}
  }
}

const actions = {
  // 获取个人信息
  async getuserInfo({ commit }) {
    const userInfo = await getUserInfoApi()
    commit('SET_USER_INFO', userInfo)
  },
  // 退出登录
  Login_Out({ commit }) {
    commit('REMOVE_TOKEN')
    commit('REMOVE_USER_INFO')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
