const Goods = require('../model/goods.model') // 导入模型层时，不用解构赋值
class goodsService {
    async createGoods(goods) {
        const res = await Goods.create(goods)
        return res.dataValues
    }

    async updateGoods(id, goods) {
        const res = await Goods.update(goods, { where: { id } }) // 这里的id记得加括号
        return res[0] > 0 ? true : false
    }

    async removeGoods(id) {
        const res = await Goods.destroy({ where: { id } }) // destroy的返回值，不是数组
        return res > 0 ? true : false // 返回值为0或1
    }

    async restoreGoods(id) {
        const res = await Goods.restore({ where: { id } })
        return res > 0 ? true : false
    }

    async findGoods(pageNum, pageSize) {
        // 获取表记录数
        const count = await Goods.count() // count()和findAll()将看不到软删除的记录

        // 获取分页具体数据
        const offset = (pageNum - 1) * pageSize
        const rows = await Goods.findAll({ offset, limit: pageSize * 1 })

        // 返回字段对应接口文档
        return {
            pageNum,
            pageSize,
            total: count,
            list: rows
        }

    }
}

module.exports = new goodsService()