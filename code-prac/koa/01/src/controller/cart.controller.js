const { createOrUpdate, findCarts, updateCarts, removeCarts, selectAllCarts, unSelectAllCarts } = require('../service/cart.service')
const { cartFormatError } = require('../constant/error.type')
class CartController {
    async add(ctx, next) {
        try {
            const user_id = ctx.state.user.id
            const goods_id = ctx.request.body.goods_id
            console.log(user_id, goods_id)
            const res = await createOrUpdate(user_id, goods_id)
            // const res = {}
            ctx.body = {
                code: 0,
                message: '添加到购物车成功',
                result: res
            }
        } catch (err) {
            console.error(err)
        }
    }

    async findAll(ctx, next) {
        const { pageNum = 1, pageSize = 10 } = ctx.request.query
        const res = await findCarts(pageNum, pageSize)
        ctx.body = {
            code: 0,
            message: '获取购物车列表成功',
            result: res
        }
    }

    async update(ctx, next) {
        // 解析参数
        const { id } = ctx.request.params
        const { number, selected } = ctx.request.body

        // 参数判断
        if (number === undefined && selected === undefined) {
            cartFormatError.message = 'number和selected不能同时为空'
            return ctx.app.emit('error', cartFormatError, ctx)
        }

        // 操作数据库
        const res = await updateCarts({ id, number, selected })

        ctx.body = {
            code: 0,
            message: '更新购物车成功',
            result: res
        }
    }

    async remove(ctx, next) {
        try {
            const { ids } = ctx.request.body
            console.log(ids)
            const res = await removeCarts(ids)

            ctx.body = {
                code: 0,
                message: '删除购物车成功',
                result: res
            }
        } catch (err) {
            console.error(err)
        }
    }

    async selectAll(ctx, next) {
        try {
            const user_id = ctx.state.user.id
            const res = await selectAllCarts(user_id)

            ctx.body = {
                code: 0,
                message: '全部选中',
                result: res
            }
        } catch (err) {
            console.error(err)
        }
    }

    async unSelectAll(ctx, next) {
        const user_id = ctx.state.user.id

        const res = await unSelectAllCarts(user_id)

        ctx.body = {
            code: 0,
            message: '全不选',
            result: res
        }
    }
}

module.exports = new CartController()