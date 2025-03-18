/**
 * @description   个人主页 Controller
 * @author        RR1335
 */

const { PAGE_SIZE } = require('../conf/constant')
const { SuccessModel } = require('../model/ResModel')
const { getBlogListByUser } = require('../services/blog')

/**
 * 获取当前用户 Blog List
 * @param {string} userName  用户名
 * @param {number} pageIndex 当前页数
 */
async function  getProfileBlogList(userName, pageIndex = 0) {
    // services
    const result = await getBlogListByUser({
        userName,
        pageIndex,
        pageSize : PAGE_SIZE
    })
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
    getProfileBlogList
}

