const Router = require('@koa/router')
const router = new Router({ prefix: '/user' })
const { register, login, modifyPassword } = require('../controller/user.controller')
const { userValidator, verifyUser, scyptPassword, verifyLogin } = require('../middleware/user.middleware')
const { auth } = require('../middleware/auth.middleware')

router.post('/register', userValidator, verifyUser, scyptPassword, register)
router.post('/login', userValidator, verifyLogin, login)
router.patch('/modifyPassword', auth, scyptPassword, modifyPassword)
module.exports = router