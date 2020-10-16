console.log('here we go')
new Promise(function (resolve, reject) {
  setTimeout(function () {
    reject('bye')
  }, 2000)
})
  .then(function (value) {
    console.log(value + ' world')
  }, function (err) {
    console.log('Error: ', err)
  })
