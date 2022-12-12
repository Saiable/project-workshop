const Router = require('@koa/router')
const router = new Router({ prefix: '/address' })

const { auth } = require('../middleware/auth.middleware')
const { validator } = require('../middleware/address.middleware')
const { create, findAll, update, remove, setDefault } = require('../controller/address.controller')


// 添加地址
router.post('/', auth, validator({
    consignee: 'string',
    phone: { type: 'string', format: /^1\d{10}$/ }, // 简单的手机号正则
    address: 'string'
}), create)
// 获取地址
router.get('/', auth, findAll)
// 修改地址
router.put('/:id', auth, validator({
    consignee: 'string',
    phone: { type: 'string', format: /^1\d{10}$/ },
    address: 'string'
}), update)
// 删除地址
router.delete('/:id', auth, remove)
// 设置默认接口
router.patch('/:id', auth, setDefault)
module.exports = router

