# tsconfig.json

JavaScript中有两个空类型`undefined`和`null`，使用不方便；

TypeScript通过config中，通过`strict`或者`strictNullChecks`严格校验类型，使代码更安全、严谨。

```bash
npm i -g typescript
```

<a href="../Demos/typescript-config" target="_blank">demo code</a>

## strict

```typescript
// strict: false, or strictNullChecks: false
let width: number

function getWidth() {
  const random = Math.random()
  if (random < 0.4) {
    return void 0
  } else if (random > 0.6) {
    return null
  }
  return 0
}

/**
 * tsconfig.json
 * Strict Type-Checking Options: false的时候，ts不会报错
 * "strict": true,　或者　"strictNullChecks": true　时会报错
 */
width = getWidth()

if (width === void 0) {
  // ...
} else if (width === null) {
  // ...
} else {
  // ...
}
```

`undefined` and `any`

```typescript
let width: number | undefined

/** ? 可选参数，不传参时即undefined */
// 相当于 sting | undefined
function getName(name?: string) {
  return name || '匿名'
}

getName('Jock')
getName(void 0)
// getName(null) // error

/** any */
let value: any
value = 3
value = void 0
value = null
value = 'Tom'
value = {
  key: 'key'
}
value = []
```

## tsx

https://www.typescriptlang.org/docs/handbook/jsx.html#basic-usage

启动配置项: `"jsx": "preserve",`

test.tsx

```typescript jsx
const div: any = <div>config jsx=preserve</div>
```

```bash
$ tsc
```

-> test.jsx

```jsx
var div = <div>config jsx=preserve</div>;
```

## esModuleInterop

为`false`的时候：

```typescript
// index.ts
import testObj from './test.js' // CommonJS

console.log(testObj)
```

```javascript
// test.js
module.exports = {
  name: 'testObj'
}
```

编译，并执行编译后的js文件

```bash
# create index.js
$ tsc
# run index.js
node ./index.js
# esModuleInterop: false时
-> undefined
```

修改js文件（不现实的解决方案，比如node_modules里的依赖模块修改）

```javascript
// test.js
module.exports.default = {
  name: 'testObj'
}
```

## noImplicitAny

```typescript
const student = {}
const key = 'name'
// noImplicitAny: true, or strict: true
// S7053: Element implicitly has an 'any' type because expression of type '"name"' can't be used to index type '{}'.
student[key] = 'Tom'
```

## target

Specify ECMAScript target version:
'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019', 'ES2020', or 'ESNEXT'.

# 范型

<a href="./范型.md" target="_blank">范型.md</a>

```typescript
// 数字相加，字符串串拼接不能使用
function add(arg1: number, arg2: number): number {
  return arg1 + arg2;
}
// 使用
add(1, 0)
```

使用范型，实现数字相加，也可以字符串拼接

```typescript
// T: 保证了参数类型的一致性
// T为number时，a、b均为number，不可能a为umber，b为字符串；反之同理
function add<T>(a: T, b: T): T {
  return a + b;
}

// 使用
add<number>(1, 0) // 1
add<string>('1', '0') // 10
```

