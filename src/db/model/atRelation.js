/**
 * @description  @ 用户关系，数据模型
 * @author       RR1335
 */

const seq = require('../seq')
const { BOOLEAN,INTEGER } = require('../types')


/**
 * 定义 @ 数据模型
 */
const AtRelation = seq.define('atRelation',{
    userId: {
        type: INTEGER,
        allowNull: false,
        comment: '用户 id'
    },
    blogId:{
        type: INTEGER,
        allowNull: false,
        comment: 'Blog Id'
    },
    isRead: {
        type: BOOLEAN,
        allowNull: false,
        defaultValue: false,     // 默认未读
        comment: '是否已读'
    }
})


module.exports = AtRelation