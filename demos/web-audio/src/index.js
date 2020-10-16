/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-10-16 10:50
 */
console.log('hello world')

const toUpper = (s) => {
  return s.toUpperCase()
}

const el = document.createElement('h1')
el.innerText = toUpper('Hello World')

document.body.appendChild(el)

export {
  toUpper
}
