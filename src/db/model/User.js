/**
 * @description 用户数据模型
 * @author      RR1335
 */

const seq = require('../seq')
const { STRING,DECIMAL } = require('../types')

const  User = seq.define('user', {
    userName : {
        type : STRING ,
        allowNull : false,
        unique : true,
        comment : '用户名 ，唯一'
    },
    password : {
        type : STRING,
        allowNull : false,
        comment : '密码'
    },
    nickName : {
        type : STRING,
        allowNull : true,
        comment : '昵称'
    },
    gender : {
        type : DECIMAL,
        allowNull : false,
        comment : '性别 「1 男，2 女，3 保密」'
    },
    picture : {
        type : STRING,
        allowNull : true,
        comment : '头像，存储图片URL地址'

    },
    ctiy : {
        type : STRING,
        allowNull : true,
        comment : '城市 ， RR1335后续改成城市列表选择'
    }

})

module.exports = User