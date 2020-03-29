/**
 * capricorncd
 * https://github.com/capricorncd
 * indexOf [-1, +@@)
 * includes/startsWith/endsWidth return boolean
 */

let str = 'Hello World'

if (str.indexOf('World') > -1) {
   log(`'World' in str, with indexOf`)
} else {
   log(`'World' not in str, with indexOf`)
}

if (str.includes('World')) {
   log(`'World' in str, with includes`)
} else {
   log(`'World' not in str, with includes`)
}

if (str.startsWith('World')) {
    log(`str startsWith 'World'`)
} else {
   log(`str not startsWith 'World'`)
}

if (str.endsWith('World')) {
   log(`str endsWith 'World'`)
} else {
  log(`str not endsWith 'World'`)
}

let isStartsWith6 = str.startsWith('World', 6)
log(`str startsWith 'World' from index 6:`, isStartsWith6)

// 函数
function toString(a, b, c, d) {
  return a[0] + b + a[1] + c + a[2] + d
}

let x = 1
let y = 2
let z = 3

log(toString`x=${x}, y=${y}, z=${z}`)

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
