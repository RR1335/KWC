/**
 * @description  user view 路由配置
 * @author       RR1335
 */

const router = require('koa-router')()

/**
 * 获取登录状态
 * @param {Object} ctx     Koa2 CTX
 */
function _getLoginInfo(ctx) {
    let data = {
        isLogin: false     // 默认未登录
    }

    // console.log('ctx.session.userInfo__: ',ctx.session.userInfo)
    const userInfo = ctx.session.userInfo

    if (userInfo) {
        data = {
            isLogin: true,
            userName: userInfo.userName
        }
    }

    // data = {
    //     isLogin: true,
    //     userName: 'www'
    // }

    return data
}


// router.get('/login', async (ctx , next) => {
//     await ctx.render('login', _getLoginInfo(ctx))
// })

router.get('/login', async function(ctx , next) {
    await ctx.render('login', _getLoginInfo(ctx))
})

router.get('/register', async (ctx , next) => {
    await ctx.render('register', _getLoginInfo(ctx))
})

module.exports = router