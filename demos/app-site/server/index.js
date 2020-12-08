/**
 * Created by Capricorncd.
 * Date: 2018/12/21 10:50
 * Copyright © 2017-present, capricorncd
 */
import Koa from 'koa'
import consola from 'consola'
import bodyparser from 'koa-bodyparser'
import json from 'koa-json'
import { Nuxt, Builder } from 'nuxt'
// Import and Set Nuxt.js options
import config from '../nuxt.config.js'

const app = new Koa()
const host = config.server.host || process.env.HOST
const port = config.server.port || process.env.PORT

config.dev = !(app.env === 'production')

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // middlewares
  app.use(bodyparser()).use(json())

  app.use(ctx => {
    ctx.status = 200 // koa defaults to 404 when it sees that status is unset
    return new Promise((resolve, reject) => {
      ctx.res.on('close', resolve)
      ctx.res.on('finish', resolve)
      nuxt.render(ctx.req, ctx.res, promise => {
        // nuxt.render passes a rejected promise into callback on error.
        promise.then(resolve).catch(reject)
      })
    })
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
