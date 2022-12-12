const { invalidToken, cartFormatError } = require('../constant/error.type')

const validator = (rules) => {
    return async (ctx, next) => {
        try {
            ctx.verifyParams(rules)
        } catch (err) {
            console.error(err)
            cartFormatError.result = err
            ctx.app.emit('error', cartFormatError, ctx)
            return
        }

        await next()
    }
}

module.exports = {
    validator
}