/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-06-08 09:37
 */
const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

class ZxPromise {
  callbacks = []
  value = null
  state = PENDING

  constructor (fn) {
    try {
      fn(this._resolve.bind(this), this._reject.bind(this))
    } catch (e) {
      this._reject(e)
    }
  }

  _resolve (value) {
    this.state = FULFILLED
    this.value = value
    this.callbacks.forEach(item => this._handle(item))
  }

  _reject (err) {
    this.state = REJECTED
    this.value = err
    this.callbacks.forEach(item => this._handle(item))
  }

  then (onFulfilled, onRejected) {
    return new ZxPromise((resolve, reject) => {
      this._handler({
        resolve,
        reject,
        onFulfilled,
        onRejected
      })
    })
  }

  catch (onError) {
    return this.then(null, onError)
  }

  _handler (options) {
    if (this.state === PENDING) {
      this.callbacks.push(options)
      return
    }
    const { resolve, reject, onFulfilled, onRejected } = options
    switch (this.state) {
      case FULFILLED:
        if (!onFulfilled) {
          resolve(this.value)
        } else {
          // 把onFulfilled函数返回值，传递给下一个then
          resolve(onFulfilled(this.value))
        }
        break
      case REJECTED:
        if (!onRejected) {
          reject(this.value)
        } else {
          reject(onRejected(this.value))
        }
        break
    }
  }

  static resolve (params) {
    if (params) {
      if (params instanceof ZxPromise) {
        return params
      } else if (typeof params === 'object' && typeof params.then === 'function') {
        return new ZxPromise(resolve => {
          params.then(resolve)
        })
      } else {
        return new ZxPromise(resolve => resolve(params))
      }
    } else {
      return new ZxPromise(resolve => resolve())
    }
  }
}

const zp = new ZxPromise((resolve, reject) => {
  resolve('test')
  // reject('error')
}).then(res => {
  console.log('then1:', res)
  return 'the value from then1'
}, err => {
  console.error(err)
  return err
}).then(res => {
  console.log('then2:', res)
  return 'the value from then2'
}).catch(err => {
  console.error('catch', err)
})

setTimeout(() => {
  zp.then(res => {
    console.warn('after 0.5s')
    console.log('then3:', res)
  })
}, 500)
