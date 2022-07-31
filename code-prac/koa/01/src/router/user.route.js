const Router = require('@koa/router')
const router = new Router({ prefix: '/user' })
const { register, login, modifyPassword } = require('../controller/user.conroller')
const { userValidator, verifyUser, scyptPassword, verifyLogin } = require('../middleware/user.middleware')
const { auth } = require('../middleware/auth.middleware')
// 注册接口
router.post('/register', userValidator, verifyUser, scyptPassword, register)
// 登录接口
router.post('/login', userValidator, verifyLogin, login)
// 修改密码接口
router.patch('/modifyPassword', auth, scyptPassword, modifyPassword)

module.exports = router
