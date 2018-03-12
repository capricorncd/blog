let promise = Promise.reject('something wrong')

promise
  .then(function () {
    console.log('it\'s not ok')
  })
  .catch(function (msg) {
    console.log(msg)
    console.log('no, it\'s not ok')
    return Promise.reject({
      then() {
        console.log('it vill be ok')
      },
      catch() {
        console.log('not yet')
      }
    })
  })
