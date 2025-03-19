/**
 * @description 
 * @author        RR1335
 */

const { getUsersByFollower,addFollower ,deleteFollower } = require('../services/userRelation')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { addFollowerFailInfo ,deleteFollowerFailInfo }  = require('../model/ResModel')


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

/**
 * 获得关注列表
 * @param {number} myUserId        当前登录的 user ID
 * @param {number} curUserId       被关注的 userID
 */
async function follow(myUserId, curUserId) {
    try {
        await addFollower(myUserId, curUserId)
        return new SuccessModel()
    } catch (err) {
        return new ErrorModel(addFollowerFailInfo)
    }
}


/**
 * 取消关注
 * @param {number} myUserId        当前登录的 user ID
 * @param {number} curUserId       被关注的 userID
 */
async function unFollow(myUserId, curUserId) {
    const result = await deleteFollower(myUserId, curUserId)

    if (result) {
        return new SuccessModel()
    }
    return new ErrorModel(deleteFollowerFailInfo)

}

module.exports = {
    getFans,
    follow,
    unFollow
}