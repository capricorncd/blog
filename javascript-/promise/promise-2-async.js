/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-06-07 10:47
 */
/**
 * 加入延迟机制（异步）
 */
class ZxPromise {
  callbacks = []

  constructor (fn) {
    fn(this._resolveHandler.bind(this))
  }

  /**
   * then
   *
   * Promises/A+规范要求，then 方法能够链式调用，return this
   * https://promisesaplus.com/
   * @param onFulfilled
   */
  then (onFulfilled) {
    this.callbacks.push(onFulfilled)
    return this
  }

  _resolveHandler (value) {
    setTimeout(() => {
      this.callbacks.forEach(fn => fn(value))
    }, 0)
  }
}

/**
 * 成功案例
 */
new ZxPromise(resolve => {
  console.log('test2')
  resolve('test2')
}).then(res => {
  console.log('test2 then', res)
})

/**
 * 失败案例
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
  })
})
