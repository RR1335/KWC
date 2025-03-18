/**
 * @description    Micro blog Router 
 * @author         RR1335
 */

const router = require("koa-router")()
const { loginRedirect } = require('../../middlewares/logincheck')
const { getProfileBlogList } = require('../../controller/blog-profile')
const {getSquareBlogList } = require('../../controller/blog-square')


// 首页， index 
router.get('/', loginRedirect, async (ctx , next) => {
    await ctx.render('index', {})
})


// 个人主页
router.get('/profile', loginRedirect , async (ctx , next) => {
    const { userName } = ctx.session.userInfo
    ctx.redirect(`/profile/${userName}`)
})
router.get('/profile/:userName', loginRedirect , async (ctx , next) => {
    const { userName : curUserName } = ctx.params
    // 获取 KWC first page blogData
    // controller
    const result = await getProfileBlogList(curUserName, 0)
    const { isEmpty , blogList , pageSize , pageIndex , count } = result.data

    await ctx.render('profile' , {
        blogData: {
            isEmpty,
            blogList,
            pageIndex,
            pageSize,
            count
        }
    })
})


// 广场
router.get('/square', loginRedirect , async (ctx , next) => {
    const result = await getSquareBlogList(0)
    const { isEmpty , blogList , pageSize , pageIndex , count } = result.data

    await ctx.render('square' , {
        blogData: {
            isEmpty,
            blogList,
            pageIndex,
            pageSize,
            count
        }
    })
})


module.exports = router