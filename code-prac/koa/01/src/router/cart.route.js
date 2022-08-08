const Router = require('@koa/router')
const router = new Router({ prefix: '/carts' })
const { validator } = require('../middleware/cart.middleware')
const { auth } = require('../middleware/auth.middleware')
const { add, findAll, update, remove, selectAll, unSelectAll } = require('../controller/cart.controller')


router.post('/', auth, validator({ goods_id: 'number' }), add)
router.get('/', auth, findAll)
// 更新购物车
router.patch(
    '/:id',
    auth,
    validator({
        number: { type: 'number', required: false },
        selected: { type: 'bool', required: false }
    }),
    update
)
// 删除购物车，默认delete、get、head请求方法下,koa-body不会把请求体放到ctx.body中，需要在koa-body中开启：parsedMethods: ['POST', 'PUT', 'PATCH', 'DELETE']
router.delete('/', auth, validator({ ids: 'array' }), remove)

// 全选 和 全部不选 ，其实可以合并起来写
router.post('/selectAll', auth, selectAll)
router.post('/unselectAll', auth, unSelectAll)
module.exports = router
