import request from '@/utils/request'
/**
 *  获取用户列表
 * **/
export const getUserListApi = (params) => request.get('/users', { params })
/**
 *  获取用户详情
 * **/
export const getUserInfoDetailApi = (id) => request.get(`/users/${id}`)
/**
 *  添加用户
 * **/
export const addUserApi = (data) => request.post('/users', data)
/**
 *  删除用户
 * **/
export const deleteUserApi = (id) => request.delete(`/users/${id}`)
/**
 *  编辑用户
 * **/
export const editUserApi = (data) => request.put(`/users/${data.id}`, data)
