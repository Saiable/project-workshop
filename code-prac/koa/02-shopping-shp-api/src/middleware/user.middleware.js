const { getUserInfo } = require("../service/user.service")
const { userFormateError, userAlreadyExists, userQueryError, userNotFound, userInvalidPassword, userLoginFailed } = require('../constant/error.type')
const bcrypt = require('bcryptjs')

const userValidator = async (ctx, next) => {
    const { user_name, password } = ctx.request.body

    if (!user_name || !password) {
        console.error('用户名或者密码为空')
        ctx.app.emit('error', userFormateError, ctx)
        return
    }

    await next()
}

const verifyUser = async (ctx, next) => {
    try {
        const { user_name } = ctx.request.body

        if (await getUserInfo({ user_name })) {
            console.error('用户名已存在', user_name)
            ctx.app.emit('error', userAlreadyExists, ctx)
            return
        }
    } catch(err) {
        console.log('用户信息获取错误', err)
        return ctx.app.emit('error', userQueryError, ctx)
    }
    await next()
}

const scyptPassword = async (ctx, next) => {
    const { password } = ctx.request.body
    const salt =  bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    ctx.request.body.password = hash
    await next()
}

const verifyLogin = async (ctx, next) => {
    try {
        const { user_name, password } = ctx.request.body
        const res = await getUserInfo({ user_name })
        if (!res) {
            console.log('用户不存在', res)
            return ctx.app.emit('error', userNotFound, ctx)
        }
        if (!bcrypt.compareSync(password, res.password)) {
            return ctx.app.emit('error', userInvalidPassword, ctx)
        }
    } catch (err) {
        console.error(err)
        return ctx.app.emit('error', userLoginFailed, ctx)
    }

    await next()
}

module.exports = {
    userValidator,
    verifyUser,
    scyptPassword,
    verifyLogin
}