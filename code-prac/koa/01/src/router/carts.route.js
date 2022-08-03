const Router = require('@koa/router')
const router = new Router({ prefix: '/carts' })
const { validator } = require('../middleware/carts.middleware')
const { auth } = require('../middleware/auth.middleware')
const { add } = require('../controller/carts.controller')


router.post('/add', auth, validator, add)

module.exports = router
