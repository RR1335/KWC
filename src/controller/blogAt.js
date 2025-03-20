/**
 * @description   @ 关系
 * @author        RR1335
 */

const { getAtRelationCount ,getAtUserBlogList,updateAtRelation} = require('../services/atRelation')
const { SuccessModel } = require('../model/ResModel')
const { PAGE_SIZE } = require('../conf/constant')



/**
 * 获取 @ 当前 user 的 Blog 数量
 * @param {number} userId 
 */
async function  atMeCount(userId) {
    const count = await getAtRelationCount(userId)

    return new SuccessModel({
        count
    })
}


/**
 * 获取 at 页面数据
 * @param {number} userId 
 * @param {number} pageIndex 
 */
async function  getAtMeBlogList(userId,pageIndex = 0) {
    const result = await getAtUserBlogList({
        userId,
        pageIndex,
        pageSize:PAGE_SIZE
    })

    const { blogList,count } = result

    return new SuccessModel({
        isEmpty: blogList.length === 0,
        blogList,
        pageSize: PAGE_SIZE,
        pageIndex,
        count
    })
}


/**
 * 标记为已读
 * @param {number} userId 
 */
async function markAsRead(userId) {
    try {
        await updateAtRelation({newIsRead: true} , {userId, isRead: false})
    } catch (ex) {
        console.error(ex)
    }
    // 无须返回
}


module.exports = {
    atMeCount,
    getAtMeBlogList,
    markAsRead
}