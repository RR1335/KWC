/**
 * @description  user view 路由配置
 * @author       RR1335
 */

const router = require('koa-router')()
const { loginRedirect } = require('../../middlewares/logincheck')

/**
 * 获取登录状态
 * @param {Object} ctx     Koa2 CTX
 */
function _getLoginInfo(ctx) {
    let data = {
        isLogin: false     // 默认未登录
    }

    // console.log('ctx.session.userInfo__: ',ctx.session.userInfo)
    // 未能获取 ctx.session.userInfo 的数据，要查一下原因
    // session 的存储是否相关 
    const userInfo = ctx.session.userInfo

    if (userInfo) {
        data = {
            isLogin: true,
            userName: userInfo.userName
        }
    }

    // 模拟数据，证明接口是OK的
    // data = {
    //     isLogin: true,
    //     userName: 'www'
    // }

    return data
}


router.get('/login', async (ctx , next) => {
    await ctx.render('login', _getLoginInfo(ctx))
})


router.get('/register', async (ctx , next) => {
    await ctx.render('register', _getLoginInfo(ctx))
})


router.get('/setting', loginRedirect, async (ctx ,next ) => {
    await ctx.render('setting', ctx.session.userInfo)
})



module.exports = router