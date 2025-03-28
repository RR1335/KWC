/**
 * @description 加密方法
 * @author      RR1335
 */

const crypto = require('crypto')
const {CRYPTO_SECRET_KEY} = require('../conf/secretKeys')


/**
 * MD5 加密
 * @param {string} content   加密内容明文
 */
function _md5(content) {
    const md5 = crypto.createHash('md5')
    return md5.update(content).digest('hex')
}


/**
 * 加密方法
 * @param {string} content  加密内容，明文
 */
function doCrypto(content) {
    const str = `password=${content}&key=${CRYPTO_SECRET_KEY}`
    return _md5(str)
}

module.exports = {
    doCrypto
}