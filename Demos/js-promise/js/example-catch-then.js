console.log('here we go')
new Promise(function (resolve) {
  setTimeout(function () {
    resolve()
  }, 1000)
})
  .then(function () {
    console.log('Start')
    throw new Error('test error')
  })
  .catch(function (err) {
    console.log('I catch: ', err)
    // 下面这一行的注释将引发不同的走向
    // throw new Error('another error')
  })
  .then(function () {
    console.log('arrive here')
  })
  .then(function () {
    console.log('... and here')
  })
  .catch(function (err) {
    console.log('No, I catch: ', err)
  })
