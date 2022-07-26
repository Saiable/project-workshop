const { DataTypes } = require("sequelize")

const seq = require('../db/seq')

// 创建模型
const User = seq.define('sai_user', {
    // id会被sequelize自动创建

    // user_name
    user_name: {
        type: DataTypes.STRING,
        allowNull: false, // 不允许为空
        unique: true,
        comment: '用户名唯一' // 注释
    },
    // password
    password: {
        type: DataTypes.CHAR(64),
        allowNull: false,
        comment: '密码'
    },
    is_admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
        comment: '是否为管理员，0：不是管理员（默认值），1：是管理员'
    }
})

// User.sync({force: true}) // 强制同步数据库（创建数据表）
module.exports = User