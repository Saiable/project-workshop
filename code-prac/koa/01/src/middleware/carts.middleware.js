const {invalidToken} = require('../constant/error.type')

const validator = async (ctx, next) => {
    try {
        ctx.verifyParams({
            goods_id: 'number',//{type: 'number', required: true} 的简写
        })
    } catch (err) {
        console.error(err)
        invalidToken.result = err
        ctx.app.emit('error', invalidToken, ctx)
        return
    }

    await next()
}

module.exports = {
    validator
}