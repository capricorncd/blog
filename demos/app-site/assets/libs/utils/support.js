/**
 * Created by Capricorncd.
 * Date: 2019/04/30 09:11
 * Copyright © 2017-present, https://github.com/capricorncd
 */
export function supportWebp () {
  try {
    return !![].map
      && 0 === document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp')
      && !isVivoBrowser()
  } catch (e) {
    return false
  }
}

function isVivoBrowser() {
  return /VivoBrowser/ig.test(navigator.userAgent)
}
