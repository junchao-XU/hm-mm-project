import request from '@/utils/request'
import mockRequest from '@/utils/mockRequest'

// 获取省份列表
export const getProvinceApi = () => mockRequest.get('/province')
// 获取企业管理列表
export const getCompanysListApi = (params) => request.get(`/companys`, { params })
