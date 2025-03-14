/**
 * @description  登录验证的中间件
 * @author       RR1335
 */

const { ErrorModel } = require('../model/ResModel')
const { loginCheckFailInfo } = require('../model/ErrorInfo')

/**
 * 登录校验 API
 * @param {Object} ctx   
 * @param {Function} next 
 */
async  function  loginCheck(ctx,next) {
    if (ctx.session && ctx.session.userInfo) {
        // 已登录
        await next()
        return
    }

    // 未登录
    ctx.body = new ErrorModel(loginCheckFailInfo)

}

/**
 * 登录校验 Page
 * @param {Object} ctx 
 * @param {Function} next 
 */
async  function  loginRedirect(ctx,next) {
    if (ctx.session && ctx.session.userInfo) {
        // 已登录
        await next()
        return
    }

    // 未登录
    const  curUrl = ctx.url 
    ctx.redirect('/login?url='+ encodeURIComponent(curUrl))
}

module.exports = {
    loginCheck,
    loginRedirect
}