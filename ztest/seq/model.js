const Sequelize = require('sequelize')
const seq = require('./seq')




// 建模
const User = seq.define('user', {
    // id 自动增加，并设为主键
    userName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    nickName: {
        type: Sequelize.STRING,
        comment : '昵称'
    }
    // createdAt and updatedAt 自更新，sequelize 默认创建
})

const Blog = seq.define('blog', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content : {
        type: Sequelize.TEXT
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

Blog.belongsTo(User, {
    foreignKey: 'userId'
})

module.exports = {
    User,
    Blog
}