/**
 * @description  Blog 缓存
 * @author       RR1335
 */

const { set , get } = require('./_redis')
const { getBlogListByUser } = require('../services/blog')

// redis key 前缀
const REDISKEY_PREFIX = 'M-Blog:Square:'

/**
 * 获取广场 List 缓存
 * @param {number} pageIndex  分页
 * @param {number} pageSize   单页显示列表
 */
async function getSquareCacheList(pageIndex, pageSize) {
    // 定义 redis key
    const key = `${REDISKEY_PREFIX}${pageIndex}_${pageSize}`

    // 尝试获取缓存
    const cacheResult = await get(key)
    if (cacheResult != null) {
        // 缓存获取成功
        return cacheResult
    } else {
        // 无缓存（第一次访问）或缓存过期 
        const result = await getBlogListByUser({pageIndex,pageSize})
        // 设置缓存
        set(key , result, 60)      // 60秒

        return result
    }

}

module.exports = {
    getSquareCacheList
}