# KWC 作者： RR1335 
 一个类似Sina weibo的服务；前后台程序和API。前端程序是 EJS 模板。

 ##框架与数据库

    Koa2 —— 和 express 师出同门，支持 async/await 变成方法
    MySQL —— ORM —— Sequelize 
    JWT 
    Redis
    Jest
    koa-redis 
    koa-generic-session
    sequelize

##页面和JavaScript脚本路径

      页面 ejs —— views

      JavaScript and CSS —— public / css and public / javascirpt

##环境变量的配置

      cross-env —— 跨 Windows / macOS / Linux 三个平台。
      — "dev": "cross-env NODE_ENV=dev ./node_modules/.bin/nodemon bin/www",
      — "prd": "cross-env NODE_ENV=production pm2 start bin/www",


##测试 

      工具 jest  |  supertest
      配置 "test": "cross-env NODE_ENV=test jest --runInBand --forceExit --colors"
      测试文件目录 test
      测试文件后缀  .test.js


##Chrome inspect 调试

   chrome://inspect 
   "dev": "cross-env NODE_ENV=dev ./node_modules/.bin/nodemon --inspect=9229 bin/www“
   默认端口： 9229




##脚手架目录调整

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

##配置 SESSION

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
```
