const Router = require('@koa/router')
const router = new Router({ prefix: '/goods' })

const { upload, release } = require('../controller/goods.controller')
const { auth, hasAdminPermission } = require('../middleware/auth.middleware')
const { validator } = require('../middleware/goods.middleware')
// 商品图片上传接口
router.post('/upload', auth, hasAdminPermission, upload)
//发布商品接口
router.post('/release', auth, hasAdminPermission, validator, release)
module.exports = router