/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-06-07 10:56
 */
const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'

/**
 * 增加状态
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
    // PENDING
    if (this.state === PENDING) {
      this.callbacks.push(onFulfilled)
    }
    // other state
    else {
      onFulfilled(this.value)
    }
    return this
  }

  _resolveHandler (value) {
    this.state = FULFILLED
    this.value = value
    this.callbacks.forEach(fn => fn(value))
  }
}

/**
 * test
 * @type {ZxPromise}
 */
const zp = new ZxPromise(resolve => {
  console.log('test3')
  resolve('test3')
})

zp.then(res => {
  console.log('test3 then1,', res)
})

/**
 * 在 resolve 执行后，再通过 then 注册上来的 onFulfilled 不能被执行。
 */
setTimeout(() => {
  zp.then(res => {
    console.log('test3 then2,', res)
  }, 100)
})
