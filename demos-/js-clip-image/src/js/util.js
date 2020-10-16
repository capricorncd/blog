/**
 * Created by capricorncd 2018/4/5
 * https://github.com/capricorncd
 */
export default {
  getPostion (node) {
    let left = 0
    let top = 0
    while (node) {
      left += node.offsetLeft
      top += node.offsetTop
      node = node.offsetParent
    }
    return {
      left,
      top
    }
  }
}

export function $ (s, context = document) {
  return context.querySelector(s)
}

export function log () {
  for (let i = 0; i < arguments.length; i++)
    console.log(arguments[i])
}
