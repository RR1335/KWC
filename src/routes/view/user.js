/**
 * @description  user view 路由配置
 * @author       RR1335
 */

const router = require('koa-router')()

/**
 * 获取登录状态
 * @param {Object} ctx     Koa2 CTX
 */
function getLoginInfo(ctx) {
    let data = {
        isLogin:false     // 默认未登录
    }

    const userInfo = ctx.session.userInfo

    if (userInfo) {
        data = {
            isLogin: true,
            userName: userInfo.userName
        }
    }

    return data
}


router.get('/login', async (ctx , next) => {
    await ctx.render('login', getLoginInfo(ctx))
})

router.get('/register', async (ctx , next) => {
    await ctx.render('register', getLoginInfo(ctx))
})

module.exports = router