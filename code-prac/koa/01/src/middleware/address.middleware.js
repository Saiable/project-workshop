const { addressFormatError } = require('../constant/error.type')

const validator = (rules) => {
    return async (ctx, next) => {
        try {
            await ctx.verifyParams(rules)
        } catch (err) {
            console.error(err)
            addressFormatError.result = err
            ctx.app.emit('error', addressFormatError, ctx)
            return
        }

        await next()
    }
}

module.exports = {
    validator
}