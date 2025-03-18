/**
 * @description   Micro Blog 数据处理
 * @author        RR1335
 */

const { Blog,User } = require('../db/model/indexModel')
const { formatUser } = require('./_format')


/**
 * 创建 M  Blog
 * @param {Object} param0  {userId, content, image}
 */
async function createBlog({userId, content, image}) {
    const result = await Blog.create({
        userId,
        content,
        image
    })

    return result.dataValues
}


/**
 * 获取（User）用户 Blog List
 * @param {Object} param0  {userName, pageIndex = 0, pageSize = 5}
 */
async function getBlogListByUser({userName, pageIndex = 0, pageSize = 5}) {
    // 拼接查询条件
    const userWhereOpts = {}
    if (userName) { 
        userWhereOpts.userName = userName
    }

    // 执行查询
    const result = await Blog.findAndCountAll({
        limit: pageSize,                   // 没页多少条
        offset: pageSize * pageIndex ,     // 分页，跳过多少条数据即从第几页开始
        order: [
            ['id','desc']
        ],
        include:[{
            model : User,                                      // 连表查询 User
            attributes: ['userName', 'nickName', 'picture'],   // 查询的表头
            where: userWhereOpts
        }]
    })
    // result.count 总数，和分页无关
    // result.rows  查询结果，数组

    // console.log(result)
    // console.log(result.rows[1].dataValues)
    // console.log(result.rows[1].user)

    let blogList = result.rows.map( row => row.dataValues )

    blogList = blogList.map(blogItem => {
        const user = blogItem.user.dataValues
        blogItem.user = formatUser(user)       // format user ，增加默认值

        return blogItem
    })

    return {
        count : result.count,
        blogList
    }
}



module.exports = {
    createBlog,
    getBlogListByUser
}