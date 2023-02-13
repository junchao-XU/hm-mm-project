import request from '@/utils/request'
/**
 *  获取菜单列表
 * **/
export const getMenuListApi = () => request.get('/menus')

/**
 *  添加菜单列表
 * **/
export const addMenuListApi = (data) => request.post('/menus', data)
/**
 *  删除菜单列表
 * **/
export const DelMenuListApi = (id) => request.delete(`/menus/${id}`)
/**
 *  获取菜单详情
 * **/
export const getMenuDetailApi = (id) => request.get(`/menus/${id}`)
/**
 *  修改菜单详情
 * **/
export const editMenuDetailApi = (data) =>
  request.put(`/menus/${data.id}`, data)
