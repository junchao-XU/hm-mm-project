import request from '@/utils/request'
/**
 *  获取标签列表
 * **/
export const gettagsListApi = (params) => request.get('/tags', { params })
/**
 *  删除标签
 * **/
export const delTagsListApi = (id) => request.delete(`/tags/${id}`)
/**
 *  添加标签列表
 * **/
export const addTagsApi = (data) => request.post(`/tags`, data)
/**
 *  编辑标签
 * **/
export const editTagsApi = (data) => request.put(`/tags/${data.id}`, data)
/**
 *  获取标签详情
 * **/
export const gettagsDetaliApi = (id) => request.get(`/tags/${id}`)
