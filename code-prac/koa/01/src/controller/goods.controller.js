const path = require('path')

const { fileUploadFailed, unSupportedFileType, publishGoodsError, invalidGoodsId, updateGoodsError } = require('../constant/error.type')
const { createGoods, updateGoods } = require('../service/goods.service')
class GoodsController {
    async upload(ctx, next) {
        const { file } = ctx.request.files
        console.log("file", file)
        const fileTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp']
        if (file) {
            if (!fileTypes.includes(file.mimetype)) {
                return ctx.app.emit('error', unSupportedFileType, ctx)
            }
            ctx.body = {
                code: 0,
                message: '商品图片上传成功',
                result: {
                    goods_img: path.basename(file.filepath)
                }
            }
        } else {

            return ctx.app.emit('error', fileUploadFailed, ctx)
        }
    }

    async release(ctx, next) {
        try {
            const { createdAt, updatedAt, ...res } = await createGoods(ctx.request.body)
            ctx.body = {
                code: 0,
                message: '发布商品成功',
                result: res
            }
        } catch (err) {
            console.error(err)
            return ctx.app.emit('error', publishGoodsError, ctx) // 不要把数据库相关的报错信息，暴露给前端
        }
    }

    async update(ctx, next) {
        try {
            const res = await updateGoods(ctx.params.id, ctx.request.body)
            if (res) {
                ctx.body = {
                    code: 0,
                    message: '修改商品成功',
                    result: ''
                }
            } else {
                return ctx.app.emit('error', invalidGoodsId, ctx)
            }
        } catch (err) {
            console.error(err)

            return ctx.app.emit('error', updateGoodsError, ctx)
        }
    }
}

module.exports = new GoodsController()