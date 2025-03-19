/**
 * @description   首页 Controller
 * @author        RR1335
 */

const xss = require('xss')
const { PAGE_SIZE } = require('../conf/constant')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { createBlogFailInfo } = require('../model/ErrorInfo')
const { createBlog ,getFollowersBlogList} = require('../services/blog')


/**
 * 创建 
 * @param {Object} param0   {userId, content, image}
 */
async function create({userId, content, image}) {
    // service
    try {
        // 创建 M Blog 
        const blog = await createBlog({
            userId, 
            content: xss(content),
            image
        })
        // 创建成功，返回 blog 信息，以及 blog.id 
        return new SuccessModel(blog)
    } catch (err) {
        // 打印错误信息
        console.error(err.message , err.stack)
        // 创建失败，输出
        return new ErrorModel(createBlogFailInfo)
    }

}


/**
 * 获取 Blog list
 * @param {number} userId       用户 id
 * @param {number} pageIndex    第几页
 */
async  function  getIndexBlogList(userId,pageIndex = 0) {
    const result = await getFollowersBlogList({userId,pageIndex,PAGE_SIZE})

    const {count , blogList } = result

    return new SuccessModel({
        isEmpty: blogList.length === 0,
        blogList,
        pageSize: PAGE_SIZE,
        pageIndex,
        count
    })
}


module.exports = {
    create,
    getIndexBlogList
}