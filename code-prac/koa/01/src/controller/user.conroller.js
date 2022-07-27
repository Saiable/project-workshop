const { createUser } = require('../service/user.service')

class UserController {
    async register(ctx, next) {
        const { user_name, password } = ctx.request.body

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
    }

    async login(ctx, next) {
        ctx.body = '用户登录成功'
    }
}

module.exports = new UserController()