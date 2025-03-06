/**
 * @description 存储配置 
 * @author RR1335
 */

const { isProd } = require('../utils/env')

let REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'
}

// if (isProd) {

//     let REDIS_CONF = {
//         port: 6379,
//         host: '127.0.0.1'
//     }
// }

module.exports = {
    REDIS_CONF
}