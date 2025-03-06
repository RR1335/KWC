/**
 * @description Redis 操作方法 get set
 * @author RR1335
 */

const redis = require('redis')
const { REDIS_CONF } = require('../conf/db')

// 创建连接
const redisClient = redis.createClient(REDIS_CONF.port,REDIS_CONF.host)
redisClient.on('error', err => {
    console.error('Redis Error: ' , err)
})

/**
 * set 
 * @param {string} key      键
 * @param {string} val      值
 * @param {number} timeout  过期时间 60s 60m  timeout 是 1小时
 */
function set(key , val , timeout = 60 * 60) {
    if (typeof val === 'object') {
        val = JSON.stringify(val)
    }
    redisClient.set(key,val)
    redisClient.expire(key,timeout)
}


/**
 * get
 * @param {string} key    键
 */
function get(key) {
    const promise = new Promise((resolve , reject) => {
        redisClient.get(key , (err, val) => {
            if (err) {
                reject(err)
                return
            }
            if (val == null) {
                resolve(null) 
                return
            }

            try {
                resolve (
                    JSON.parse(val)
                )
            } catch (ex) {
                resolve(val)
            }
        })
    })
    return promise
}


module.exports = {
    get,
    set
}