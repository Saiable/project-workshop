const Router = require('@koa/router')
const router = new Router({ prefix: '/goods' })

const { upload, release, update, remove, restore, findAll } = require('../controller/goods.controller')
const { auth, hasAdminPermission } = require('../middleware/auth.middleware')
const { validator } = require('../middleware/goods.middleware')
// 商品图片上传接口
router.post('/upload', auth, hasAdminPermission, upload)
// 发布商品接口
router.post('/release', auth, hasAdminPermission, validator, release)
// 修改商品接口
router.put('/update/:id',auth, hasAdminPermission, validator, update)
// 删除接口
// router.delete('/remove/:id', auth, hasAdminPermission, remove)
// 下架商品
router.post('/remove/:id/off', auth, hasAdminPermission, remove)
// 上架商品
router.post('/remove/:id/on', auth, hasAdminPermission, restore)
// 获取商品列表
router.get('/lists', findAll)


module.exports = router