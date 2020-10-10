console.log('Here we go!')
// Promise实例
new Promise(
  /* 执行器 executor */
  function (resolve) {
    setTimeout(function () {
      resolve('hello')
    }, 2000)
  }
)
  .then(function (res) {
    console.log(res)
    return new Promise(function (resolve) {
      setTimeout(function () {
        resolve('world!')
      }, 2000)
    })
  })
  .then(function (value) {
    console.log(value + ' world!')
  })
