const { orderFormatError } = require('../constant/error.type')

const validator = (rules) => {
    return async (ctx, next) => {
        try {
            await ctx.verifyParams(rules)
        } catch (err) {
            console.error(err)
            orderFormatError.result = err
            ctx.app.emit('error', orderFormatError, ctx)
            return
        }

        await next()
    }
}

module.exports = {
    validator
}