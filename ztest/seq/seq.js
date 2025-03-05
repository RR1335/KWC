const Sequelize = require('sequelize')

const conf_seq = {
    host: 'localhost',
    dialect: 'mysql'
}

const seq = new Sequelize('koa_wb','root','12379010', conf_seq )

module.exports = seq



// 测试 sequelize 连接成功
// seq.authenticate().then(() => {
//     console.log('ok')
// }).catch(() => {
//     console.log('err')
// })