/**
 * @description   首页 Controller
 * @author        RR1335
 */

const xss = require('xss')
const { PAGE_SIZE ,REG_FOR_AT_WHO} = require('../conf/constant')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { createBlogFailInfo } = require('../model/ErrorInfo')
const { createBlog ,getFollowersBlogList} = require('../services/blog')
const { getUserInfo } = require('../services/user')
const { createAtRelation } = require('../services/atRelation')


/**
 * 创建 
 * @param {Object} param0   {userId, content, image}
 */
async function create({userId, content, image}) {
    // 分析并收集 content 中的 @ 用户
    // content 格式 ‘Hello @三儿 - san 你好'
    const atUserNameList = []
    content = content.replace(
        REG_FOR_AT_WHO,
        (matchStr , nickName , userName) => {
            // 目的是获取 userName ，而不是 Replace 
            atUserNameList.push(userName)
            return matchStr  // 替换不生效
        }
    )

    // 根据 @ 用户名，获取用户 userId 
    const atUserList = await Promise.all(
        atUserNameList.map(userName => getUserInfo(userName))
    )


    const atUserIdList = atUserList.map(user => user.id)

    // service
    try {
        // 创建 M Blog 
        const blog = await createBlog({
            userId, 
            content: xss(content),
            image
        })
        // 创建 @ 关系 ， 已经 creatBlog 创建了 blog 并有了 blog.id
        // user.id and blog.id 构成了 AtRelation 关系表 table 
        await Promise.all(atUserIdList.map(userId => createAtRelation(blog.id,userId)))


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