const {Sequelize} = require('sequelize')
const { 
    MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_USER,
    MYSQL_PASSWORD,
    MYSQL_DATABASE 
} = require('../config/config.default')


const seq = new Sequelize('mytest', 'root', 'jkjk@qaz12', {
    host: MYSQL_HOST,
    dialect: 'mysql',
    define: {
        freezeTableName: true
    }
})

// seq.authenticate().then(res => {
//     console.log('数据库连接成功', res)
// }).catch(error => {
//     console.log('数据库连接失败', error)
// })

module.exports = seq