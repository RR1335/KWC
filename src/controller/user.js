/**
 * @description   user Controller 
 * @author        RR1335
 */

const { getUserInfo } = require('../services/user')
const { SuccessModel , ErrorModel } = require('../model/ResModel')
const { registerUserNameNotExistInfo } = require('../model/ErrorInfo')

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


module.exports = {
    isExist
}