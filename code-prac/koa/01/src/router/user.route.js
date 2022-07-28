const Router = require('@koa/router')
const router = new Router({ prefix: '/user' })
const { register, login } = require('../controller/user.conroller')
const { userValidator, verifyUser, scyptPassword, verifyLogin } = require('../middleware/user.middleware')

// 注册接口
router.post('/register', userValidator, verifyUser, scyptPassword, register)
// 登录接口
router.post('/login', userValidator,  verifyLogin, login)


module.exports = router
