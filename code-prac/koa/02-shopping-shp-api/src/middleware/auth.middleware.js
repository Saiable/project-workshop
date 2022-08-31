const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/config.default')
const { tokenExpiredError, invalidToken} = require('../constant/error.type')
const auth = async (ctx, next) => {
    try {
        const { authorization = 'Bearer ' } = ctx.request.header
        const token = authorization.replace('Bearer ','')
        console.log('token', token)
        const user = jwt.verify(token, JWT_SECRET)
        ctx.state.user = user
    } catch (err) {
        switch (err.name) {
            case 'TokenExpiredError':
                console.error('token已过期', err)
                ctx.app.emit('error', tokenExpiredError, ctx)
                return
            case 'JsonWebTokenError':
                console.error('无效的token', err)
                return ctx.app.emit('error', invalidToken, ctx)
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