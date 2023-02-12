// 引入mockjs
import Mock from 'mockjs'
// 引入JSON数据
import province from './province.json'
import QuestionsAPI from './questions'

// mock数据: 第一个参数(请求得地址)  第二个参数(请求数据)
Mock.mock('/mock/province', { code: 200, data: province })
Mock.mock(/\/mock\/randoms\.*/, 'get', QuestionsAPI.list)
Mock.mock(/\/mock\/randoms\.*/, 'delete', QuestionsAPI.delete)
