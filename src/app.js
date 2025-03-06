const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
// import logger from 'koa-logger'
const session = require('koa-generic-session')
const redisStore = require('koa-redis')

const { REDIS_CONF } = require('./conf/db')

const index = require('./routes/index')
const users = require('./routes/users')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// session 配置
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


// logger
// app.use(async (ctx, next) => {
//   const start = new Date()
//   await next()
//   const ms = new Date() - start
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// })

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
