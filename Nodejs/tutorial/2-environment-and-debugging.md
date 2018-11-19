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

### fs

