import {request} from "@/utils/request"

export function formatData(data) {
    return request({
            method: 'post',
            url: '/tools/format',
            data
        }
    )
}


export function getTenderMeta(data) {
    return request({
            method: 'post',
            url: '/tools/tender/pop',
            data
        }
    )
}


export function clearTenderMeta(data) {
    return request({
            method: 'post',
            url: '/tools/tender/clear',
            data
        }
    )
}