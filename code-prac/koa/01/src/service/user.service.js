class UserService {
    // 主要用来操作数据库
    // 处理函数对应数据库的操作，就是增删改查
    // 注册，就是往数据库里，增加一条记录
    async createUser(user_name, password) { // 当参数超过三个时，建议用一个对象
        //@TODO: 写入数据库
        return '写入数据库成功'
    }
}

module.exports = new UserService()