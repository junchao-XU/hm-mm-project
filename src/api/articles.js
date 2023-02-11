import request from '@/utils/request'

// 文章列表
export const ArticleListApi = (get) => request.get('/articles', get)
