const Person = require('../dbs/models/person')


module.exports = (router) => {
  router.get('/user', async (ctx, next) => {
    ctx.body = 'this a users response!';
  })

  // add
  router.post('/user/add', async (ctx, next) => {
    const reqBody = ctx.request.body
    const person = new Person({
      name: reqBody.name,
      age: reqBody.age
    })
    let resBody = {}
    try {
      await person.save()
      resBody = {
        code: 0,
        message: 'success'
      }
    } catch (err) {
      resBody = {
        code: -1,
        message: 'error',
        data: err
      }
    }
    ctx.body = resBody
  })

  // find
  router.post('/user/find', async (ctx, next) => {
    let name = ctx.request.body.name
    try {
      const data = await Person.findOne({ name })
      const list = await Person.find({ name })
      ctx.body = {
        code: 0,
        data,
        list
      }
    } catch (err) {
      ctx.body = {
        code: -1,
        data: err
      }
    }
  })

  // update
  router.post('/user/update', async (ctx) => {
    let body = ctx.request.body
    await Person.where({
      name: body.name
    }).update({
      age: body.age
    })
    ctx.body = {
      code: 0
    }
  })

  // del
  router.post('/user/remove', async (ctx) => {
    let body = ctx.request.body
    try {
      let result = await Person.where({
        name: body.name
      }).remove()
      ctx.body = {
        code: result.n > 0 ? 0 : -1,
        data: result
      }
    } catch (err) {
      ctx.body = err
    }
  })
}
