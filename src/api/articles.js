import request from '@/utils/request'

// 文章列表
export const ArticleListApi = (params) => request.get('/articles', { params })
// 文章添加
export const ArticleEditorApi = (data) => request.post('/articles', data)
// 文章状态
export const ArticleStatusApi = (params) =>
  request.post(`/articles/${params.id}/${params.state}`, params)
// 文章编辑
export const ArticleModificationApi = (data) =>
  request.put(`/articles/${data.id}`, data)

// 文章详情
export const ArticleDetailsApi = (id) => request.get(`/articles/${id}`)

// 删除文章
export const ArticleDeleteApi = (id) => request.delete(`/articles/${id}`)
