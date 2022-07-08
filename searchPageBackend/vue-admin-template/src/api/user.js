import request from '@/utils/request'

export function login(data) {
    return request({
        url: '/user/sign-in',
        method: 'post',
        data
    })
}

export function getInfo(Id) {
    return request({
        url: '/sys/user/getOne',
        method: 'get',
        params: {
            Id
        }
    })
}

export function logout() {
    return request({
        url: '/user/sign-out'
    })
}

// 分页获取用户管理列表
export function getUserList(data) {
    return request({
        method: 'post',
        url: '/sys/user/getList',
        data
    })
}

// 删除用户管理
export function deleteUserList(data) {
    return request({
        method: 'post',
        url: '/sys/user/delete',
        data
    })
}

// 修改用户管理
export function modifyUserList(data) {
    return request({
        method: 'post',
        url: '/sys/user/update',
        data
    })
}
// import requestFront from '@/utils/request-front'

export function getInfoFront() {
    return request({
        baseURL: 'http://1.13.245.78:80', // 请求另外的端口，重写baseURL字段，注意vue.config.js的devServer里的proxy字段，要多配一个值
        url: '/user/info'
    })
}