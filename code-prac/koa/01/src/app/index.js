const Koa = require('koa')
const Router = require('@koa/router')
const koaBody = require('koa-body') // 1.导入koa-body
const userRouter = require('../router/user.route')

const app = new Koa()
app.use(koaBody()) // 在所有中间件之前，注册koa-body

const indexRouter = new Router()
indexRouter.get('/', (ctx, next) => {   
    ctx.body = `Request Body: ${JSON.stringify(ctx.request.body)}`
})

app.use(indexRouter.routes())
app.use(userRouter.routes())

module.exports = app
