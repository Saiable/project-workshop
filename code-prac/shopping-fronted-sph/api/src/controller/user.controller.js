const jwt = require('jsonwebtoken')
const { createUser, getUserInfo, updateById } = require('../service/user.service')
const { userRegisterError, modifyPasswordFailed } = require('../constant/error.type')
const { JWT_SECRET } = require('../config/config.default')

class UserController {
    async register(ctx, next) {
        const { user_name, password } = ctx.request.body
        try {
            const res = await createUser(user_name, password)
            console.log('createUser', res)
            ctx.body = {
                code: 0,
                message: '用户注册成功',
                result: {
                    id: res.id,
                    user_name: res.user_name
                }
            }
        } catch(err) {
            console.log(err)
            return  ctx.app.emit('error', userRegisterError, ctx)
        }


    }
    async login(ctx, next) {
        const { user_name } = ctx.request.body
        try {
            const { password, ...res } = await getUserInfo({ user_name })
            ctx.body = {
                code: 0,
                message: '用户登录成功',
                result: {
                    token: jwt.sign(res, JWT_SECRET, {expiresIn: '1d'})
                }
            }

        } catch (err) {
            console.error('用户登录失败', err)
            return
        }

    }
    async modifyPassword(ctx, next) {
        const id = ctx.state.user.id
        const password = ctx.request.body.password
        try {
            const res = await updateById({ id, password })
            if (res) {
                ctx.body = {
                    code: 0,
                    message: '修改密码成功',
                    result: ''
                }
            } else {
                return ctx.app.emit('error', modifyPasswordFailed, ctx)
            }
        } catch (err) {
            console.error('修改密码更新数据库失败', err)
            return ctx.app.emit('error', modifyPasswordFailed, ctx)
        }
        console.log(id, password)
    }
}

module.exports = new UserController()