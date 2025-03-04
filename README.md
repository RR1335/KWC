# KWC 作者： RR1335 
 一个类似Sina weibo的服务；前后台程序和API。前端程序是 EJS 模板。

 框架与数据库

    Koa2 —— 和 express 师出同门，支持 async/await 变成方法
    MySQL —— ORM —— Sequelize 
    JWT 
    Redis
    Jest

页面和JavaScript脚本路径

   页面 ejs —— views
   JavaScript and CSS —— public / css and public / javascirpt

环境变量的配置

   cross-env —— 跨 Windows / macOS / Linux 三个平台。
   — "dev": "cross-env NODE_ENV=dev ./node_modules/.bin/nodemon bin/www",
   — "prd": "cross-env NODE_ENV=production pm2 start bin/www",










脚手架目录调整

   public 
   routes
   views
   app
   以上四个文件或文件夹调整掉 src （source） 源文件目录下。
   同时调整 bin/www.js 的 app 启动目录。
