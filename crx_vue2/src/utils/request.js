
import axios from 'axios'
//import store from '@/store'
//import {LOGIN_OUT} from "@/store/mutation-types"
//import {Message} from 'element-ui'

export function request(config) {

    const instance = axios.create({
        baseURL: 'http://1.13.245.78:80',
        //timeout: `${Config.timeout}`
    })

    instance.interceptors.request.use(config => {
        config.headers['Content-Type'] = 'application/json'
        config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('Authorization')
        // config.headers['Authorization'] = 'Bearer ' + 'nynhH0Of3D2voKtx/silyJl5UTSGkfrFgiRcl/wXHS01rQM/r1izaqLj1xsqoNuE'
        console.log(config)
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
                    //store.commit(LOGIN_OUT)
                    //Message({
                    //    message: '认证失效，请重新登录',
                    //    type: 'warning'
                    //})
                    //window.location.href = '/#/home'
                    console.log('401错误了');
                    break
                default:
                    break
            }
        }
        console.log(err)
        Promise.reject(error)
    })

    return instance(config)
}
