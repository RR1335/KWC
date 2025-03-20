/**
 * @description    Micro blog Router 
 * @author         RR1335
 */

const router = require("koa-router")()
const { loginRedirect, loginCheck } = require('../../middlewares/logincheck')
const { getProfileBlogList } = require('../../controller/blog-profile')
const {getSquareBlogList } = require('../../controller/blog-square')
const { isExist } = require('../../controller/user')
const { getFans,getFollowers } = require('../../controller/user-relation')
const { getIndexBlogList } = require('../../controller/blog-index')
const { atMeCount ,getAtMeBlogList } = require('../../controller/blogAt')


// 首页， index 
router.get('/', loginRedirect, async (ctx , next) => {
    const userInfo = ctx.session.userInfo
    const { id : userId} = userInfo

    // 获取第一页数据
    const result = await getIndexBlogList(userId)
    const { isEmpty,blogList, pageIndex,pageSize,count} = result.data


    // 获取关注人 List 
    const followersResult = await getFollowers(userId)
    const { count: followersCount , followersList } = followersResult.data
    
    // 获取粉丝
    const fansResult =  await  getFans(userId)
    const { fansCount , fansList } = fansResult.data

    // 获取 @ 数量
    const atCountResult = await atMeCount(userId)
    // const atCount = atCountResult.data.count 

    await ctx.render('index', {
        blogData: {
            isEmpty,
            blogList,
            pageIndex,
            pageSize,
            count
        },
        userData: {
            userInfo,
            fansData: {
                count: fansCount,
                list:fansList
            },
            followersData: {
                count: followersCount,
                list : followersList
            },
            atCount: atCountResult.data.count
        }
    })
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

    // 获取关注人 List 
    const followersResult = await getFollowers(curUserInfo.id)
    const { count: followersCount , followersList } = followersResult.data

    // 是否关注了此 ID 
    const amIFollowed = fansList.some( item => {
        return item.userName === myUserInfo
    })

        // 获取 @ 数量
        const atCountResult = await atMeCount(curUserInfo.id)
        const atCount = atCountResult.data.count 

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
            },
            followersData: {
                count: followersCount,
                list : followersList
            },
            amIFollowed,
            atCount
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

// atMe 
router.get('/at-me',loginCheck, async (ctx , next) => {
    const { id : userId } = ctx.session.userInfo
    // 获取 @ 数量
    const atCountResult = await atMeCount(userId)
    const atCount = atCountResult.data.count 
    // 获取第一页 list
    const result = await getAtMeBlogList(userId)
    const { isEmpty,blogList,pageIndex,pageSize,count} = result.data
    
    // 渲染页面
    await ctx.render('atMe', {
        atCount,
        blogData: {
            isEmpty,
            blogList,
            pageIndex,
            pageSize,
            count
        }

    })

    // 标记为已读
    if (atCount > 0) {

    }

})

module.exports = router