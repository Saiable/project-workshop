const { createUser } = require('../service/user.service')
const { userRegisterError } = require('../constant/error.type')
class UserController {
    async register(ctx, next) {
        const { user_name, password } = ctx.request.body

        try {
            // 校验没问题了，向用户表写入数据
            const res = await createUser(user_name, password)
            console.log(res)
            ctx.body = {
                code: 0,
                message: '用户注册成功',
                result: {
                    id: res.id,
                    user_name: res.user_name
                }
            }
        } catch (err) {
            console.error(err)
            return ctx.app.emit('error', userRegisterError, ctx)
        }
    }

    async login(ctx, next) {
        const { user_name } = ctx.request.body
        ctx.body = `欢迎回来，${user_name}`
    }
}

module.exports = new UserController()