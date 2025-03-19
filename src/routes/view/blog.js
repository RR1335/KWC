/**
 * @description    Micro blog Router 
 * @author         RR1335
 */

const router = require("koa-router")()
const { loginRedirect } = require('../../middlewares/logincheck')
const { getProfileBlogList } = require('../../controller/blog-profile')
const {getSquareBlogList } = require('../../controller/blog-square')
const { isExist } = require('../../controller/user')
const { getFans } = require('../../controller/user-relation')


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
    // 已登录用户信息
    const myUserInfo = ctx.session.userInfo
    const myUserName = myUserInfo.userName

    let curUserInfo
    const { userName : curUserName } = ctx.params
    const isMe = myUserName === curUserName
    if (isMe) {
        // 当前用户登录
        curUserInfo = myUserInfo
    } else {
        // 不是当前用户登录
        const existResult = await isExist(curUserName)
        if (existResult.errno !== 0) {
            // 用户名不存在
            return
        }
        // 用户名存在
        curUserInfo = existResult.data
    }
    // 获取 KWC first page blogData
    // controller
    const result = await getProfileBlogList(curUserName, 0)
    const { isEmpty , blogList , pageSize , pageIndex , count } = result.data

    // 获取粉丝
    const fansResult =  await  getFans(curUserInfo.id)
    const { fansCount , fansList } = fansResult.data

    // 是否关注了此 ID 
    const amIFollowed = fansList.some( item => {
        return item.userName === myUserInfo
    })


    await ctx.render('profile' , {
        blogData: {
            isEmpty,
            blogList,
            pageIndex,
            pageSize,
            count
        },
        userData: {
            userInfo: curUserInfo,
            isMe,
            fansData: {
                count : fansCount,
                list : fansList
            }
        },
        amIFollowed
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