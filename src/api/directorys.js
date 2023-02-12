import request from '@/utils/request'
/**
 *  获取目录列表
 * **/
export const getDirectorysListApi = (params) =>
  request.get('/directorys', { params })
/**
 *  删除列表
 * **/
export const deldirectorsjectApi = (id) => request.delete(`/directorys/${id}`)

/**
 *  修改目录
 * **/
export const editdirectorystApi = (data) =>
  request.put(`/subjects/${data.id}`, data)
/**
 *  添加目录
 * **/
export const addDirectorsApi = (data) => request.post(`/directorys`, data)
/**
 *  编辑目录
 * **/
export const editDirectorsApi = (data) =>
  request.put(`/directorys/${data.id}`, data)
/**
 *  获取目录详情
 * **/
export const getDirectorsDetailApi = (id) => request.get(`/directorys/${id}`)
