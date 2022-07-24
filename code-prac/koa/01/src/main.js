const Koa = require('koa') // 导入Koa，由于导出的是类，一般大写
const {APP_PORT} = require('./config/config.default')
const app = new Koa() // 实例化

app.use((ctx, next) => { // 中间件
    ctx.body = 'hello world' // 测试代码
})

app.listen(APP_PORT, () => { // 开启服务
    console.log(`server is running on http://localhost:${APP_PORT} !`);
})

