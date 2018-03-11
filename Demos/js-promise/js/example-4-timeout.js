/**
 * Created by zx1984 2018/3/11
 * https://github.com/zx1984
 */
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
  .then(function (value) {
    console.log(value)
    console.log('everyone')
    ;(function () {
      return new Promise(function (resolve) {
        setTimeout(function () {
          console.log('Mr.Laurence!')
          resolve('Merry Xmax')
        }, 2000)
      })
    }())
    return false
  })
  .then(function (value) {
    console.log(value + ' world!')
  })

