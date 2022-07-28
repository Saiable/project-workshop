const bcrypt = require('bcryptjs')
const { getUserInfo } = require('../service/user.service')
const { userFormateError, userAlreadyExists, userQueryError, userLoginFailed, userInvalidPassword, userNotFound } = require('../constant/error.type')

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

    try {
        const res = await getUserInfo({ user_name })
        if (res) {
            console.error('用户名已存在', { user_name })
            ctx.app.emit('error', userAlreadyExists, ctx)
            return
        }
    } catch (err) {
        console.err('获取用户信息错误', err)
        ctx.app.emit('error', userQueryError, ctx)
        return
    }

    await next()

}

const scyptPassword = async (ctx, next) => {
    const { password } = ctx.request.body
    const salt = bcrypt.genSaltSync(10); // 生成盐
    const hash = bcrypt.hashSync("B4c0/\/", salt); // 根据盐生成hash，hash保存的是密文
    ctx.request.body.password = hash // 使用hash覆盖password
    await next()
}

const verifyLogin = async (ctx, next) => {
    // 1.判断用户是否存在（不存在：报错）
    const { user_name, password } = ctx.request.body
    try {
        const res = await getUserInfo({ user_name })
        if (!res) {
            console.log('用户不存在', res)
            return ctx.app.emit('error', userNotFound, ctx)
        }
        // 2.找到了用户，比对密码是否匹配（不匹配：报错）
        if (!bcrypt.compareSync(password, res.password)) {
            return ctx.app.emit('error', userInvalidPassword, ctx)

        }
    } catch (err) {
        console.error(err)
        return ctx.app.emit('error', userLoginFailed, ctx) // getUserInfo出错，在不同场景下，抛出的错误应该是不同的
    }

    //通过
    await next()

}

module.exports = {
    userValidator,
    verifyUser,
    scyptPassword,
    verifyLogin
}