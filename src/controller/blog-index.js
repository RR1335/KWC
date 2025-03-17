/**
 * @description   首页 Controller
 * @author        RR1335
 */

const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { createBlogFailInfo } = require('../model/ErrorInfo')
const { createBlog } = require('../services/blog')
const xss = require('xss')

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


module.exports = {
    create
}