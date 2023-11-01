
import axios from 'axios';
import serverConfig from "../../public/serverConfig.js"
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
        console.log(err)
        return Promise.reject(err)
    })

    return instance(config)
}
