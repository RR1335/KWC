/**
 * @description  数据格式化
 * @author       RR1335
 */

const { DEF_PICTURE ,REG_FOR_AT_WHO} = require('../conf/constant')
const { timeFormat } = require('../utils/dt')

/**
 * 用户默认头像 
 * @param {object} obj 用户对象
 */
function  _formatUserPicture(obj) {
    if (obj.picture == null) {
        obj.picture = DEF_PICTURE
    }
    return obj
}


/**
 * 格式化用户信息
 * @param {Array | Object} list 用户列表或某个用户 
 */
function  formatUser(list) {
    if ( list == null ) {
        return list
    }
    if ( list instanceof Array) {
        return list.map(_formatUserPicture)
    }

    return _formatUserPicture(list)
}

/**
 * 格式化数据时间
 * @param {Object} obj   数据
 * @returns 
 */
function _formatDBTime(obj) {
    obj.createdAtFormat = timeFormat(obj.createdAt)
    obj.updatedAtFormat = timeFormat(obj.updatedAt)
    return obj
  }


  /**
   * 格式化微博内容
   * @param {Object} obj  数据
   * @returns 
   */
function _formatContent(obj) {
    obj.contentFormat = obj.content
  
    // 格式化 @
    // from 'Hello @三儿 - San 你好'
    // to 'Hello <a href="/profile/San">三儿</a> 你好'
    obj.contentFormat = obj.contentFormat.replace(
      REG_FOR_AT_WHO,
      (matchStr, nickName, userName) => {
        return `<a href="/profile/${userName}">@${nickName}</a>`
        // return `<a href="/profile/${userName}">${nickName}</a>`
      }
    )
  
    return obj
  }


  /**
   * 格式化 Blog
   * @param {Array} list  Blog list or Blog 对象
   * @returns 
   */
function formatBlog(list) {
    if (list == null) {
      return list
    }
  
    if (list instanceof Array) {
      // 数组
      return list.map(_formatDBTime).map(_formatContent)
    }
    // 对象
    let result = list
    result = _formatDBTime(result)
    result = _formatContent(result)
    return result
  }

module.exports = {
    formatUser,
    formatBlog
}