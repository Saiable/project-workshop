const jwt = require('jsonwebtoken')
const { createUser, getUserInfo } = require('../service/user.service')
const { userRegisterError, userLoginFailed } = require('../constant/error.type')
const { JWT_SECRET } = require('../config/config.default')

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
        // 获取用户信息（在paylaod中，记录id、user_name、is_admin）
        try {
            // 从返回结果中，过滤掉password，将剩下的属性，放在新的res对象中
            const { password, ...res } = await getUserInfo({ user_name })
            ctx.body = {
                code: 0,
                message: '用户登录成功',
                result: {
                    /*
                    * @params1:配置对象
                    * @params2:秘钥
                    * @params3:过期时间，一天
                    */
                    token: jwt.sign(res, JWT_SECRET, {expiresIn: '1d'})
                }
            }

        } catch (err) {
            console.error('用户登录失败', err)
            ctx.app.emit('error', userLoginFailed, ctx) // 如果报这个错，说明try语句里的getUserInfo有错 
            return
        }
    }
}

module.exports = new UserController()