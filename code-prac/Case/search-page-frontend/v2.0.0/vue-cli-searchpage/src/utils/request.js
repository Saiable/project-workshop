import axios from 'axios';
import serverConfig from "@/../public/serverConfig.js";
export function request(config) {
    const instance = axios.create({
        baseURL: serverConfig.baseURL,
        // timeout: `${Config.timeout}`
    })

    instance.interceptors.request.use(config => {
        config.headers['Content-Type'] = 'application/json'
        config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('Authorization')
        return config
    }, err => {
        console.log(err)
        Promise.reject(err)
    })


    instance.interceptors.response.use(res => {
        return res.data
    }, err => {
        if (err.response) {
            // switch (err.response.status) {
            //     case 401:
            //         // store.commit(LOGIN_OUT) // 清除前端token
            //         // Message({
            //         //     message: '认证失效，请重新登录',
            //         //     type: 'warning'
            //         // })

            //         // 适配插件里的问题，但多浏览器端登录会有问题
            //         let href = window.location.href
            //         console.log('href', href)
            //         let suffixUrl = href.split('#/')
            //         let wholeUrl = suffixUrl[0] + '#/home'
            //         console.log(wholeUrl)
            //         window.location.href = wholeUrl
            //         break
            //     default:
            //         break
            // }
        }
        console.log(err)
        Promise.reject(err)
    })

    return instance(config)


}
