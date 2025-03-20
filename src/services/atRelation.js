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

module.exports = {
    createAtRelation
}

