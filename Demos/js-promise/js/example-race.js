console.log('start ...')

let p1 = new Promise(function (resolve) {
  setTimeout(function () {
    resolve('I\'m P1')
  }, 10000)
})

let p2 = new Promise(function (resolve) {
  setTimeout(function () {
    resolve('I\'m P2')
  }, 2000)
})

Promise.race([p1, p2])
  .then(function (val) {
    console.log(val)
  })
