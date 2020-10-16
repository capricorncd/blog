/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-10-04 19:18
 */
export function formatDate(date) {
  const arr = []
  arr.push(toDoubleDigit(date.getHours()))
  arr.push(toDoubleDigit(date.getMinutes()))
  arr.push(toDoubleDigit(date.getSeconds()))
  return arr.join(':')
}

function toDoubleDigit(n) {
  n = n + ''
  return n[1] ? n : '0' + n
}

export function randomColor() {
  return `rgb(${255 * Math.random()}, ${255 * Math.random()}, ${255 * Math.random()})`
}
