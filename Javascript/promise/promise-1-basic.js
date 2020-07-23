/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-06-07 10:07
 */
/**
 * 基础版本
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
    this.callbacks.forEach(fn => fn(value))
  }
}

/**
 * 成功案例
 */
new ZxPromise(resolve => {
  console.log('test1')
  setTimeout(() => {
    resolve('test1')
  }, 500)
}).then(res => {
  console.log('test1 then', res)
})

/**
 * 失败案例
 *
 * 因为：then方法注册onFulfilled之前，resolve就已执行
 * 所以：onFulfilled不会执行到
 */
new ZxPromise(resolve => {
  console.log('test2')
  resolve('test2')
}).then(res => {
  console.log('test2 then', res)
})
