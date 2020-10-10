/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-06-07 13:41
 */
const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'

/**
 * 链式调用的实现
 */
class ZxPromise {
  callbacks = []
  // state
  state = PENDING
  // cache result
  value = null

  constructor (fn) {
    fn(this._resolveHandler.bind(this))
  }

  then (onFulfilled) {
    return new ZxPromise(resolve => {
      this._handle({
        resolve,
        onFulfilled
      })
    })
  }

  _handle ({ onFulfilled, resolve }) {
    if (this.state === PENDING) {
      this.callbacks.push({ onFulfilled, resolve })
      return
    }
    if (!onFulfilled) {
      resolve(this.value)
      return
    }
    // 把函数onFulfilled返回的结果，传递给下一个then
    resolve(onFulfilled(this.value))
  }

  _resolveHandler (value) {
    // value 为ZxPromise
    if (value instanceof ZxPromise) {
      let then = value.then
      if (typeof then === 'function') {
        then.call(value, this._resolveHandler.bind(this))
        return
      }
    }
    // value 为普通值
    this.state = FULFILLED
    this.value = value
    this.callbacks.forEach(fn => {
      this._handle(fn)
    })
  }
}


new ZxPromise(resolve => {
  console.log('instance')
  resolve('test4')
}).then(res => {
  console.log('then1', res)
  return 'the text from then1 return'
}).then(res => {
  console.log('then2', res)
  return new ZxPromise(re => {
    setTimeout(() => {
      re('new ZxPromise instance')
    }, 100)
  })
}).then(res => {
  console.log('then3', res)
  return 'the text from then3 return'
}).then(res => {
  console.log('then4', res)
})
