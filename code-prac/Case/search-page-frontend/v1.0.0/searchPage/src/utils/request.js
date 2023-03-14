/*
 * @Author: your name
 * @Date: 2022-02-15 20:38:55
 * @LastEditTime: 2022-02-23 19:18:49
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \code\searchPage\src\utils\request.js
 */
import axios from 'axios'
import store from '@/store'
import {LOGIN_OUT} from "@/store/mutation-types"
import {Message} from 'element-ui'
import router from '@/router'
function reCertification(href) {
    if(href.indexOf('http') !== -1) {
        console.log('web端环境')

    }
    if(href.indexOf('extension') !== -1) {
        console.log('插件环境')
        let suffixUrl = href.split('#/')
        let wholeUrl = suffixUrl[0] + '#/login'
        console.log(wholeUrl)
    }

}
export function request(config) {
    //console.log('request中的router', router)
    const instance = axios.create({
        baseURL: `http://${Config.ip}:${Config.port}`,
        timeout: `${Config.timeout}`
    })

    instance.interceptors.request.use(config => {
        config.headers['Content-Type'] = 'application/json'
        config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('Authorization')
        // console.log(config)
        return config
    }, err => {
        console.log(err)
        Promise.reject(error)
    })


    instance.interceptors.response.use(res => {
        return res.data
    }, err => {
        if (err.response) {
            switch (err.response.status) {
                case 401:
                    store.commit(LOGIN_OUT) // 清除前端token
                    Message({
                        message: '认证失效，请重新登录',
                        type: 'warning'
                    })
                    //window.location.href = '/'
                    //window.location.reload()
                    // 适配插件里的问题，但多浏览器端登录会有问题
                    //window.history.back(-1)
                    let href = window.location.href
                    console.log('href', href)
                    let suffixUrl = href.split('#/')
                    let wholeUrl = suffixUrl[0] + '#/home'
                    console.log(wholeUrl)
                    window.location.href= wholeUrl
                    break
                default:
                    break
            }
        }
        console.log(err)
        Promise.reject(err)
    })

    return instance(config)
}
