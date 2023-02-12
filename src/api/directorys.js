import request from '@/utils/request'
/**
 *  获取目录列表
 * **/
export const getDirectorysListApi = (params) =>
  request.get('/directorys', { params })
/**
 *  添加列表
 * **/
export const AddSubjectApi = (data) => request.post('/subjects', data)
/**
 *  删除列表
 * **/
export const delSubjectApi = (id) => request.delete(`/directorys/${id}`)
/**
 *  获取学科详情
 * **/
export const getsubjectDetailApi = (id) => request.get(`/subjects/${id}`)
/**
 *  修改学科详情
 * **/
export const editsubjectApi = (data) =>
  request.put(`/subjects/${data.id}`, data)
