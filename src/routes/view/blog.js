/**
 * @description    Micro blog Router 
 * @author         RR1335
 */

const router = require("koa-router")()
const { loginRedirect } = require('../../middlewares/logincheck')


// 首页， index 
router.get('/', loginRedirect, async (ctx , next) => {
    await ctx.render('index', {})
})


module.exports = router