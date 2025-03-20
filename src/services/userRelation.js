/**
 * @description   用户关系
 * @author        RR1335
 */

const { User , UserRelation, AtRelation } = require('../db/model/indexModel')
const { formatUser } = require('./_format')
const Sequelize = require('sequelize')

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
                    followerId,
                    userId: {
                        // user.js 创建用户时增加了 用户关注自己的动作
                        // 在关注和粉丝列表显示时，去掉用户自己关注的显示
                        [Sequelize.Op.ne]:followerId
                    }
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
 * 获取关注人列表
 * @param {number} userId  用户 id
 */
async function  getFollowersByUser(userId) {
    const result = await UserRelation.findAndCountAll({
        order: [
            ['id','desc']
        ],
        include: [
            {
                model: User,
                attributes: ['id','userName','nickName','picture']
            }
        ],
        where: {
            userId,
            followerId: {
                [Sequelize.Op.ne]: userId
            }
        }
    })

    let userList = result.rows.map( row => row.dataValues)
    userList = userList.map( item => {
        let user = item.user.dataValues 
        user = formatUser(user)

        return user
    })

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
    getFollowersByUser,
    addFollower,
    deleteFollower
}