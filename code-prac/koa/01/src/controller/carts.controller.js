class CartController {
    async add(ctx, next) {
        try {
            const { pageNum = 1, pageSize = 10 } = ctx.request.query
            const res = await findGoods(pageNum, pageSize)
            ctx.body = {
                code: 0,
                message: '获取商品列表成功',
                result: res
            }
        } catch (err) {
            console.error(err)
        }
    }
}

module.exports = new CartController()