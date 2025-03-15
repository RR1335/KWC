/**
 * @description    Utils API 路由
 * @author         RR1335
 */

const router = require('koa-router')()
const { loginCheck } = require('../../middlewares/logincheck')
const koaForm = require('formidable-upload-koa')
const { saveFile } = require('../../controller/utils')

router.prefix('/api/utils')

// koaForm(options) ,  formidable-upload-koa 要传输的参数
// const options = {
//     uploadDir: `${__dirname}/`,
//     keepExtensions: true
//   };

// 上传图片
router.post('/upload', loginCheck , koaForm(), async ( ctx , next ) => {
    // file 对应 public/ajax -- formdata.append('file',file)
    // ctx.req 是 Node's request object.  ctx.request 才是 A Koa Request object.
    // 这里从 node request object 取数据
    const file = ctx.req.files['file']
    // 获取文件的信息和数据
    const { name , size , type , path } = file
    // controller 
    ctx.body = await saveFile({
        name,
        size,
        type,
        filePath: path
    })

})


module.exports = router