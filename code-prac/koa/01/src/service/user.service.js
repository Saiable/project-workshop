const User = require('../model/user.model')
class UserService {

    async createUser(user_name, password) {
        const res = await User.create({ user_name, password })
        return res.dataValues
    }

    async getUserInfo({id, user_name, password, is_admin}) { // 参数设计成一个对象，因为查询用户，有可能根据id、user_name、password、is_admin字段去查询
        // 判断参数是否存在，拿到实参
        const  whereOpt = {}
        id && Object.assign(whereOpt, {id})
        user_name && Object.assign(whereOpt, {user_name})
        password && Object.assign(whereOpt, {password})
        is_admin && Object.assign(whereOpt, {is_admin})

        // 调用ORM查询接口：findOne，这是一个异步函数
        const res = User.findOne({
            attributes: ['id', 'user_name', 'password', 'is_admin'],
            where: whereOpt
        })

        return res ? res.dataValues : null
    }
}

module.exports = new UserService()