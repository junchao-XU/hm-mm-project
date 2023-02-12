import request from '@/utils/request'
/**
 *  获取学科列表
 * **/
export const getSubjectListApi = (params) =>
  request.get('/subjects', { params })
/**
 *  获取添加列表
 * **/
export const AddSubjectApi = (data) => request.post('/subjects', data)
/**
 *  获取学科详情
 * **/
export const getsubjectDetailApi = (id) => request.get(`/subjects/${id}`)
/**
 *  删除学科
 * **/
export const delSubjectApi = (id) => request.delete(`/subjects/${id}`)
/**
 *  修改学科详情
 * **/
export const editsubjectApi = (data) =>
  request.put(`/subjects/${data.id}`, data)
/**
 *  获取学科简单列表
 * **/
export const getsubjectSimpleDetailApi = (params) =>
  request.get(`/subjects/simple`, params)
