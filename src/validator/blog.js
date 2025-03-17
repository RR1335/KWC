/**
 * @description  Blog 格式校验
 * @author       RR1335
 */

const validate = require('./_validator')

// Blog 数据校验
const SCHEMA = {
    type : 'object',
    properties: {
        content : {
            type: 'string'
        },
        image : {
            type: 'string',
            maxLength: 255
        }
    }
}



/**
 * 校验 Blog 数据格式
 * @param {Object} data  用户数据
 */
function blogValidate(data = {}) {
    return validate(SCHEMA,data)
}

module.exports = blogValidate