module.exports = (err, ctx) => {
    let status = 500 // 默认错误状态码
    switch (err.code) {
        case '10001':
            status = 400
            break
        case '10002':
            status = 409
            break
        default:
            status = 500
    }

    ctx.status = status
    ctx.body = err
}