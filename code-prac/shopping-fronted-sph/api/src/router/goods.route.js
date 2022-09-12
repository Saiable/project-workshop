const Router = require('@koa/router')
const router = new Router({ prefix: '/goods' })

const { upload, release, update, remove, restore, findAll } = require('../controller/goods.controller')
const { auth, hasAdminPermission } = require('../middleware/auth.middleware')
const { validator } = require('../middleware/goods.middleware')


router.post('/upload', auth, hasAdminPermission, upload)
router.post('/release', auth, hasAdminPermission, validator, release)
router.put('/update/:id', auth, hasAdminPermission, validator, update)
router.post('/remove/:id/off', auth, hasAdminPermission, remove)
router.post('/remove/:id/on', auth, hasAdminPermission, restore)
router.get('/lists', findAll)
module.exports = router