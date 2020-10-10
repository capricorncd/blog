(
  function (exports, require, module, __filename, __dirname) {
    // code
  }
)

// exports = module.exports

// exports 只能扩张属性exports.method or exports.prop
// 不能 exports = {}
// 不能改变exports的指向
// exports = {
//   a: 1,
//   b: 2,
//   func: function () {
//     // ...
//   }
// }

// 只可以 module.exports = {}
