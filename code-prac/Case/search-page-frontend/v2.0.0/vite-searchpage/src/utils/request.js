/*
 * @Author: sai 2495620791@qq.com
 * @Date: 2023-03-19 18:30:27
 * @LastEditors: sai 2495620791@qq.com
 * @LastEditTime: 2023-04-05 16:21:43
 * @FilePath: \saiable.github.iod:\workspace\github\code\project-workshop\code-prac\Case\search-page-frontend\v2.0.0\vite-searchpage\src\utils\request.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios from 'axios';
import serverConfig from "@/../server.config.js";
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
        return Promise.reject(err)
    })


    instance.interceptors.response.use(res => {
        return res.data
    }, err => {
        // if (err.response) {
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
        // }
        console.log(err)
        return Promise.reject(err)
    })

    return instance(config)


}
