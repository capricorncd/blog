console.log('start ...')
Promise.resolve()
  .then(function (value) {
    console.log('Step 1', value)
    return Promise.resolve('Hello')
  })
  .then(function (value) {
    console.log(value, ' World')
    return Promise.resolve(new Promise(function (resolve) {
      setTimeout(function () {
        resolve('Good')
      }, 2000)
    }))
  })
  .then(function (val) {
    console.log(val, ' evening')
    return Promise.resolve({
      // thenable
      then () {
        console.log(', everyone')
      }
    })
  })
