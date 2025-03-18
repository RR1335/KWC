/**
 * @description  广场 API 路由
 * @author       RR1335
 */

const router = require("koa-router")()
const { loginCheck } = require('../../middlewares/logincheck')
const { getSquareBlogList } = require('../../controller/blog-square')
const { getBlogListStr } = require('../../utils/blog')

router.prefix('/api/square')


// 加载更多
router.get('/loadMore/:pageIndex', loginCheck , async (ctx , next) => {
    let { pageIndex} = ctx.params
    pageIndex = parseInt(pageIndex)          // ctx.params 获取的 params 是 string ，需要转换为 Number
    const result = await getSquareBlogList(pageIndex)

    // 渲染为 HTML 字符串 ， load-more.ejs 中 var $tempContainer = $(data.blogListTpl) 
    result.data.blogListTpl = getBlogListStr(result.data.blogList)

    ctx.body = result
})


module.exports = router