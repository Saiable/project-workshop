const Koa = require('koa')
const koaBody = require('koa-body')
const userRouter = require('../router/user.route')
const app = new Koa()
const errHandler = require('./errHandler')
app
    .use(koaBody())
    .use(userRouter.routes())

app.on('error', errHandler)
module.exports = app