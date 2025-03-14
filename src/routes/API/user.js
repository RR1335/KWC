/**
 * @description  user API 路由
 * @author       RR1335
 */

const router = require('koa-router')()
const { isExist,register,login } = require('../../controller/user')
const userValidate = require('../../validator/user')
const {genValidator} = require('../../middlewares/validator')

router.prefix('/api/user')

// 注册
router.post('/register', genValidator(userValidate), async (ctx , next) => {
    const { userName ,password , gender } = ctx.request.body
    // controller 
    ctx.body = await register({ userName ,password , gender })

})


// 登录 
router.post('/login', async (ctx,next) => {
    const { userName , password } = ctx.request.body
    // controller 
    ctx.body = await login(ctx, userName, password)
})


// 判断用户是否存在
router.post('/isExist' , async (ctx , next) => {
    const { userName } = ctx.request.body
    // controller
    ctx.body = await isExist(userName)
    // return Data
})


module.exports = router