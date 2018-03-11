console.log('here we go')
new Promise(function (resolve) {
  setTimeout(function () {
    throw new Error('bye')
  }, 2000)
})
  .then(function (value) {
    console.log(value + ' world')
  })
  .catch(function (err) {
    console.log('Error: ', error.message)
  })
