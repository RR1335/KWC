/**
 * @description   user services 
 * @author        RR1335
 */


const { User } = require('../db/model/indexModel')
const { formatUser } = require('./_format')
const { addFollower } = require('./userRelation')
 

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

    const data = result.dataValues

    // 自己关注自己
    addFollower(data.id,data.id)

    return data
}

/**
 * 删除用户
 * @param {string} userName 
 */
async function  deleteUser(userName) {
    const result = await User.destroy({
        where: {
            userName
        }
    })

    return result > 0
}

/**
 * 更新用户信息
 * @param {Object} param0    更新的用户信息 { newPassword , newNickName, newCity , newPicture }
 * @param {Object} param1    确定当前用户， update 中 where 条件 { userName,password } 
 */
async function updateUser({ newPassword , newNickName, newCity , newPicture},{userName,password}) {
    // 拼接修改内容
    const updateData = {}
    // updateData.xxx xxx 要对应 User model 中的属性名
    if (newNickName) {
        updateData.nickName = newNickName
    }
    if (newPassword) {
        updateData.password = newPassword
    }
    if (newCity) {
        updateData.city = newCity
    }
    if (newPicture) {
        updateData.picture = newPicture
    }
    // 拼接查询条件
    const whereData = {
        userName
    }
    if (password) {
        whereData.password = password
    }
    // 执行修改
    const result = await User.update(updateData, {
        where: whereData
    })

    return result[0] > 0
}


module.exports = {
    getUserInfo,
    createUser,
    deleteUser,
    updateUser
}
