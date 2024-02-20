# 属性描述符

```js
const data = {
  a: 'xx',
  b: 'yy',
}

// 获取属性描述符
const desc = Object.getOwnPropertyDescriptor(data, 'a');
// 描述a：值为xx，可重写，可遍历
// { "value": "xx", "writable": true, "enumerable": true, "configurable": true }

// 设置属性描述符
Object.defineProperty(data, 'a', {
    "value": "xx",
    "writable": false, // 不可重写
    "enumerable": false, // 不可遍历
    "configurable": false, // 不可修改描述符本身
})

// 描述不可修，所以writable将无效
Object.defineProperty(data, 'a', {
    "writable": true,
})
```

getter, setter

```js
Object.defineProperty(data, 'a', {
  get: () => {
    // getter
  },
  set: () => {
    // setter
  }
})
```

实现一个制度函数

```js
class Test {
  constructor(input) {
    const cloneInput = { ...input }
    Object.freeze(cloneInput)
    // this.input = input;
    Object.defineProperty(this, 'input', {
      get: () => {
        return cloneInput
      },
      set: () => {
        throw new Error(`input属性时只读的，不能重新赋值！`)
      },
      configurable: false,
    })

    let internalCount = 0;
    Object.defineProperty(this, 'count', {
      get: () => {
        return internalCount
      },
      set: (val) => {
        // ~~val: 取整, or parseInt(val)
        if (typeof val !== 'number' || ~~val !== val || val < 0) {
          throw new Error(`count必须为大于0的整数！`)
        }
        internalCount = val
      },
      configurable: false,
    })

    // 防止用户任意追加属性 t.xyz = 'sssss'
    // Object.freeze(this)
    this.a = 100; // 可改属性
    Object.seal(this); // 密封。外部不能追加其他属性，但能修改a
  }

  get subtotal() {
    return this.count * this.input.price;
  }

  get isEmpty() {
    return this.count === 0
  }
}

Object.freeze(Test.prototype)

// usage
const input = {
  price: 100,
}
const t = new Test(input)
console.log(t.isEmpty, t.subtotal)
t.count = 5
console.log(t.isEmpty, t.subtotal)
// t.input.price = 9 // Object.freeze(cloneInput)
```
