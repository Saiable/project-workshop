const path = require('path')

const { fileUploadFailed, unSupportedFileType } = require('../constant/error.type')

class GoodsController {
    async upload(ctx, next) {
        const { file } = ctx.request.files
        console.log("file", file)
        const fileTypes = ['iamge/png', 'image/jpg', 'image/jpeg', 'image/webp']
        if (file) {
            if(!fileTypes.includes(file.mimetype)) {
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
        
    }
}

module.exports = new GoodsController()