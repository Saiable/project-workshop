import http from './http.js'

http.get('/home_banner').then(data => {
    console.log(data)
})