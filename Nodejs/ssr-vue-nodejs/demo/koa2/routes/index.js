module.exports =  (router) => {
  router.get('/welcome', async function (ctx, next) {
    ctx.state = {
      title: 'koa2 title'
    };

    await ctx.render('index', {title: ctx.state});
  })
}
