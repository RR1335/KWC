/**
 * @description 存储配置 
 * @author RR1335
 */

const { isProd } = require('../utils/env')

let REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'
}

let MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password:'12379010',
    port: '3306',
    database: 'koa_wb'

}

// if (isProd) {
// 线上的 环境配置
//   REDIS_CONF = {
//         port: 6379,
//         host: '127.0.0.1'
//     }
    // MYSQL_CONF = {
    //     host: 'localhost',
    //     user: 'root',
    //     password:'12379010',
    //     port: '3306',
    //     database: 'koa_wb'

    // }
// }

module.exports = {
    REDIS_CONF,
    MYSQL_CONF
}