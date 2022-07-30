const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/config.default')
const { tokenExpiredError } = require('../constant/error.type')
const auth = async (ctx, next) => {
    // 获取请求头的token
    const { authorization } = ctx.request.header
    const token = authorization.replace('Bearer ','') // 这里要有一个空格
    // 根据自定义私钥，使用jwt验证token
    console.log('token', token)
    try {
        // user中包含了payload的信息：user_name, id, is_admin
        const user = jwt.verify(token, JWT_SECRET) // 如果jwt.verify验证失败，会抛出一个异常
        ctx.state.user = user
    } catch (err) {
        // jwt.verify异常情况有多种，可参照Npm文档 https://www.npmjs.com/package/jsonwebtoken
        switch (err.name) {
            case 'TokenExpiredError': // jwt返回的错误类型
                console.error('token已过期', err)
                ctx.app.emit('error', tokenExpiredError, ctx)
                return
            case 'JsonWebTokenError':
                console.error('无效的token', err)
                ctx.app.emit('error', invalidToken, ctx)
                return
            default:
                console.error('token错误', err)
                return
        }
    }

    await next()
}

module.exports = {
    auth
}