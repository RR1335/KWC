/**
 * @description  user API 路由
 * @author       RR1335
 */

const router = require('koa-router')()
const { isExist,
        register,
        login ,
        deleteCurUser,
        changePassword,
        changeInfo} = require('../../controller/user')
const userValidate = require('../../validator/user')
const {genValidator} = require('../../middlewares/validator')
const { loginCheck } = require('../../middlewares/logincheck')
const { isTest } = require('../../utils/env')

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

//删除
router.post('/delete', loginCheck, async (ctx , next) => {
    if (isTest) {
        // 测试环境， 登录用户删除自己
        const  { userName } = ctx.session.userInfo
        // controller
        ctx.body  =  await deleteCurUser(userName)
    }
})

// 修改个人信息
router.patch('/changeInfo', loginCheck , genValidator(userValidate) , async (ctx, next) => {
    const { nickName , city , picture } = ctx.request.body
    // controller
    ctx.body = await changeInfo(ctx, { nickName , city , picture })
})


// 修改密码
router.patch('/changePassword',loginCheck , genValidator(userValidate), async (ctx,next) => {
    const { password , newPassword } = ctx.request.body
    const { userName } = ctx.session.userInfo
    //controller
    ctx.body = await changePassword(userName,password,newPassword)
})



module.exports = router