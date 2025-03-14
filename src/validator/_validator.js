/**
 * @description  JSON Schema 校验
 * @author       RR1335
 */

const Ajv = require('ajv')
const ajv = new Ajv({
    // 输出校验所有的错误
    // allErrors: true      // 暂不校验输出所有，执行较慢影响速度
}) 

/**
 * JSON Schema 校验函数
 * @param {Object} schema  JSON Schema 校验规则 Rules
 * @param {*} data         待校验的数据
 */
function validate(schema , data = {}) {
    const valid = ajv.validate(schema,data) 
    if (!valid) {
        return ajv.error[0]     // [0] 返回第一个错误
    }

}
 
module.exports = validate