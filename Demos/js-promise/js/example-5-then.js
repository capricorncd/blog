/**
 * Created by zx1984 2018/3/11
 * https://github.com/zx1984
 */
'use strict';

console.log('Start ...')
// Promise实例
new Promise(
  /* 执行器 executor */
  function (resolve) {
    console.log('Step 1')
    setTimeout(function () {
      resolve(100)
    }, 1000)
  }
)
  .then(function (value) {
    console.log(value)
    return new Promise(function (resolve) {
      console.log('Step 1-1')
      setTimeout(function () {
        resolve(110)
      }, 1000)
    })
      .then(function (value) {
        console.log('Step 1-2')
        return value
      })
      .then(function (value) {
        console.log('Step 1-3')
        return value
      })
  })
  .then(function (value) {
    console.log(value)
    console.log('Step 2')
  })

// 结果：
// Start ...
// Step 1
// 100
// Step 1-1
// Step 1-2
// Step 1-3
// 110
// Step 2
