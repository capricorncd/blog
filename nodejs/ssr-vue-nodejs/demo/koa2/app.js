const Koa = require('koa')
const Router = require('koa-router')
const views = require('koa-views')
const co = require('co')
const convert = require('koa-convert')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const debug = require('debug')('koa2:server')
const path = require('path')

const testFunc = require('./middleware/koa-test')

const config = require('./config')
const routes = require('./routes')
const routesUser = require('./routes/users')

// mongoose
const mongoose = require('mongoose')
const dbsCfg = require('./dbs/config')

// session & redis
const session = require('koa-generic-session')
const Redis = require('koa-redis')

const app = new Koa()
const router = new Router()

mongoose.connect(dbsCfg.dbs, {
  useNewUrlParser: true
})

const port = process.env.PORT || config.port

// error handler
onerror(app)

// session
app.keys = [
  'keys',
  'keyss'
]
// 与redis建立链接
app.use(session({
  key: 'test',
  prefix: 'pre',
  // 无该配置项，session将直接使用内存存储
  store: new Redis()
}))

// middlewares
app.use(bodyparser())
  .use(testFunc())
  .use(json())
  .use(logger())
  .use(require('koa-static')(__dirname + '/public'))
  .use(views(path.join(__dirname, '/views'), {
    options: {settings: {views: path.join(__dirname, 'views')}},
    map: {'ejs': 'ejs'},
    extension: 'ejs'
  }))
  .use(router.routes())
  .use(router.allowedMethods())

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}`)
})

router.get('/', async (ctx, next) => {
  // ctx.body = 'Hello World'
  ctx.cookies.set('koa-cookie', Math.random())
  ctx.state = {
    title: 'Koa2'
  }
  await ctx.render('index', ctx.state)
})

routes(router)
routesUser(router)

app.on('error', function(err, ctx) {
  console.log(err)
  logger.error('server error', err, ctx)
})

module.exports = app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})
