/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-06-07 19:41
 */
const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

let globalIndex = 1

/**
 * add static method
 */
class ZxPromise {
  callbacks = []
  // state
  state = PENDING
  // cache result
  value = null

  index = globalIndex++

  constructor (fn) {
    console.log(`[ZxPromise ${this.index}]`, 'constructor')
    fn(this._resolveHandler.bind(this), this._rejectHandler.bind(this))
  }

  then (onFulfilled, onRejected) {
    console.log(`[ZxPromise ${this.index}]`, 'then')
    return new ZxPromise((resolve, reject) => {
      this._handle({
        resolve,
        onFulfilled,
        reject,
        onRejected
      })
    })
  }

  catch (onError) {
    console.log(`[ZxPromise ${this.index}]`, 'catch')
    return this.then(null, onError)
  }

  finally (onDone) {
    console.log(`[ZxPromise ${this.index}]`, 'finally')
    if (typeof onDone !== 'function') return this.then()
    const that = this.constructor
    return this.then(value => {
      that.resolve(onDone()).then(() => value)
    }, reason => {
      that.resolve(onDone()).then(() => {
        throw reason
      })
    })
  }

  _handle ({ onFulfilled, resolve, onRejected, reject }) {
    console.log(`[ZxPromise ${this.index}]`, '_handle')
    if (this.state === PENDING) {
      this.callbacks.push({ onFulfilled, resolve, onRejected, reject })
      return
    }
    try {
      if (this.state === FULFILLED) {
        if (!onFulfilled) {
          resolve(this.value)
          return
        }
        // 把函数onFulfilled返回的结果，传递给下一个then
        resolve(onFulfilled(this.value))
      } else {
        if (!onRejected) {
          reject(this.value)
          return
        }
        reject(onRejected(this.value))
      }
    } catch (err) {
      reject(err)
    }
  }

  _resolveHandler (value) {
    console.log(`[ZxPromise ${this.index}]`, '_resolveHandler')
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
    this.callbacks.forEach(fn => this._handle(fn))
  }

  _rejectHandler (err) {
    console.log(`[ZxPromise ${this.index}]`, '_rejectHandler')
    this.state = REJECTED
    this.value = err
    this.callbacks.forEach(fn => this._handle(fn))
  }

  static resolve (value) {
    if (value) {
      if (value instanceof ZxPromise) {
        return value
      } else if (typeof value === 'object' && typeof value.then === 'function') {
        return new ZxPromise(resolve => {
          value.then(resolve)
        })
      } else {
        return new Promise(resolve => resolve(value))
      }
    } else {
      return new Promise(resolve => resolve())
    }
  }

  static reject (value) {
    if (value instanceof ZxPromise) {
      return new ZxPromise((resolve, reject) => {
        value.then(reject)
      })
    } else {
      return new ZxPromise((resolve, reject) => {
        reject(value)
      })
    }
  }

  static all (promises) {
    return new ZxPromise((resolve, reject) => {
      let count = 0
      let len = promises.length
      let result = new Array(len)
      promises.forEach((item, index) => {
        ZxPromise.resolve(item).then(res => {
          count++
          result[index] = res
          if (count === len) {
            resolve(result)
          }
        }, err => reject(err))
      })
    })
  }

  static race (promises) {
    return new ZxPromise((resolve, reject) => {
      for (let i = 0; i < promises.length; i++) {
        ZxPromise.resolve(promises[i]).then(res => {
          console.log('race i=' + i)
          return resolve(res)
        }, err => reject(err))
      }
    })
  }
}

const p1 = new ZxPromise(resolve => {
  // setTimeout(() => {
  //   resolve('promise 0001')
  // }, 2000)
  resolve('promise 0001')
})

const p2 = new ZxPromise(resolve => {
  // setTimeout(() => {
  //   resolve('promise 0002')
  // })
  resolve('promise 0002')
})

// ZxPromise.all([p1, p2]).then(res => {
//   console.log('all', res)
// }).catch(err => {
//   console.error(err)
// })

ZxPromise.race([p1, p2]).then(res => {
  console.log('race', res)
}).catch(console.error)
