/**
 * Created by Capricorncd 2018/3/8
 * https://github.com/capricorncd
 */
function log (o) {
  console.log(o)
}

log('start ...')

let promise = new Promise((resolve) => {
  setTimeout(() => {
    log('the promise fulfilled')
    resolve('hello world')
  }, 1000)
})

setTimeout(() => {
  promise.then(value => {
    log('after 3000: ' + value)
  })
}, 3000)
