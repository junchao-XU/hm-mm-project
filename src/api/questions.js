import request from '@/utils/request'

// 获取基础题库列表
export const getBasicsListApi = (params) => request.get('/questions', { params })
