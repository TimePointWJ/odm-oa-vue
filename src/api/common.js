import request from '@/utils/request'

// 数据词典
export function dictionaryList(data) {
  return request({
    url: '/common/dictionaryList?codeType=' + data,
    method: 'post'
  })
}
// 查询部门列表
export function branchList(data) {
  return request({
    url: '/common/branchList',
    method: 'post',
    data
  })
}
// 查询父部门列表
export function rootList(data) {
  return request({
    url: '/common/rootList',
    method: 'post',
    data
  })
}

