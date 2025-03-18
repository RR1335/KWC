/**
 * @description    Micro Blog Data相关的工具方法
 * @author         RR1335
 */

const fs = require('node:fs')
const path = require('node:path')
const ejs = require('ejs')


// 获取 blog-list.ejs 的文件内容
const  BLOG_LIST_TPL = fs
        .readFileSync(path.join(__dirname,'..','views','widgets','blog-list.ejs')
        .toString()
)


/**
 * 根据blogList渲染 HTML 字符串 data.blogListTpl
 * @param {Array} blogList 
 * @param {boolean} canReply  是否可以回复
 */
function getBlogListStr(blogList = [], canReply = false) {
    return ejs.render(BLOG_LIST_TPL, {
        blogList,
        canReply
    })
}


module.exports = {
    getBlogListStr
}
