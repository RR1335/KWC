# KWC 作者： RR1335 
 一个类似Sina weibo的服务；前后台程序和API。前端程序是 EJS 模板。

 ## 框架与数据库

    Koa2 —— 和 express 师出同门，支持 async/await 变成方法
    MySQL —— ORM —— Sequelize 
    JWT 
    Redis
    Jest
    koa-redis 
    koa-generic-session
    sequelize

## 页面和JavaScript脚本路径

      页面 ejs —— views

      JavaScript and CSS —— public / css and public / javascirpt

## 环境变量的配置

      cross-env —— 跨 Windows / macOS / Linux 三个平台。
      — "dev": "cross-env NODE_ENV=dev ./node_modules/.bin/nodemon bin/www",
      — "prd": "cross-env NODE_ENV=production pm2 start bin/www",


## 测试 

      工具 jest  |  supertest
      配置 "test": "cross-env NODE_ENV=test jest --runInBand --forceExit --colors"
      测试文件目录 test
      测试文件后缀  .test.js


## Chrome inspect 调试

      chrome://inspect 
      "dev": "cross-env NODE_ENV=dev ./node_modules/.bin/nodemon --inspect=9229 bin/www“
      默认端口： 9229




## 脚手架目录调整

      public 
      routes
      views
      app
      以上四个文件或文件夹调整掉 src （source） 源文件目录下。
      同时调整 bin/www.js 的 app 启动目录。
      conf ： 对数据库配置
      cache : redis 操作，以及业务逻辑层对 redis 操作
      utils ： 环境变量的信息
      ztest/seq ： sequelize 的操作练习代码



## 加密

      doCrypto 加密 MD5 
      conf / secretkeys  Keys ID 

      对于 getUserInfo(userName, doCrypto(password) ) 注意⚠️保存数据库的用户信息都已经被加密了获取信息同样要被加密


## 数据格式校验

      validator / _validator.js 数据格式校验
      采用 JSON Schema 格式校验
      ajv 是校验的中间件

      router 中的校验能写在
            router.post('/', async (ctx,next) => { 校验 }, async (ctx,next) => { 执行路由 })
      不过对于校验函数，是一个公共属性，抽离为中间件
      middlewares / 校验函数 

      这是要调整的，体现一下校验在路由中的逻辑
      router.post('/register', async (ctx , next) => {
      // 校验
      userValidate(ctx.request.body)
      }, async (ctx , next) => {
      const { userName ,password , gender } = ctx.request.body
      // controller 
      ctx.body = await register({ userName ,password , gender })

      })

## 数据分层

      src / controller  控制层 
      src / services    服务层
      src / model       格式化输出，错误信息
      src / conf / constant.js 所有默认数据
      

## 图片上传

      上传图片，用到了两个中间件
       formidable-upload-koa 和  fs-extra 

            const options = {
            uploadDir: `${__dirname}/`,
            keepExtensions: true
            };

            router.post("/uploader", koaForm(options), ctx => {
            // Access to
            // ctx.req.files
            // ctx.req.fields
            // The file has been uploaded in the folder choosen above.
            });

      view/api/utils.js 用公共属性处理图片上传

## 配置 SESSION

```
   app.keys = ['asdfjiIUSke787*^(#*&384#KjJHKHHH3sSDD^&*^323']
   app.use(session({
   key: 'KWC Blog.SID ',         // cookie name 默认 koa.sid
   prefix: 'KWC Blog: sess - ',     // redis key 前缀，默认 koa:sess
   cookie: {
      path: '/',
      httpOnly: true,
      maxAge : 24 * 60 * 60 * 1000  // 1 day
   },
   ttl: 24 * 60 * 60 * 1000 ,   // redis 过期时间 ， 默认和 cookies maxAge 一致
   store: redisStore({
      all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
   })
   }))
   https://g-phrh5558.coding.net/public/nb/kwc/git/files 来自早起版本
```

      127.0.0.1:6379> keys *
      1) "KWC Blog: sess - ZL8RX_mILIM7300tAuVZnNeWSeia3g0x"

      127.0.0.1:6379> get "KWC Blog: sess - ZL8RX_mILIM7300tAuVZnNeWSeia3g0x"
      "{\"cookie\":{\"path\":\"/\",\"httpOnly\":true,\"maxAge\":86400000,\"overwrite\":true,\"signed\":true},\"userInfo\":{\"id\":6,\"userName\":\"san\",\"nickName\":\"san\",\"picture\":\"https://lc.baijing.biz/\",\"city\":null}}"

      在 Cookie 中存的 KWC blog.SID 和 redis 中的值一致，保证了 session 后续存取用户数据且在浏览器侧进行了数据加密


## 备注

      前端没有做 Data format 校验，所有的校验都在后端。
      这是为了验证后端校验是否生效，以及所有的 error 提示动作都到位。
      register 表单等。