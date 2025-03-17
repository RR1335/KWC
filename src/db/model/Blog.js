/**
 * @description   Micro Blog 数据模型
 * @author        RR1335
 */

const seq = require('../seq')
const { STRING,TEXT,INTEGER } = require('../types')

// Blog 数据模型
const  Blog = seq.define('blog',{
    userId : {
        type: INTEGER,
        allowNull: false,
        comment: '用户 ID'
    },
    content : {
        type: TEXT,
        allowNull: false,
        comment: ' Micro Blog 内容'
    },
    image : {
        type: STRING,
        allowNull: true,
        comment: '图片'
    }
})


module.exports = Blog 