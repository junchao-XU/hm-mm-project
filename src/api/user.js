import request from '@/utils/request'

// 登录
export const loginApi = (data) => request.post('/frame/login', data)
// 获取个人信息
export const getUserInfoApi = () => request.post('frame/profile')
