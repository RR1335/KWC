/**
 * @description   user Controller 
 * @author        RR1335
 */

const { getUserInfo ,createUser } = require('../services/user')
const { SuccessModel , ErrorModel } = require('../model/ResModel')
const { registerUserNameNotExistInfo , loginFailInfo } = require('../model/ErrorInfo')
const { doCrypto } = require('../utils/crypto')

/**
 * 检查用户是否存在 
 * @param {string} userName  用户名
 */
async function isExist(userName) {
    // 业务处理逻辑

    // 调用 services 层
    const userInfo = await getUserInfo(userName)
    // 统一返回格式
    // {
    //     errno: 0,
    //     data : {
    //         ……
    //     }
    // }
    if (userInfo) {
        return new SuccessModel(userInfo)
    }else {
        // 错误返回格式
        // {
        //     errno: 错误代码,
        //     message: 错误信息
        // }
        return new ErrorModel(registerUserNameNotExistInfo)
    }
}

/**
 * 用户注册
 * @param {string} userName     用户名
 * @param {string} password     密码
 * @param {number} gender       性别 (1. 男 2. 女 3. 保密)
 */
async function register({ userName , password ,gender}) {
    const userInfo = await getUserInfo(userName)
    // 用户名已存在
    if (userInfo) {
        return ErrorModel(registerUserNameExistInfo)
    }

    // 注册 ， service 
    try {
        await createUser({
            userName,
            password: doCrypto(password),
            gender
        })
        // 注册成功无须返回 values , 通过 errno = 0 判断成功即createUser数据库写入数据成功
        return  new SuccessModel()
    }catch (err) {
        // 输出错误信息
        console.error(err.message , err.stack)
        // 返回创建用户失败的结果
        return new ErrorModel(registerFailInfo)
    }

}

/**
 * 登录
 * @param {Object} ctx          Koa2 CTX 参数
 * @param {string} userName     用户名
 * @param {string} password     密码
 */
async function login(ctx, userName, password) {
    // 登录成功 ctx.session.userInfo = xxx (用户信息)
    // 获取用户信息
    const userInfo = await getUserInfo(userName, doCrypto(password))

    if (!userInfo) {
        // 登录失败
        return new ErrorModel(loginFailInfo)
    }

    // 登录成功 ， 可以不做判断直接赋值
    if ( ctx.session.userInfo == null ) {
        ctx.session.userInfo = userInfo
    }

    return new SuccessModel()
    
}


module.exports = {
    isExist,
    register,
    login
}