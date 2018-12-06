## 开发环境和调试工具

* CommonJS nodejs的模块规范

* global 全局对象

* process

## # CommonJS

* 每个文件是一个模块，有自己的作用域

* 在模块内部`module`变量代表模块本身

* `module.exports` 属性代表模块对外接口

```
// test.js
const num = 1000

function multiple () {
  return num * 2
}

module.exports.num = 1000
module.exports.multipleFnc = multiple
```

### require

#### require 规则

* `/` 表示绝对路径，`./`表示相对于当前文件的路径

* 支持`js`、`json`、`node`拓展名，不写会依次尝试

* 不写路径则认为是`build-in`模块或各级`node_modules`内的第三方模块

#### require 特性

* module 被加载的时候执行，加载后缓存。

* 一旦出现某个模块被循环加载，就只输出已执行的部分，还未执行的部分不会输出。

## module & module.exports

```javascript
(
  function (exports, require, module, __filename, __dirname) {
    // user's code
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
```

## # fs

https://nodejs.org/api/fs.html

```
const fs = require('fs')

fs.readFile('./01_run.js', (err, buf) => {
  if (err) {
    console.log(err)
    return
  }
  console.log(buf)
  console.log(buf.toString())
})

fs.readFile('./1-NodeJS.md', (err, data) => {
  if (err) throw err;
  console.log(data.toString())
})

```

#### chalk

```
npm i chalk -D
```

带颜色的日志输出模块

```
console.log(chalk.red('This is red text!'))
```

#### root

全局安装模块的目录

```
npm root -g
```

## exports

```
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

```

## global

CommonJS

Buffer、process、console

timer

### # global

```
const a = 1000

global.b = 2000

module.exports.a = a
```

### # process

```
/*
  argv // node ./04_process.js a=1 b=2 c=3 ...
  argv0 // argv0: a=1
  execArgv // node --inspect 04_process.js, execArgv: ['--inspect']
  execPath //
*/

/**
 * process
 */
const { argv, argv0, execArgv, execPath } = process

argv.forEach(item => {
  console.log(item)
})

console.log(argv0)
console.log(execArgv)
console.log(execPath)

/**
 * env 环境
 */
const { env } = process

console.log(env)
```

#### cwd() 打印出当前process执行的路径

```
process.cwd()
```

等同于shall `pwd`命令

#### setImmediate() // last run

```
process.nextTick(_ => {
  console.log('nextTick')
})

setTimeout(_ => {
  console.log('setTimeout')
})

setImmediate(_ => {
  console.log('setImmediate')
})
```

## # 调试

https://nodejs.org/en/docs/guides/debugging-getting-started/

Inspector

VS code(IDE)

