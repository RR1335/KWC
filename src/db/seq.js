/**
 * @description 数据库连接 配置 sequelize 实例
 * @author RR1335
 */

const Sequelize = require('sequelize')
const { MYSQL_CONF } = require('../conf/db')
const { isProd, isTest } = require('../utils/env')

const { host , user , password , database } = MYSQL_CONF

const conf_seq = {
    host,
    dialect: 'mysql'
}

// 测试环境，将 默认的打印输出制空
if (isTest) {
    conf_seq.logging = () => {}
}

// if (isProd) {
//  线上环境配置
//     conf_seq.pool = {
//         max: 5,
//         mix: 0,
//         idle: 10000,     // 10s 内未被使用则释放该连接
//         acquire: 30000   // 30s 建立连接的最长时间
//     }
// }


const seq = new Sequelize(database , user, password, conf_seq )

module.exports = seq