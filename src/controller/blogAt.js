/**
 * @description   @ 关系
 * @author        RR1335
 */

const { getAtRelationCount } = require('../services/atRelation')
const { SuccessModel } = require('../model/ResModel')

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


module.exports = {
    atMeCount
}