const { getUserInfo } = require('../service/user.service')
const { userFormateError, userAlreadyExists } = require('../constant/error.type')

const userValidator = async (ctx, next) => {
    const { user_name, password } = ctx.request.body

    if (!user_name || !password) {
        console.error('用户名或密码为空', ctx.request.body)
        ctx.app.emit('error', userFormateError, ctx) // 该对象是自定义的错误类型，可以统一放在一个新的文件里管理
        return
    }

    await next()

}

const verifyUser = async (ctx, next) => {
    const { user_name } = ctx.request.body
    res = getUserInfo({ user_name })
    console.log('res', res)
    if (res) {
        ctx.app.emit('error', userAlreadyExists, ctx)
        return
    }

    await next()
}

module.exports = {
    userValidator,
    verifyUser
}