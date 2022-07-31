const path = require('path')

const Koa = require('koa')
const koaBody = require('koa-body')
const KoaStatic =  require('koa-static')
const parameter = require('koa-parameter')

const router = require('../router') // 默认会找index.js
const errHandler = require('./errHandler')


const app = new Koa()
// use方法返回app自身
app
    .use(koaBody({
        multipart: true,
        formidable: {
            // 单独在src下新建一个upload文件夹，不推荐配置成../upload，这样的相对路径
            // 在option里相对路径不是相对于当前文件，是相对于proces.cwd()，指向当前脚本执行时所在的目录，可以打印一下
            // 使用node的path模块，写成绝对路径
            uploadDir: path.join(__dirname, '../upload'), 
            keepExtensions: true
        }
    }))
    .use(KoaStatic(path.join(__dirname, '../upload')))
    .use(parameter(app)) // 在app原型对象上注册校验的方法
    .use(router.routes())
    .use(router.allowedMethods())
    .on('error', errHandler)


module.exports = app
