/* eslint-disable */
import request from '@/utils/request'

//第一层次的文件展示
export function folderList(data){
    return request({
        url: '/service/doc/folderList',
        method: 'post',
        data
    })
}

//@click点击icon 搜索此文件夹关联的子文件全部列出来
export function findCFile(data){
    return request({
        url: '/service/doc/findCFile',
        method: 'post',
        data
    })
}

//@click点击icon 搜索此文件夹关联的子文件夹全部列出来
export function findCFolder(data){
    return request({
        url: '/service/doc/findCFolder',
        method: 'post',
        data
    })
}
//新建文件夹
export function createFolder(data){
    return request({
        url: '/service/doc/createFolder',
        method: 'post',
        data
    })
}
//删除文件夹
export function deleteFolder(data){
    return request({
        url: '/service/doc/deleteFolder',
        method: 'post',
        data
    })
}
//删除文件
export function deleteFile(data){
    return request({
        url: '/service/doc/deleteFile',
        method: 'post',
        data
    })
}
//修改文件夹
export function updateFolder(data){
    return request({
        url: '/service/doc/updateFolder',
        method: 'post',
        data
    })
}
//显示根目录
export function showOriginDir(data){
    return request({
        url: '/service/doc/showOriginDir',
        method: 'post',
        data
    })
}
//上传文件
export function newVideo(data){
    return request({
        url: '/service/doc/upload',
        method: 'post',
        data
    })
}
//下载文件
export function download(data){
    return request({
        url: '/service/doc/download',
        method: 'post',
        data
    })
}
//分享
export function shareFolder(data){
    return request({
        url: '/service/doc/shareFolder',
        method: 'post',
        data
    })
}
//@click点击icon 搜索此文件夹关联的子文件夹全部列出来
export function findShareCFolder(data){
    return request({
        url: '/service/doc/findShareCFolder',
        method: 'post',
        data
    })
}
//显示根目录
export function showShareOriginDir(data){
    return request({
        url: '/service/doc/showShareOriginDir',
        method: 'post',
        data
    })
}