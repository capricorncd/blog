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
  // 成功，下一步
  console.log(res + ' world!')
}, function (err) {
  // 失败，做相应处理
  console.error(err)
})
