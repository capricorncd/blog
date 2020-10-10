# ES6+（ECMAScript2015+）

JavaScript: ECMAScript（核心）、DOM（Document Object Model文档对象模型）、BOM（Browser Object Model浏览器对象模型）

ECMAScript（核心）：语法、类型、语句、关键字...

> ES是JavaScript的一部分，JS的语法层面是遵循ES的。

```javascript
function log() {
    console.log.apply(null, arguments)
}
```

### 变量的作用域

var同一变量可以重复声明

```javascript
var variable = 100
log(variable)
// ...
var variable = 200
log(variable)
```

结果：

```
100
200
```

#### let 变量不允许重复声明

```javascript
let variableEs6 = 100
log(variableEs6)
// ...
let variableEs6 = 200
log(variableEs6)
```

结果：

```
Uncaught SyntaxError: Identifier 'variableEs6' has already been declared
```

#### let 创建局部变量（块级）

```javascript
for (var i = 0; i < 5; i++) {
    log(i)
}
log(`i=${i}`)

for (let j = 0; j < 5; j++) {
    log(j)
}
log(`j=${j}`)// Uncaught ReferenceError: j is not defined
```

```javascript
function fn1(x) {
    var x = 'innerVariable'
    log(x)
}

fn1('outerVariable')
// innerVariable

function fn2(x) {
    let x = 'innerVariable'
    log(x)
}
fn2('outerVariable')
// Uncaught SyntaxError: Identifier 'x' has already been declared

function fn3(x) {
    {
        let x = 'innerVariable'
        log(x)
    }
}
fn3('outerVariable')
// innerVariable
```

#### const

const定义的常量值不允许修改。

```javascript
const PI = 3.1415926
PI = 3.2
log(PI)
// Uncaught TypeError: Assignment to constant variable.
```

### 字符串处理

```javascript
// 语法
`其他字符串 ${变量 || 有结果的表达式或函数} 其他字符串`
```

普通字符串

```javascript
let str = 'Hello World'

// es5:indexOf
if (str.indexOf('World') > -1) {
   log(`'World' in str, with indexOf`)
} else {
   log(`'World' not in str, with indexOf`)
}
// 'World' in str, with indexOf

// es6:includes/startsWith/endsWith
if (str.includes('World')) {
   log(`'World' in str, with includes`)
} else {
   log(`'World' not in str, with includes`)
}
// 'World' in str, with includes

if (str.startsWith('World')) {
    log(`str startsWith 'World'`)
} else {
   log(`str not startsWith 'World'`)
}
// str not startsWith 'World'

if (str.endsWith('World')) {
   log(`str endsWith 'World'`)
} else {
  log(`str not endsWith 'World'`)
}
// str endsWith 'World'

let isStartsWith6 = str.startsWith('World', 6)
log(`str startsWith 'World' from index 6: ${isStartsWith6}`)
// str startsWith 'World' from index 6: true
```

函数

```javascript
function toString(a, b, c, d) {
  return a[0] + b + a[1] + c + a[2] + d
}

let x = 1
let y = 2
let z = 3

log(toString`x=${x}, y=${y}, z=${z}`)
// x=1, y=2, z=3

function toString2(...args) {
  let str = ''
  let arr = args[0]
  let values = args.slice(1)
  values.forEach((item, index) => {
    str += arr[index] + item
  })
  return str
}

log(toString2`x=${x}, y=${y}, z=${z}`)
// x=1, y=2, z=3
````

### 函数扩展

函数默认值

```javascript
// 函数默认值
function fnA(x = 0, y = 0) {
  log(x + y)
}

fnA(2 + 3)// 5
fnA(2)// 2
```

多参数

```javascript
function fnB(...args) {
  let n = 0;
  args.forEach(m => {
    if (typeof m === 'number') {
      n += m
    }
  })
  log(n)
}

fnB(-1, 3, -4)// -2
```

箭头函数

```javascript
const fnC = (x, y) => x + y
log(fnC(1, 2))

const fnD = () => {
  log('fnD log')
}
fnD()

let timer = setTimeout(_ => {
  log(this)
  clearTimeout(timer)
}, 0)

let fnE = x => {
  log(`fnE arguments[0]=${x}`)
}
fnE(100000)
```

### 函数尾调用

特点：共用一部分内存空间（栈），不需要格外分配内存空间来执行函数

```javascript
// 函数尾调用
const fnAA = (x, y) => x + y
const fnAB = () => {
  // 最后一步被调用，且无其他计算
  return fnAA(1, 3)
}
log(fnAB())

const fnAC = () => {
  let result = fnAA(2, 3)
  /* 不属于尾调用 */
  return result
}

const fnAD = () => {
  /* 不属于尾调用 */
  return fnAA(2, 3) + 100
}
```

优化

```javascript
// 阶乘实现
const FACTORIAL_NUMBER = 10

function factorial(n) {
  return n <= 1 ? 1 : factorial(n - 1) * n
}
log('factorial', factorial(FACTORIAL_NUMBER))

// 使用尾调用优化阶乘方法
function factorialOptimization(n, result = 1) {
  return n <= 1 ? result : factorialOptimization(n - 1, n * result)
}
log('factorialOptimization', factorialOptimization(FACTORIAL_NUMBER))
```

### 循环遍历


