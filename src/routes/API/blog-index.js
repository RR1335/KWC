/**
 * @description   M Blog index Router
 * @author        RR1335
 */

const router = require("koa-router")()
const { loginCheck } = require('../../middlewares/logincheck')
const { create,getIndexBlogList } = require('../../controller/blog-index')
const { genValidator } = require('../../middlewares/validator')
const  blogValidate = require('../../validator/blog')
const { getBlogListStr } = require('../../utils/blog')

router.prefix('/api/blog')


// 创建微博
router.post('/create' , loginCheck , genValidator(blogValidate), async (ctx , next) => {
    const { content , image } = ctx.request.body
    const { id : userId } = ctx.session.userInfo
    // controller
    ctx.body  = await create({userId,content , image})
})


// 加载更多
router.get('/loadMore/:pageIndex', loginCheck , async (ctx , next) => {
    let { pageIndex} = ctx.params
    pageIndex = parseInt(pageIndex)          // ctx.params 获取的 params 是 string ，需要转换为 Number
    const {id:userId} = ctx.session.userInfo
    const result = await getIndexBlogList(userId,pageIndex)

    // console.log(result.data.blogList)

    // 渲染为 HTML 字符串 ， load-more.ejs 中 var $tempContainer = $(data.blogListTpl) 
    result.data.blogListTpl = getBlogListStr(result.data.blogList)

    ctx.body = result
})

module.exports = router