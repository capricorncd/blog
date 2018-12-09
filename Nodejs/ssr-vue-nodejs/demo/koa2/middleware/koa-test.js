/**
 * Created by Capricorncd.
 * User: https://github.com/capricorncd
 * Date: 2018/12/08 17:27
 */

function testFunc (ctx) {
  console.log('testFunc: ' + ctx.path)
}

module.exports = function () {
  return async function (ctx, next) {
    testFunc(ctx)
    await next()
  }
}
