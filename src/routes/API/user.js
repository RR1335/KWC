/**
 * @description  user API 路由
 * @author       RR1335
 */

const router = require('koa-router')()
const { isExist,register } = require('../../controller/user')
const userValidate = require('../../validator/user')

router.prefix('/api/user')


router.post('/register', async (ctx , next) => {
    // 校验
    userValidate(ctx.request.body)
}, async (ctx , next) => {
    const { userName ,password , gender } = ctx.request.body
    // controller 
    ctx.body = await register({ userName ,password , gender })

})


router.post('/isExist' , async (ctx , next) => {
    const { userName } = ctx.request.body
    // controller
    ctx.body = await isExist(userName)
    // return Data
})

module.exports = router