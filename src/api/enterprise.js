import request from '@/utils/request'
import mockRequest from '@/utils/mockRequest'

// 获取省份列表
export const getProvinceApi = () => mockRequest.get('/province')
// 获取企业管理列表
export const getCompanysListApi = (params) => request.get(`/companys`, { params })
// 企业管理添加
export const addCompanysApi = (data) => request.post('/companys', data)
// 企业管理修改
export const editCompanysApi = (data) => request.put(`/companys/${data.id}`, data)
// 企业管理详情
export const getCompanysInfoApi = (id) => request.get(`/companys/${id}`)
// 删除企业管理
export const deleteCompanysApi = (id) => request.delete(`/companys/${id}`)
// 企业管理状态设置
export const CompanysStateApi = (id, state) => request.post(`/companys/${id}/${state}`)

