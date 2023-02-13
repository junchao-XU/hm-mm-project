import request from '@/utils/request'
// import Mockrequset from '@/utils/mockRequest'

// 获取基础题库列表
export const getBasicsListApi = (params) => request.get('/questions', { params })
// 获取学科列表
export const getDisciplineApi = () => request.get('/subjects/simple')
// 获取录入人列表
export const getUsersListApi = () => request.get('/users/simple')
// 获取二级目录
export const getDirectorysApi = (subjectID) => request.get(`/directorys/simple`, { params: { subjectID }})
// 获取标签列表
export const getTagsListApi = (subjectID) => request.get('/tags/simple', { params: { subjectID }})
// 删除基础题
export const deleteBasicsApi = (id) => request.delete(`/questions/${id}`)
// 加入精选题库
export const addSelectApi = (params) => request.patch(`/questions/choice/${params.id}/${params.choiceState}`)
// 题目预览获取详情
export const getPreviewInfoApi = (id) => request.get(`/questions/${id}`)
// 基础题库添加
export const addBasicsApi = (data) => request.post('/questions', data)
// 基础题库修改
export const editBasicsApi = (data) => request.put(`/questions/${data.id}`, data)
// 获取精选题库列表
export const getSelectListApi = (params) => request.get('/questions/choice', { params })
// 试题审核
export const ChangeAuditApi = (data) => request.post(`/questions/check/${data.id}`, data)
// 上下架
export const UpDownApi = (id, publishState) => request.post(`/questions/choice/${id}/${publishState}`)
// 获取组题列表
export const getTitleListApi = (params) => request.get('/mock/randoms', { params })
// 删除题目
export const deleteTileApi = (data) => request.delete(`/mock/randoms`, { data: data })
