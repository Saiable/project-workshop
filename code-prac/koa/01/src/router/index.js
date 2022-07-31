const fs = require('fs')
const Router = require('@koa/router')
const router = new Router()

fs.readdirSync(__dirname).forEach(file => { // readdirSync方法，以同步的方式获取文件名
    // console.log(file) // 当前目录下的所有文件名
    if (file !== 'index.js') { // 过滤掉自身
        let r = require('./' + file) // 加载文件
        router.use(r.routes())
    }
})

module.exports = router