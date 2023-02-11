import request from '@/utils/request'
/**
 *  获取用户列表
 * **/
export function getUserListApi(params) {
  return request({
    url: '/users',
    method: 'GET',
    params
  })
}
/**
 *  获取用户详情
 * **/
export const getUserInfoDetailApi = (id) => request.get(`/users/:${id}`)
/**
 *  获取用户详情
 * **/
export const addUserApi = (data) => request.post('/users', data)
