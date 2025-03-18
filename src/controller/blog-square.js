/**
 * @description   广场 Controller
 * @author        RR1335
 */

const  { PAGE_SIZE } = require('../conf/constant')
const  { SuccessModel } = require('../model/ResModel')
const  { getSquareCacheList } = require('../cache/blog')


/**
 * 广场 Blog list
 * @param {number} pageIndex   分页
 */
async function  getSquareBlogList(pageIndex = 0) {
    // cache 
    const result = await getSquareCacheList(pageIndex,PAGE_SIZE)

    const blogList = result.blogList

    // 拼接返回数据
    return new SuccessModel({
        isEmpty : blogList.length === 0 ,
        blogList,
        pageSize: PAGE_SIZE,
        pageIndex,
        count: result.count
    })
}

module.exports = {
    getSquareBlogList
}