/**
 * @description   用户关系
 * @author        RR1335
 */

const { User , UserRelation } = require('../db/model/indexModel')
const { formatUser } = require('./_format')

/**
 * 获取关注该用户的用户列表，即：粉丝列表
 * @param {number} followerId   被关注人ID
 */
async function  getUsersByFollower(followerId) {
    const result = await User.findAndCountAll({
        attributes: ['id','userName','nickName','picture'],
        order: [
            ['id','desc']
        ],
        include: [
            {
                model: UserRelation,
                where: {
                    followerId
                }
            }
        ]
    })

    // result.count 总数
    // result.rows  查询结果，数组，dataValues 是 object 是具体的内容

    let userList = result.rows.map(row => row.dataValues)
    userList = formatUser(userList)

    return { 
        count : result.count,
        userList
    }
}


/**
 * 添加关注 user ID
 * @param {number} userId            user ID
 * @param {number} followerId       被关注用户 ID
 */
async function  addFollower(userId,followerId) {
    const result =  await  UserRelation.create({
        userId,
        followerId
    })

    return result.dataValues
}


/**
 * 删除关注 user ID
 * @param {number} userId            user ID
 * @param {number} followerId       被关注用户 ID
 */
async function  deleteFollower(userId,followerId) {
    const result =  await  UserRelation.destroy({
        where : {
            userId,
            followerId
        }
    })

    return result > 0
}

module.exports = {
    getUsersByFollower,
    addFollower,
    deleteFollower
}