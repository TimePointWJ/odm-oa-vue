import request from '@/utils/request'

// 查询部门信息列表
export function paginationBranch(data) {
  return request({
    url: '/service/dept/paginationBranch',
    method: 'post',
    data
  })
}
// 添加部门列表
export function insertDept(data) {
  return request({
    url: '/service/dept/insertDept',
    method: 'post',
    data
  })
}
// 修改部门信息列表
export function updateDept(data) {
  return request({
    url: '/service/dept/updateDept',
    method: 'post',
    data
  })
}
// 删除部门信息列表
export function deleteDept(data) {
  return request({
    url: '/service/dept/deleteDept',
    method: 'post',
    data
  })
}
// 删除部门信息列表
export function selectDept(data) {
  return request({
    url: '/service/dept/selectDept',
    method: 'post',
    data
  })
}

