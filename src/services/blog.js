/**
 * @description   Micro Blog 数据处理
 * @author        RR1335
 */

const { Blog } = require('../db/model/indexModel')


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


module.exports = {
    createBlog
}