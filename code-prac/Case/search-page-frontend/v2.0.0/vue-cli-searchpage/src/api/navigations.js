import {request} from "@/utils/request"

// 导航分类--用户--添加
export function addParentNavData(data) {
    return request({
            method: 'post',
            url: '/navigation/user-parent/add',
            data,
        }
    )
}

// 导航分类--用户--获取
export function getParentNavData() {
    return request({
            url: '/navigation/user-parent',
        }
    )
}

// 导航分类--用户--删除
export function deleteParentNavData(data) {
    return request({
            method: 'post',
            url: '/navigation/user-parent/delete',
            data,
        }
    )
}

// 导航分类--用户--编辑
export function setParentNavData(data) {
    return request({
            method: 'post',
            url: '/navigation/user-parent/modify',
            data,
        }
    )
}

//导航分类-子导航--用户--编辑
export function setChildNavData(data) {
    return request({
            method: 'post',
            url: '/navigation/user-sub/modify',
            data,
        }
    )
}

// 导航分类-子导航--用户--添加
export function addChildNavData(data) {
    return request({
            method: 'post',
            url: '/navigation/user-sub/add',
            data,
        }
    )
}


// 导航分类-子导航--用户--删除
export function deleteChildNavData(data) {
    return request({
            method: 'post',
            url: '/navigation/user-sub/delete',
            data,
        }
    )
}

// 导航分类_子导航--用户-获取
export function getChildNavData(params) {
    return request({
            url: '/navigation/user-sub',
            params: {
                query: params
            }
        }
    )
}

export function getUrlData(params) {
    return request({
            url: '/search/site-info',
            params: {
                query: params
            }
        }
    )
}

// 导航搜索
export function searchNavigationData(params) {
    return request({
            url: '/navigation/search',
            params: {
                query: params
            },
            //cancelToken: cancelToken,
        }
    )
}
// 导航排序
export function sortNavigationData(data) {
    return request({
            method: 'post',
            url: '/navigation/user-parent/sort',
            data
            //cancelToken: cancelToken,
        }
    )
}

//
// export function getNavigationParentData() {
//     return request({
//             url: '/navigation/parent',
//         }
//     )
// }















