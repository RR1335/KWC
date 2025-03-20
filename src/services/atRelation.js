/**
 * @description  @ 关系 数据模型
 * @author       RR1335
 */

const { AtRelation }  = require('../db/model/indexModel')

/**
 * 创建 Blog @ 用户的关系
 * @param {number} blogId 
 * @param {number} userId 
 */
async function createAtRelation(blogId,userId) {
    const result = await AtRelation.create({
        blogId,
        userId
    })

    return result.dataValues
}

/**
 * 获取 @ 用户的 Blog 数量（未读 isRead：false）
 * @param {number} userId 
 */
async function getAtRelationCount(userId) {
    const result = await AtRelation.findAndCountAll({
        where: {
            userId,
            isRead: false
        }
    })

    return result.count
}

module.exports = {
    createAtRelation,
    getAtRelationCount
}

