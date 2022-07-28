const Koa = require('koa')
const Router = require('@koa/router')
const koaBody = require('koa-body')
const userRouter = require('../router/user.route')
const errHandler = require('./errHandler')
const app = new Koa()

app.use(koaBody())
const indexRouter = new Router()
indexRouter.get('/', (ctx, next) => {   
    ctx.body = `Request Body: ${JSON.stringify(ctx.request.body)}`
})

app.use(indexRouter.routes())
app.use(userRouter.routes())


// 统一进行错误处理
// 发布订阅模式
app.on('error', errHandler)
module.exports = app
