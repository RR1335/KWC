/**
 * @description  user API 路由
 * @author       RR1335
 */

const router = require('koa-router')()
const { isExist,
        register,
        login ,
        logout,
        deleteCurUser,
        changePassword,
        changeInfo} = require('../../controller/user')
const userValidate = require('../../validator/user')
const {genValidator} = require('../../middlewares/validator')
const { loginCheck } = require('../../middlewares/logincheck')
const { isTest } = require('../../utils/env')
const { getFollowers } = require('../../controller/user-relation')

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


// 退出登录
router.post('/logout', loginCheck , async (ctx , next) => {
    // logout 操作没有任何参数传入操作，直接调用 controller 
    ctx.body = await logout(ctx)
})


// 获取 at 列表，即：关注人列表
router.get('/getAtList',loginCheck , async (ctx , next) => {
    const { id: userId } = ctx.session.userInfo
    const result = await getFollowers(userId)
    const { followersList } = result.data

    const list = followersList.map(user => {
        return `${user.nickName} - ${user.userName}`
    })

    // 返回数组的结构  ['昵称 - 用户名'] ['三儿-san','伍仁-wuren']
    // 显示格式处理 service / _format.js
    ctx.body = list

})


module.exports = router