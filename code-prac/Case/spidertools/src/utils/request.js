import axios from 'axios'

export function request(config) {
    const instance = axios.create({
        baseURL: `http://${Config.ip}:${Config.port}`,
        timeout: `${Config.timeout}`
    })

    instance.interceptors.request.use(config => {
        config.headers['Content-Type'] = 'application/json'
        // config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('Authorization')
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
                    alert('服务器返回错误')
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