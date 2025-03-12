/**
 * @description   user services 
 * @author        RR1335
 */


const { User } = require('../db/model/indexModel')
const { formatUser } = require('./_format')
 

/**
 * 获取用户信息
 * @param {string} userName  用户名
 * @param {string} password  密码
 */
async function getUserInfo(userName , password) {
    const whersOpt = {
        userName
    }
    if (password) {
        Object.assign(whersOpt , { password })   // 传了 passwor ，则把 password 加入查询条件
    }

    // 查询
    const result = await User.findOne({
        attributes: ['id','userName','nickName','picture','city'],
        where : whersOpt
    })

    if (result == null) {
        return result
    }

    // 格式化
    const formatRes = formatUser(result.dataValues)

    return formatRes
}

/**
 * 创建用户
 * @param {*} param0  { userName , password , gender = 3 , nickName }
 */
async function createUser({ userName , password , gender = 3 , nickName }) {
    const result = await User.create({
        userName,
        password,
        nickName: nickName ? nickName : userName ,
        gender
    })

    return result.dataValues
}


module.exports = {
    getUserInfo,
    createUser
}
