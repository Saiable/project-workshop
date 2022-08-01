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
}

module.exports = new goodsService()