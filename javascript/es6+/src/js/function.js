/**
 * capricorncd
 * https://github.com/capricorncd
 */
// 函数默认值
function fnA(x = 0, y = 0) {
  log(x + y)
}

fnA(2 + 3)// 5
fnA(2)// 2

// 多参数
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

// 箭头函数
const fnC = (x, y) => x + y
log(fnC(1, 2))

const fnD = () => {
  log('fnD log')
}
fnD()

// let timer = setTimeout(_ => {
//   log(this)
//   clearTimeout(timer)
// }, 0)

let fnE = x => {
  log(`fnE arguments[0]=${x}`)
}
fnE(100000)

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

// 阶乘
const FACTORIAL_COUNT = 10
function factorial(n) {
  return n <= 1 ? 1 : factorial(n - 1) * n
}

function factorialOptimization(n, result = 1) {
  return n <= 1 ? result : factorialOptimization(n - 1, n * result)
}

let time = +new Date()
log('factorial', factorial(FACTORIAL_COUNT))
log(+new Date() - time)
time = +new Date()
log('factorialOptimization', factorialOptimization(FACTORIAL_COUNT))
log(+new Date() - time)
