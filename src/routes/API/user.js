/**
 * @description  user API 路由
 * @author       RR1335
 */

const router = require('koa-router')()
const { isExist } = require('../../controller/user')

router.prefix('/api/user')


router.post('/register', async (ctx , next) => {

})


router.post('/isExist' , async (ctx , next) => {
    const { userName } = ctx.request.body
    // controller
    ctx.body = await isExist(userName)
    // return Data
})

module.exports = router