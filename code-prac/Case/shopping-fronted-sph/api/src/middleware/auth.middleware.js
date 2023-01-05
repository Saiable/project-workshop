const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/config.default')
const { tokenExpiredError, invalidToken, hasNoAdminPermission} = require('../constant/error.type')
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
const hasAdminPermission = async (ctx, next) => {
    const { is_admin } = ctx.state.user
    console.log(ctx.state.user)
    if (!is_admin) {
        console.log('该用户无管理员权限', ctx.state.user)
        ctx.app.emit('error', hasNoAdminPermission, ctx)
        return
    }
    await next()
}
module.exports = {
    auth,
    hasAdminPermission
}