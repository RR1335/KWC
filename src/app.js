const Koa = require('koa')
const app = new Koa()
const path = require('path')
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
// import logger from 'koa-logger'
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const  koastatic= require('koa-static')

const { REDIS_CONF } = require('./conf/db')
const { isProd } = require('./utils/env')
const { SESSION_SECRET_KEY } = require('./conf/secretKeys')


// index and users 为 koa2 默认生成的路由
// const index = require('./routes/index.js-0ld')
// const index = require('./routes/index')
// const users = require('./routes/users')
// 注册 view 路由
const userViewRouter = require('./routes/view/user')
const blogViewRouter = require('./routes/view/blog')


// 注册 API 路由
const blogIndexAPIRouter = require('./routes/API/blog-index')
const userAPIRouter = require('./routes/API/user')
const blogProfileAPIRouter = require('./routes/API/blog-profile')
const squareAPIRouter = require('./routes/API/blog-square')
const utilsAPIRouter = require('./routes/API/utils')

// 错误处理，在所有路由的最后处理
const errorViewRouter = require('./routes/view/error')


// error handler
let onerrorConf = {}
if (isProd) {
  onerrorConf = {
    redirect : '/error'
  }
}
onerror(app, onerrorConf)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(koastatic(__dirname + '/public'))
// 图片上传的 path 
app.use(koastatic(path.join(__dirname,'..', 'uploadfiles')))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// session 配置
app.keys = [SESSION_SECRET_KEY]
app.use(session({
  key: 'KWC Blog.SID',         // cookie name 默认 koa.sid
  prefix: 'KWC Blog:sess-',     // redis key 前缀，默认 koa:sess
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge : 24 * 60 * 60 * 1000  // 1 day
  },
  ttl: 24 * 60 * 60 * 1000 ,   // redis 过期时间 ， 默认和 cookies maxAge 一致
  store: redisStore({
    all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
  })
})
)



// logger
// app.use(async (ctx, next) => {
//   const start = new Date()
//   await next()
//   const ms = new Date() - start
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// })

// routes
// app.use(index.routes(), index.allowedMethods())
// app.use(users.routes(), users.allowedMethods())
// view router
app.use(blogViewRouter.routes(),blogViewRouter.allowedMethods())
app.use(userViewRouter.routes(),userViewRouter.allowedMethods())

// api router
app.use(blogIndexAPIRouter.routes(),blogIndexAPIRouter.allowedMethods())
app.use(userAPIRouter.routes(),userAPIRouter.allowedMethods())
app.use(blogProfileAPIRouter.routes(),blogProfileAPIRouter.allowedMethods())
app.use(squareAPIRouter.routes(),squareAPIRouter.allowedMethods())
app.use(utilsAPIRouter.routes(),utilsAPIRouter.allowedMethods())

// 404 是 * ， error 的路由在最后一个
app.use(errorViewRouter.routes(),errorViewRouter.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
