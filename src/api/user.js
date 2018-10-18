import request from '@/utils/request'

// 查询员工信息列表
export function pagination(data) {
  return request({
    url: '/service/user/pagination',
    method: 'post',
    data
  })
}
// 添加员工(管理员直接添加)
export function addUser(data) {
  return request({
    url: '/service/user/addUser',
    method: 'post',
    data
  })
}
// 修改员工信息
export function updateUser(data) {
  return request({
    url: '/service/user/updateUser',
    method: 'post',
    data
  })
}
// 删除员工信息
export function deleteUser(data) {
  return request({
    url: '/service/user/deleteUser',
    method: 'post',
    data
  })
}
// 根据id查询员工信息
export function selectUserById(data) {
  return request({
    url: '/service/user/selectUserById?id=' + data,
    method: 'post'
  })
}
// 条件查询员工
export function selectUserByQuery(data) {
  return request({
    url: '/service/user/selectUserByQuery',
    method: 'post',
    data
  })
}
// 修改账号状态
export function updateUserIsuse(data) {
  return request({
    url: '/service/user/updateUserIsuse',
    method: 'post',
    data
  })
}
// 修改员工密码
export function updateUserPwd(data) {
  return request({
    url: '/service/user/updateUserPwd',
    method: 'post',
    data
  })
}
// 查看详情
export function selectUserInfo(data) {
  return request({
    url: '/service/user/selectUserInfo',
    method: 'post',
    data
  })
}
