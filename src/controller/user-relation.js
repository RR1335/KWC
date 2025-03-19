/**
 * @description 
 * @author        RR1335
 */

const { getUsersByFollower } = require('../services/userRelation')
const { SuccessModel } = require('../model/ResModel')
/**
 * 获取粉丝
 * @param {number} userId   用户ID
 */
async function getFans(userId) {
    const { count , userList } = await getUsersByFollower(userId)

    return new SuccessModel({
        fansCount:count,
        fansList:userList
    })

}



module.exports = {
    getFans
}