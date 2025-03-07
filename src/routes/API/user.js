/**
 * @description  user API 路由
 * @author       RR1335
 */

const router = require('koa-router')()

router.prefix('/api/user')


router.post('/register', async (ctx , next) => {

})


router.post('/isExist' , async (ctx , next) => {
    const { userName } = ctx.request.body
    // controller
    // return Data
})

module.exports = router