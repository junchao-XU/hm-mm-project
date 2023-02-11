import request from '@/utils/request'
/**
 *  获取菜单列表
 * **/
export const getMenuListApi = () => request.get('/menus')
