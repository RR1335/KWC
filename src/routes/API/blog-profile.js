/**
 * @description  个人主页 API 路由
 * @author       RR1335
 */

const router = require("koa-router")()
const { loginCheck } = require('../../middlewares/logincheck')
const { getProfileBlogList } = require('../../controller/blog-profile')
const { getBlogListString } = require('../../utils/blog')

router.prefix('/api/profile')


// 加载更多
router.get('/loadMore/:userName/:pageIndex', loginCheck , async (ctx , next) => {
    let {userName , pageIndex} = ctx.params
    pageIndex = parseInt(pageIndex)          // ctx.params 获取的 params 是 string ，需要转换为 Number
    const result = await getProfileBlogList(userName , pageIndex)

    // 渲染为 HTML 字符串 ， load-more.ejs 中 var $tempContainer = $(data.blogListTpl) 
    result.data.blogListTpl = getBlogListString(result.data.blogList)

    ctx.body = result
})


module.exports = router