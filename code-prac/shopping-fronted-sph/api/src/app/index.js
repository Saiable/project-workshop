const path = require('path')
const Koa = require('koa')
const koaBody = require('koa-body')
const KoaStatic =  require('koa-static')
const parameter = require('koa-parameter')

const router = require('../router')
const app = new Koa()
const errHandler = require('./errHandler')

app
    .use(koaBody({
        multipart: true,
        formidable: {
            uploadDir: path.join(__dirname, '../upload'), 
            keepExtensions: true
        }
    }))
    .use(KoaStatic(path.join(__dirname, '../upload')))
    .use(parameter(app)) 
    .use(router.routes())
    .use(router.allowedMethods())
    .on('error', errHandler)


module.exports = app