/**
 * @description  @ 关系 数据模型
 * @author       RR1335
 */

const { Blog,User,AtRelation }  = require('../db/model/indexModel')
const { formatBlog,formatUser } = require('./_format')

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

/**
 * 获取 at 用户列表
 * @param {Object} param0  {userId,pageIndex , pageSize = 5}
 */
async function getAtUserBlogList({userId,pageIndex , pageSize = 5}) {
    const result = await Blog.findAndCountAll({
        limit:pageSize,
        offset: pageIndex * pageSize,
        order: [
            ['id','desc']
        ],
        include: [
            {
                model: AtRelation,
                attributes:['userId','blogId'],
                where: {
                    userId
                }
            },
            {
                model: User,
                attributes:['userName','nickName','picture']
            }
        ]
    })

    let blogList = result.rows.map(row => row.dataValues)
    blogList = formatBlog(blogList)

    blogList = blogList.map(blogItem => {
        blogItem.user = formatUser(blogItem.user.dataValues)

        return blogItem
    })

    return {
        count : result.count,
        blogList
    }

}


/**
 * 更新 at Relation
 * @param {object} param0  newIsRead
 * @param {object} param1  userId,isRead
 */
async function updateAtRelation({ newIsRead } , { userId,isRead}) {

    const updateData ={}
    if (newIsRead) {
        updateData.isRead = newIsRead
    }

    const whereData = {}
    if (userId) {
        whereData.userId = userId
    }
    if (isRead) {
        whereData.isRead = isRead
    }    

    // 执行更新
    const result = await AtRelation.update(updateData,{
        where: whereData
    })

    return result[0] >0

}

module.exports = {
    createAtRelation,
    getAtRelationCount,
    getAtUserBlogList,
    updateAtRelation
}

