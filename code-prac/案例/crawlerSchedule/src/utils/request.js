import axios from 'axios'
// import { Message } from 'element-ui'

export function request(config) {
    //console.log('request中的router', router)
    const instance = axios.create({
        // baseURL: `http://${Config.ip}:${Config.port}`,
        baseURL: '',
        // timeout: `${Config.timeout}`
    })

    instance.interceptors.request.use(config => {
        config.headers['Content-Type'] = 'application/json'
        // config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('Authorization')
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