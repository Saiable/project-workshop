
import {request} from "@/utils/request"

export function getBackgroundData() {
  return request({url: '/img'})
}

export function getSearchIconData() {
    return request({url: '/search/engine'})
}

export function getSearchData(params) {
    return request({
        url: '/search/keyword',
        params: {
            query: params
        }
    })
}

export function getMotoData() {
    return request({
        url: '/search/hitokoto'
    })
}
// 添加搜索引擎
export function addEngineUrl(data) {
    return request({
        method: 'post',
        url: '/search/engine/add',
        data
    })
}

// 添加搜索引擎
export function modifyEngineUrl(data) {
    return request({
        method: 'post',
        url: '/search/engine/modify',
        data
    })
}

// 删除搜索引擎
export function deleteEngineUrl(data) {
    return request({
        method: 'post',
        url: '/search/engine/delete',
        data
    })
}

// 默认搜索引擎
export function defalutEngine() {
    return request({
        url: '/search/default-engine'
    })
}
