/**
 * @description  数据模板文件的入口文件
 * @author       RR1335
 */


const User = require('./User')
const Blog = require('./Blog')

// Blog 外键 userId
Blog.belongsTo(User,{
    foreignKey: 'userId'
})

// 这也是成立的，最好在Blog表中定义 userId 显性的将关系表达出来便于程序的阅读和后续的使用
// Blog.belongsTo(User)

module.exports = {
    User,
    Blog
}