const { Sequelize } = require('sequelize')
const { 
    MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_USER,
    MYSQL_PASSWORD,
    MYSQL_DATABASE 
} = require('../config/config.default')

console.log(MYSQL_HOST,MYSQL_DATABASE)
const seq = new Sequelize(MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD, {
    host: MYSQL_HOST,
    dialect: 'mysql',
    define: {
        freezeTableName: true // 全局定义表明等于模型名
    }
})


// seq.authenticate().then(res => {
//     console.log('数据库连接成功', res)
// }).catch(error => {
//     console.log('数据库连接失败', error)
// })

module.exports = seq