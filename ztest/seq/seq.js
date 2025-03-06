const Sequelize = require('sequelize')

const conf_seq = {
    host: 'localhost',
    dialect: 'mysql'
}

// conf_seq.pool = {
//     max: 5,
//     mix: 0,
//     idle: 10000,     // 10s 内未被使用则释放该连接
//     acquire: 30000   // 30s 建立连接的最长时间
// }

const seq = new Sequelize('koa_wb','root','12379010', conf_seq )

module.exports = seq



// 测试 sequelize 连接成功
// seq.authenticate().then(() => {
//     console.log('ok')
// }).catch(() => {
//     console.log('err')
// })