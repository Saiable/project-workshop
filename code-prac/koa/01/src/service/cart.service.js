const Cart = require('../model/cart.model')
const { Op } = require('sequelize') // 要以解构赋值的形式导入
const Goods = require('../model/goods.model')

class CartService {
    async createOrUpdate(user_id, goods_id) {
        // 根据user_id和goods_id同时查找
        let res = await Cart.findOne({
            where: {
                [Op.and]: {
                    user_id,
                    goods_id
                }
            }

        })
        // console.log(res)
        // 已经存在一条记录，将number + 1
        if (res) {
            await res.increment('number')
            return await res.reload()
        } else {
            return await Cart.create({
                user_id,
                goods_id
            })
        }
    }

    async findCarts(pageNum, pageSize) {
        const offset = (pageNum - 1) * pageSize
        const { count, rows } = await Cart.findAndCountAll({
            attributes: ['id', 'number', 'selected'],
            offset: offset,
            limit: pageSize * 1,
            include: {
                model: Goods,
                as: 'goods_info', // 指定查询结构的别名，和接口文档的字段保持一致
                attributes: ['id', 'goods_name', 'goods_price', 'goods_img'] // 这里的先后顺序，会反映到接口中的字段顺序
            }
        })
        return {
            pageNum,
            pageSize,
            total: count,
            list: rows
        }
    }

    async updateCarts(params) {
        const { id, number, selected } = params

        const res = await Cart.findByPk(id)
        if (!res) return ''
        number !== undefined ? (res.number = number) : ''
        selected !== undefined ? (res.selected = selected) : ''

        return await res.save()

    }

    async removeCarts(ids) {
        return await Cart.destroy({
            where: {
                id: {
                    [Op.in]: ids
                }
            }
        })
    }

    async selectAllCarts(user_id) {
        return await Cart.update({ selected: true }, {
            where: {
                user_id
            }
        })
    }

    async unSelectAllCarts(user_id) {
        return await Cart.update({ selected: false }, {
            where: {
                user_id
            }
        })
    }
}

module.exports = new CartService()