import {request} from "@/utils/request"

export function getBookmarkData(params) {
    return request({
            url: '/bookmark',
            params: {
                query: params
            }
        }
    )
}

export function getBookmarkDirData() {
    return request({
            url: '/bookmark/list-dir',
        }
    )
}

export function deleteBookmarkData(data) {
    return request({
            method: 'post',
            url: '/bookmark/delete',
            data
        }
    )
}

export function setBookmarkData(data) {
    return request({
            method: 'post',
            url: '/bookmark/modify',
            data
        }
    )
}

export function addBookmarkData(data) {
    return request({
            method: 'post',
            url: '/bookmark/add',
            data
        }
    )
}

// 搜索书签内容（对标题和url进行搜索）

export function searchBookMarkData(params) {
    return request({
        url: '/bookmark/search',
        params: {
            query: params
        }
    })
}


// 用于书签插件的精准匹配搜索
export function searchCrxBookMarkData(params) {
    return request({
        url: '/bookmark/crx-search',
        params: {
            query: params
        }
    })
}