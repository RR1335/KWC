/**
 * @description   API utils controller
 * @author        RR1335
 */

const path = require('path')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { uploadFileSizeFailInfo } = require('../model/ErrorInfo')
const fse = require('fs-extra')

// 文件最大尺寸
const MAX_SIZE =  2048 * 1024 * 1024
// 存储目录
const DIST_UPLOAD_PATH = path.join(__dirname,'..','..','uploadfiles')

// 是否需要创建目录
fse.pathExists(DIST_UPLOAD_PATH).then(exist => {
    if (!exist) {
        fse.ensureDir(DIST_UPLOAD_PATH)
    }
})

/**
 * 存储文件
 * @param {Object} param0  { name , size , type , filePath }
 */
async function saveFile({ name , size , type , filePath }) {
    if (size > MAX_SIZE ) {
        await fse.remove(filePath)
        return new ErrorModel(uploadFileSizeFailInfo)
    }

    // 移动文件
    const fileName = Date.now()+'_'+name   // 防止重名
    const distFilePath = path.join(DIST_UPLOAD_PATH,fileName)
    await fse.move(filePath,distFilePath)

    // 返回信息  'http://localhost:3000/touxiang-1.png' 返回「文件名‘/touxiang-1.png’」
    return new SuccessModel({
        url : '/' + fileName

    })
}



module.exports = {
    saveFile
}