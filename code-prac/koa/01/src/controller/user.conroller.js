const {createUser, getUserInfo} = require('../service/user.service')

class UserController{
    async register(ctx, next) {
        const {user_name, password} = ctx.request.body
        if(!user_name || !password) {
            console.error('用户名或密码为空')
            ctx.status = 400
            ctx.body = {
                code: '10001',
                message: '用户名或者密码为空',
                result: ''
            }

            return
        }

        // 合理性验证
        // 需要再次查询数据库 getUserInfo
        if(getUserInfo({user_name})) { // 根据用户名来查询，参数使用对象，这样可以让查询参数不受顺序影响
            ctx.status = 409 // 状态完成冲突，不熟悉的话，可以去MDN上看下常见状态码
            ctx.body = {
                code: '10002',
                message: '用户名已经存在',
                result: ''
            }
            return 
        }

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