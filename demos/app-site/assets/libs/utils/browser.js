/**
 * Created by Capricorncd.
 * Date: 2018/12/25 17:05
 * Copyright © 2017-present, capricorncd
 */
export function isIos () {
  return /(iphone|ipod|ios|ipad)/ig.test(navigator.userAgent) && /iPhone|ipod|ipad/i.test(navigator.platform)
}

export function isWeiXin () {
  return /MicroMessenger/i.test(navigator.userAgent)
}

export function getBrowserType () {
  const userAgent = navigator.userAgent
  if (/(Trident|Edge)/.test(userAgent)) return 'ie'
  if (userAgent.indexOf('Opera') > -1) return 'opera'
  if (userAgent.indexOf('Firefox') > -1) return 'firefox'
  if (userAgent.indexOf('Chrome') > -1) return 'chrome'
  if (userAgent.indexOf('Safari') > -1) return 'safari'
  if (isWeiXin()) return 'weixin'
  if (userAgent.match(/QQ|MQQBrowser/)) return 'qq'
  return null
}

export function browserVersion (browserType) {
  const userAgent = navigator.userAgent
  browserType = browserType || getBrowserType()
  let version
  switch (browserType) {
    case 'ie':
      if (/MSIE (\d+)|rv:(\d+)/.test(userAgent)) {
        version = +(RegExp.$1 || RegExp.$2)
      }
      break
    // case 'opera':
    //   if (/Opera[/ ](\d+)/.test(userAgent)) {
    //     version = +RegExp.$1
    //   }
    //   break
    // firefox, chrome, safari
    default:
      let reg = new RegExp(browserType + '[/ ](\\d+)', 'i')
      if (reg.test(userAgent)) {
        version = +RegExp.$1
      }
  }
  return version
}
