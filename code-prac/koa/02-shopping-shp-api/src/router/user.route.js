const Router = require('@koa/router')
const router = new Router({ prefix: '/user' })
const { register, login } = require('../controller/user.controller')

router.get('/register', register)
router.post('/login', login)

module.exports = router