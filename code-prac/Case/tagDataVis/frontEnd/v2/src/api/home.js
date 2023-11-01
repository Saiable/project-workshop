import {
    request
} from "@/utils/request";

export function getMergeConfig() {
    return request({
        url: '/readme_merge.json'
    })
}

// 获取项目列表
export function getProjectListApi() {
    return request({
        url: '/dataTask/project/list/'
    })
}

// 新增项目
export function addProjectApi(data) {
    return request({
        method: 'post',
        url: '/dataTask/project/add/',
        data
    })
}

// 检查项目编码是否存在
export function projectIdCheckApi(params) {
    return request({
        url: '/dataTask/project/project_id_check/',
        params: params
    })
}

// 修改项目信息
export function projectUpdateApi(data) {
    return request({
        method: 'post',
        url: '/dataTask/project/project_update/',
        data
    })
}

// 获取所有的batch
export function batchListApi() {
    return request({
        url: '/dataTask/batch/list/'
    })
}

// 新增任务
export function addBatchApi(data) {
    return request({
        method: 'post',
        url: '/dataTask/batch/add/',
        data
    })
}

// 修改任务信息
export function batchUpdateApi(data) {
    return request({
        method: 'post',
        url: '/dataTask/project/batch_update/',
        data
    })
}
