/**
 * @description   user Controller 
 * @author        RR1335
 */

const { getUserInfo ,createUser,deleteUser,updateUser } = require('../services/user')
const { SuccessModel , ErrorModel } = require('../model/ResModel')
const { registerUserNameNotExistInfo , 
        registerUserNameExistInfo,
        loginFailInfo,
        changeInfoFailInfo,
        deleteUserFailInfo } = require('../model/ErrorInfo')
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
        return new ErrorModel(registerUserNameExistInfo)
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


/**
 * 删除当前用户
 * @param {string} userName  用户名
 */
async  function  deleteCurUser(userName) {
    // service 
    const result = await deleteUser(userName) 
    if (result) {
        return new SuccessModel()
    }

    return new ErrorModel(deleteUserFailInfo)
}


/**
 * 修改用户信息
 * @param {Object} ctx      ctx 传数据
 * @param {*} param1        修改的内容 { nickName , city , picture  }
 */
async function changeInfo(ctx,{ nickName , city , picture  }) {
    const { userName } = ctx.session.userInfo

    // 作为一个保护机制，可有可无；在注册时已经有过赋值
    if (!nickName) {
        nickName = userName
    }

    // service
    const result = await updateUser( 
        {
            newNickName : nickName,
            newCity : city,
            newPicture : picture
        },
        { userName }
    )

    if (result) {
        // 执行成功 
        // const returnedTarget = Object.assign(target, source);
        Object.assign(ctx.session.userInfo, {
            nickName,
            city,
            picture
        })

        return new SuccessModel()
    }

    return new ErrorModel(changeInfoFailInfo)
}



module.exports = {
    isExist,
    register,
    login,
    deleteCurUser,
    changeInfo
}